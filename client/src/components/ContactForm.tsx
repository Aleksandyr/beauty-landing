import { useState } from "react";
import { Button } from "@/components/ui/button";
import contactSectionVisual from "@/assets/contact-section-visual.png";
import {
  CONTACT_MESSAGE_MIN_LENGTH,
  contactFormSchema,
} from "@shared/contact-schema";

const serviceLabels: Record<string, string> = {
  hairstrokes: "Hairstrokes / микропигментация",
  microblading: "Микроблейдинг",
  eyeliner: "Перманентна очна линия",
  lips: "Перманентно червило (Soft Lips)",
  lashes: "Мигли / ламиниране",
  laser: "Лазерни процедури",
  other: "Друго / консултация",
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messageLen = formData.message.trim().length;
  const messageOk = messageLen >= CONTACT_MESSAGE_MIN_LENGTH;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 15);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsedLocal = contactFormSchema.safeParse(formData);
    if (!parsedLocal.success) {
      setError(parsedLocal.error.issues[0]?.message ?? "Провери полетата.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedLocal.data),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Грешка при изпращане. Опитай отново.");
        return;
      }
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError("Няма връзка със сървъра. Опитай по-късно.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-0 overflow-hidden bg-black lg:grid-cols-2 lg:items-stretch lg:min-h-[min(88vh,800px)]">
      <div className="relative h-[min(32vh,240px)] w-full shrink-0 overflow-hidden bg-black sm:h-[min(36vh,280px)] lg:h-full lg:min-h-[560px]">
        <img
          src={contactSectionVisual}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top lg:object-[center_22%]"
        />
      </div>

      <div className="flex items-center justify-center bg-black px-4 py-8 sm:px-6 sm:py-10 lg:p-10 xl:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg space-y-4 sm:space-y-6"
          noValidate
        >
          <div className="mb-6 sm:mb-8">
            <h2
              className="mb-2 text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "Bodoni Moda" }}
            >
              Свържи се с нас
            </h2>
            <p
              className="text-[10px] font-semibold uppercase leading-snug tracking-[0.2em] text-gray-400 sm:text-xs"
              style={{ fontFamily: "Inter" }}
            >
              Персонализирана красота и грижа според твоите нужди.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-6">
            <div>
              <label
                className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-gray-300 sm:mb-3 sm:text-xs"
                style={{ fontFamily: "Inter" }}
              >
                Име и фамилия
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Име Фамилия"
                className="w-full border-b border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:outline-none sm:py-3 sm:text-base"
                style={{ fontFamily: "Inter" }}
              />
            </div>

            <div>
              <label
                className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-gray-300 sm:mb-3 sm:text-xs"
                style={{ fontFamily: "Inter" }}
              >
                Имейл
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="име@пример.bg"
                className="w-full border-b border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:outline-none sm:py-3 sm:text-base"
                style={{ fontFamily: "Inter" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-6">
            <div>
              <label
                className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-gray-300 sm:mb-3 sm:text-xs"
                style={{ fontFamily: "Inter" }}
              >
                Телефон <span className="text-neutral-500">(само цифри)</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                autoComplete="tel"
                placeholder="0888123456"
                minLength={8}
                maxLength={15}
                pattern="\d{8,15}"
                title="8–15 цифри"
                className="w-full border-b border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:outline-none sm:py-3 sm:text-base"
                style={{ fontFamily: "Inter" }}
              />
            </div>

            <div>
              <label
                className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-gray-300 sm:mb-3 sm:text-xs"
                style={{ fontFamily: "Inter" }}
              >
                Желана услуга
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full cursor-pointer appearance-none border-b border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none sm:py-3 sm:text-base"
                style={{ fontFamily: "Inter" }}
              >
                <option value="" className="bg-black text-white">
                  Избери услуга
                </option>
                {Object.entries(serviceLabels).map(([value, label]) => (
                  <option key={value} value={value} className="bg-black text-white">
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-gray-300 sm:mb-3 sm:text-xs"
              style={{ fontFamily: "Inter" }}
            >
              Съобщение{" "}
              <span className="font-normal text-neutral-500">
                (минимум {CONTACT_MESSAGE_MIN_LENGTH} знака)
              </span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Разкажи ни накратко какво търсиш или задай въпрос…"
              rows={4}
              minLength={CONTACT_MESSAGE_MIN_LENGTH}
              className="w-full resize-none border-b border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:outline-none sm:py-3 sm:text-base"
              style={{ fontFamily: "Inter" }}
            />
            <p
              className={`mt-1 text-xs ${messageOk ? "text-green-600/90" : "text-neutral-500"}`}
              style={{ fontFamily: "Inter" }}
            >
              {messageLen}/{CONTACT_MESSAGE_MIN_LENGTH} —{" "}
              {messageOk
                ? "достатъчно дълго"
                : `добави още ${CONTACT_MESSAGE_MIN_LENGTH - messageLen} знака`}
            </p>
          </div>

          <div className="pt-4 sm:pt-6">
            <Button
              type="submit"
              disabled={loading || !messageOk}
              className="w-full rounded-none border-none bg-white px-6 py-3 text-xs font-semibold tracking-wider text-[#0A0A0A] transition-all hover:bg-[#D4AF37] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-4 sm:text-sm"
              style={{ fontFamily: "Inter" }}
            >
              {loading ? "Изпращане…" : "Заявка за консултация"}
            </Button>
          </div>

          {error && (
            <div className="rounded-none border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-200">
              <p style={{ fontFamily: "Inter" }}>{error}</p>
            </div>
          )}

          {submitted && (
            <div className="rounded-none border border-green-700 bg-green-900/30 px-4 py-3 text-sm text-green-300">
              <p style={{ fontFamily: "Inter" }}>
                Благодарим! Съобщението е изпратено — ще се свържем с теб скоро.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
