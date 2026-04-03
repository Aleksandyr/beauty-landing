import { Resend } from "resend";
import { CONTACT_SERVICE_LABELS } from "../shared/contact-labels";
import {
  contactFormSchema,
  type ContactFormPayload,
} from "../shared/contact-schema";

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
  const serviceName =
    CONTACT_SERVICE_LABELS[data.service] ?? data.service;
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

function trimEnv(raw: string | undefined): string {
  return raw?.trim() ?? "";
}

function resendFailureMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  const lower = msg.toLowerCase();
  if (
    /unauthorized|forbidden|invalid api key|401|403/.test(lower)
  ) {
    return "Невалиден API ключ за Resend.";
  }
  if (/network|fetch failed|econnrefused|etimedout|enotfound|getaddrinfo/.test(lower)) {
    return "Няма връзка с Resend. Опитай по-късно.";
  }
  if (/429|rate limit|too many requests/.test(lower)) {
    return "Твърде много заявки. Опитай по-късно.";
  }
  if (/domain|verify|invalid.*from|422/.test(lower)) {
    return "Resend отказа изпращането. Провери изпращача (верифициран домейн в resend.com).";
  }
  return "Изпращането не бе успешно. Опитай по-късно.";
}

export async function sendContactEmail(data: ContactFormPayload): Promise<void> {
  const apiKey = trimEnv(process.env.RESEND_API_KEY);
  if (!apiKey) {
    throw new Error(
      "Липсва RESEND_API_KEY. Задай го в .env (виж .env.example)."
    );
  }

  const to = trimEnv(process.env.CONTACT_TO_EMAIL);
  if (!to) {
    throw new Error(
      "Липсва CONTACT_TO_EMAIL. Задай го в .env (виж .env.example)."
    );
  }

  // Resend only allows `from` on verified domains — not the visitor's @abv.bg / @gmail etc.
  const from =
    trimEnv(process.env.RESEND_FROM) || "onboarding@resend.dev";

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `Заявка за консултация — ${data.name}`,
    text: buildMailText(data),
  });

  if (error) throw new Error(error.message);
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
    const message = err instanceof Error ? err.message : String(err);
    if (/^Липсва\b/.test(message)) {
      console.error("[contact-mail]", message);
      return { ok: false, status: 500, error: message };
    }
    console.error("[contact-mail]", err);
    return { ok: false, status: 500, error: resendFailureMessage(err) };
  }
}
