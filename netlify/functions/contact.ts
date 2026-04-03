import type { Handler, HandlerEvent } from "@netlify/functions";
import { handleContactRequest } from "../../server/contact-mail";

const json = (
  statusCode: number,
  body: object,
  extraHeaders?: Record<string, string>
) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    ...extraHeaders,
  },
  body: JSON.stringify(body),
});

export const handler: Handler = async (event: HandlerEvent) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 204,
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: "",
      };
    }

    if (event.httpMethod !== "POST") {
      return json(405, { ok: false, error: "Method not allowed" });
    }

    let body: unknown = {};
    try {
      body = event.body ? JSON.parse(event.body) : {};
    } catch {
      return json(400, { ok: false, error: "Невалиден JSON." });
    }

    const result = await handleContactRequest(body);
    if (!result.ok) {
      return json(result.status, {
        ok: false,
        error: result.error,
        fieldErrors: result.fieldErrors,
      });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error("[contact fn]", err);
    return json(
      500,
      {
        ok: false,
        error: "Вътрешна грешка на сървъра.",
      },
      {
        "Access-Control-Allow-Origin": "*",
      }
    );
  }
};
