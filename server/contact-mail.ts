import "./load-env.js";
import nodemailer from "nodemailer";
import {
  contactFormSchema,
  type ContactFormPayload,
} from "../shared/contact-schema";

const serviceLabels: Record<string, string> = {
  hairstrokes: "Hairstrokes / микропигментация",
  microblading: "Микроблейдинг",
  eyeliner: "Перманентна очна линия",
  lips: "Перманентно червило (Soft Lips)",
  lashes: "Мигли / ламиниране",
  laser: "Лазерни процедури",
  other: "Друго / консултация",
};

export function parseContactBody(
  body: unknown
):
  | { ok: true; data: ContactFormPayload }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> } {
  const result = contactFormSchema.safeParse(body);
  if (!result.success) {
    const issues = result.error.issues;
    const first = issues[0]?.message ?? "Невалидни данни.";
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of issues) {
      const path = issue.path[0];
      if (path !== undefined && typeof path === "string") {
        if (!fieldErrors[path]) fieldErrors[path] = [];
        fieldErrors[path].push(issue.message);
      }
    }
    return {
      ok: false,
      error: first,
      fieldErrors:
        Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
    };
  }
  return { ok: true, data: result.data };
}

function buildMailText(data: ContactFormPayload): string {
  const serviceName = serviceLabels[data.service] ?? data.service;
  return [
    `Име: ${data.name}`,
    `Имейл: ${data.email}`,
    `Телефон: ${data.phone}`,
    `Желана услуга: ${serviceName}`,
    "",
    "Съобщение:",
    data.message,
  ].join("\n");
}

function stripEnvValue(raw: string | undefined): string {
  if (raw === undefined) return "";
  let s = raw.replace(/\r/g, "").trim();
  // Strip UTF-8 BOM if the whole line was pasted into .env
  if (s.charCodeAt(0) === 0xfeff) s = s.slice(1);
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1);
  }
  return s.trim();
}

function normalizeSmtpCredentials(): { user: string; pass: string } {
  const user = stripEnvValue(process.env.SMTP_USER);
  const pass = stripEnvValue(process.env.SMTP_PASS).replace(/\s/g, "");
  return { user, pass };
}

/** User-safe hint; full error still logged on the server. */
function smtpFailureMessage(err: unknown): string {
  const e = err as {
    code?: string;
    responseCode?: number;
    message?: string;
  };
  const msg = (e.message ?? String(err)).toLowerCase();

  if (
    e.code === "EAUTH" ||
    e.responseCode === 535 ||
    /invalid login|authentication failed|username and password not accepted/i.test(
      msg
    )
  ) {
    return [
      "Имейл сървърът отказа входа.",
      "За Gmail: SMTP_USER трябва да е пълният адрес (name@gmail.com); паролата трябва да е 16-знаков App Password (не основната парола на акаунта), с включена 2-стъпкова проверка.",
      "Провери в терминала съобщението [contact-mail] за пълния отговор от сървъра.",
    ].join(" ");
  }
  if (
    e.code === "ETIMEDOUT" ||
    e.code === "ECONNREFUSED" ||
    e.code === "ENOTFOUND"
  ) {
    return "Няма връзка с SMTP сървъра. Провери SMTP_HOST/SMTP_PORT и мрежата.";
  }
  if (/self signed certificate|certificate/i.test(msg)) {
    return "TLS/сертификатна грешка при SMTP. Провери хоста и порта.";
  }
  return "Изпращането на имейл не бе успешно. Опитай по-късно или се свържи с администратор.";
}

export async function sendContactEmail(data: ContactFormPayload): Promise<void> {
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  if (!to) {
    throw new Error(
      "CONTACT_TO_EMAIL не е настроен. Задай го в .env или в средата на процеса (виж .env.example)."
    );
  }

  const { user, pass } = normalizeSmtpCredentials();

  if (!user || !pass) {
    throw new Error(
      "SMTP_USER и SMTP_PASS не са настроени. Добави ги в .env до проекта (или в средата на процеса) — виж .env.example."
    );
  }

  const explicitTls = process.env.SMTP_GMAIL_EXPLICIT === "true";
  const hostFromEnv = stripEnvValue(process.env.SMTP_HOST);
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  /** Empty SMTP_HOST → Nodemailer Gmail preset (no hostname literals in bundle; avoids Netlify secret-scan false positives). */
  if (explicitTls && !hostFromEnv) {
    throw new Error(
      "При SMTP_GMAIL_EXPLICIT=true задай SMTP_HOST в .env (хостът на SMTP сървъра)."
    );
  }

  const useGmailPreset = !explicitTls && hostFromEnv === "";

  const transporter = nodemailer.createTransport(
    useGmailPreset
      ? { service: "gmail", auth: { user, pass } }
      : {
          host: hostFromEnv,
          port,
          secure,
          requireTLS: !secure && port === 587,
          auth: { user, pass },
        }
  );

  const from =
    process.env.SMTP_FROM ?? `Сайт контакт <${user}>`;

  await transporter.sendMail({
    from,
    to,
    replyTo: data.email,
    subject: `Заявка за консултация — ${data.name}`,
    text: buildMailText(data),
  });
}

export type ContactHandlerResult =
  | { ok: true }
  | { ok: false; status: number; error: string; fieldErrors?: Record<string, string[]> };

export async function handleContactRequest(
  body: unknown
): Promise<ContactHandlerResult> {
  const parsed = parseContactBody(body);
  if (!parsed.ok) {
    return {
      ok: false,
      status: 400,
      error: parsed.error,
      fieldErrors: parsed.fieldErrors,
    };
  }

  try {
    await sendContactEmail(parsed.data);
    return { ok: true };
  } catch (err) {
    if (err instanceof Error) {
      const m = err.message;
      if (
        m.includes("CONTACT_TO_EMAIL") ||
        m.includes("SMTP_USER и SMTP_PASS") ||
        m.includes("SMTP_GMAIL_EXPLICIT") ||
        m.includes("При SMTP_GMAIL_EXPLICIT")
      ) {
        console.error("[contact-mail]", m);
        return { ok: false, status: 500, error: m };
      }
    }
    const e = err as { code?: string; responseCode?: number; response?: string };
    console.error("[contact-mail]", e.code, e.responseCode, e.response ?? err);
    if (e.code === "EAUTH" || e.responseCode === 535) {
      const { user, pass } = normalizeSmtpCredentials();
      console.error(
        "[contact-mail] hint: SMTP_USER has @:",
        user.includes("@"),
        "| APP_PASSWORD length:",
        pass.length,
        "(expect 16 for Gmail; if not 16, fix .env). Account for the app password must match SMTP_USER."
      );
    }
    const message = smtpFailureMessage(err);
    return { ok: false, status: 500, error: message };
  }
}
