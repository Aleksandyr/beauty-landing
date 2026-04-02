import { useState } from "react";
import { Button } from "@/components/ui/button";
import contactSectionVisual from "@/assets/contact-section-visual.png";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 gap-0 overflow-hidden bg-black lg:grid-cols-2 lg:items-stretch lg:min-h-[min(88vh,800px)]">
      {/* Visual — без наслагване */}
      <div className="relative h-[min(32vh,240px)] w-full shrink-0 overflow-hidden bg-black sm:h-[min(36vh,280px)] lg:h-full lg:min-h-[560px]">
        <img
          src={contactSectionVisual}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top lg:object-[center_22%]"
        />
      </div>

      {/* Form */}
      <div className="flex items-center justify-center bg-black px-4 py-8 sm:px-6 sm:py-10 lg:p-10 xl:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg space-y-4 sm:space-y-6"
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
                Телефон
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+359 88 …"
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
                <option value="hairstrokes" className="bg-black text-white">
                  Hairstrokes / микропигментация
                </option>
                <option value="microblading" className="bg-black text-white">
                  Микроблейдинг
                </option>
                <option value="eyeliner" className="bg-black text-white">
                  Перманентна очна линия
                </option>
                <option value="lips" className="bg-black text-white">
                  Перманентно червило (Soft Lips)
                </option>
                <option value="lashes" className="bg-black text-white">
                  Мигли / ламиниране
                </option>
                <option value="laser" className="bg-black text-white">
                  Лазерни процедури
                </option>
                <option value="other" className="bg-black text-white">
                  Друго / консултация
                </option>
              </select>
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-gray-300 sm:mb-3 sm:text-xs"
              style={{ fontFamily: "Inter" }}
            >
              Съобщение
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Разкажи ни накратко какво търсиш или задай въпрос…"
              rows={4}
              className="w-full resize-none border-b border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:outline-none sm:py-3 sm:text-base"
              style={{ fontFamily: "Inter" }}
            />
          </div>

          <div className="pt-4 sm:pt-6">
            <Button
              type="submit"
              className="w-full rounded-none border-none bg-white px-6 py-3 text-xs font-semibold tracking-wider text-[#0A0A0A] transition-all hover:bg-[#D4AF37] hover:text-white sm:px-8 sm:py-4 sm:text-sm"
              style={{ fontFamily: "Inter" }}
            >
              Заявка за консултация
            </Button>
          </div>

          {submitted && (
            <div className="rounded-none border border-green-700 bg-green-900/30 px-4 py-3 text-sm text-green-300">
              <p style={{ fontFamily: "Inter" }}>
                Благодарим! Ще се свържем с теб скоро.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
