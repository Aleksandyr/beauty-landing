import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    category: "Процедури и перманентен грим",
    question: "Болезнени ли са процедурите?",
    answer:
      "По време на процедурите се използват висококачествени анестетици, които значително намаляват дискомфорта. Усещането е индивидуално, но в повечето случаи е напълно поносимо.",
  },
  {
    category: "Процедури и перманентен грим",
    question: "Колко време трае процедурата?",
    answer:
      "В зависимост от избраната услуга, процедурите отнемат между 1 и 3 часа.",
  },
  {
    category: "Процедури и перманентен грим",
    question: "Колко време се задържа перманентният грим?",
    answer:
      "Трайността е между 12 и 24 месеца, в зависимост от типа кожа, начина на живот и грижата след процедурата.",
  },
  {
    category: "Процедури и перманентен грим",
    question: "Необходима ли е корекция?",
    answer:
      "Да. Корекцията е задължителна и се извършва 4–6 седмици след първата процедура, за да се фиксира цветът и формата.",
  },
  {
    category: "Процедури и перманентен грим",
    question: "Как протича възстановяването?",
    answer:
      "След процедурата е възможно леко зачервяване и чувствителност. В рамките на няколко дни може да се появи леко лющене, което е нормална част от процеса.",
  },
  {
    category: "Процедури и перманентен грим",
    question: "Мога ли да използвам грим след процедурата?",
    answer:
      "Препоръчва се да се избягва нанасяне на грим в третираната зона за около 7 дни, до пълното възстановяване на кожата.",
  },
  {
    category: "Процедури и перманентен грим",
    question: "Подходящ ли е перманентният грим за всеки?",
    answer:
      "В повечето случаи да, но има противопоказания. Затова преди процедурата се провежда индивидуална консултация.",
  },
  {
    category: "Процедури и перманентен грим",
    question: "Как да избера подходящата техника?",
    answer:
      "Изборът се прави след консултация, като се вземат предвид формата на лицето, типа кожа и желания резултат.",
  },
  {
    category: "Мигли и ламиниране",
    question: "Колко време трае ефектът при миглопластика и ламиниране?",
    answer:
      "Ефектът при тези процедури се запазва между 4 и 6 седмици, в зависимост от индивидуалния растеж на косъмчетата.",
  },
  {
    category: "Лазерни процедури",
    question: "Колко процедури са нужни за лазерно премахване?",
    answer:
      "Броят на процедурите е индивидуален и зависи от пигмента, дълбочината и зоната. Обикновено са необходими няколко сесии.",
  },
  {
    category: "Лазерни процедури",
    question: "Безопасни ли са лазерните процедури?",
    answer:
      "Да, когато се извършват от специалист с подходяща техника и опит. Процедурите са съобразени с типа кожа и състоянието ѝ.",
  },
  {
    category: "Записване",
    question: "Как да запиша час?",
    answer:
      "Може да запишете час чрез съобщение в Instagram, Viber или телефонно обаждане. След кратка консултация ще получите подходящо предложение за процедура и дата.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const categories = Array.from(new Set(faqItems.map((item) => item.category)));

  return (
    <section id="faq" className="bg-black py-24 text-neutral-100">
      <div className="container">
        <div className="text-center mb-20">
          <span className="text-xs tracking-widest font-semibold text-[#D4AF37]" style={{ fontFamily: "Inter" }}>
            ОБЩИ ВЪПРОСИ
          </span>
          <h2
            className="mt-4 text-6xl font-light text-neutral-100"
            style={{ fontFamily: "Bodoni Moda" }}
          >
            Често Задавани Въпроси
          </h2>
          <div className="w-12 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-none"></div>
        </div>

        <div className="mx-auto max-w-4xl">
          {categories.map((category, catIndex) => (
            <div
              key={category}
              className={catIndex > 0 ? "mt-14" : undefined}
            >
              {catIndex > 0 ? (
                <div
                  className="mb-10 flex items-center gap-4"
                  aria-hidden="true"
                >
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-700 to-neutral-600" />
                  <div className="h-px w-14 shrink-0 bg-[#D4AF37]/85" />
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-neutral-700 to-neutral-600" />
                </div>
              ) : null}
              <h3
                className="mb-6 border-b-2 border-neutral-800 pb-4 text-2xl font-light text-neutral-100"
                style={{ fontFamily: "Bodoni Moda" }}
              >
                {category}
              </h3>

              <div className="space-y-4">
                {faqItems
                  .filter((item) => item.category === category)
                  .map((item, index) => {
                    const globalIndex = faqItems.indexOf(item);
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div
                        key={globalIndex}
                        className="border-b border-neutral-800 pb-4"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenIndex(isOpen ? null : globalIndex)
                          }
                          className="group flex w-full items-start justify-between gap-4 rounded-none py-4 text-left transition-colors hover:bg-[#b8941f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                          <span
                            className="flex-1 text-lg font-light text-neutral-100 transition-colors group-hover:text-white"
                            style={{ fontFamily: "Bodoni Moda" }}
                          >
                            {item.question}
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-300 group-hover:text-white ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div
                            className="pb-4 text-base leading-relaxed text-neutral-300"
                            style={{ fontFamily: "Inter" }}
                          >
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="mb-6 text-neutral-400" style={{ fontFamily: "Inter" }}>
            Не открихте отговор? Свържете се с нас за индивидуална консултация.
          </p>
          <a
            href="#contact"
            className="inline-block rounded-none border border-[#D4AF37] bg-[#D4AF37] px-8 py-3 font-medium text-black transition-all hover:border-[#b8941f] hover:bg-[#b8941f] hover:text-white"
            style={{ fontFamily: "Inter" }}
          >
            Свържете се с нас
          </a>
        </div>
      </div>
    </section>
  );
}
