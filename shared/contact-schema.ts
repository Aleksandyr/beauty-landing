import { z } from "zod";

/** Minimum trimmed length for the message field (client + server). */
export const CONTACT_MESSAGE_MIN_LENGTH = 30;

/** Shared server + client validation for the contact form */
export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Моля, въведи име.").max(200),
  email: z.string().email("Моля, въведи валиден имейл.").max(320),
  phone: z
    .string()
    .regex(
      /^\d{8,15}$/,
      "Телефонът трябва да съдържа само цифри (8–15)."
    ),
  service: z.string().min(1, "Избери услуга."),
  message: z
    .string()
    .trim()
    .min(
      CONTACT_MESSAGE_MIN_LENGTH,
      `Съобщението трябва да е поне ${CONTACT_MESSAGE_MIN_LENGTH} знака.`
    )
    .max(5000),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;
