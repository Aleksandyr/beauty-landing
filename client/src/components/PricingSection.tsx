interface PricingItem {
  name: string;
  price: string;
  subtitle?: string;
  description?: string;
  /** Renders a small gold heading above this row (e.g. grouping). */
  sectionHeading?: string;
}

const pricingItems: PricingItem[] = [
  {
    name: "Hairstrokes (косъм по косъм)",
    price: "€300 – €330",
    description: "Естествена визия с фини косъмчета",
  },
  {
    name: "Микропигментация",
    price: "€300 – €330",
    description: "Мека и плътна форма с дълготраен резултат",
  },
  {
    name: "Микроблейдинг",
    price: "от 300 – 330 €",
    description: "Ръчна техника за естествен ефект",
  },
  {
    name: "Годишен Refresh (освежаване)",
    price: "от 200 – 230 €",
    description: "Освежаване на съществуващ перманентен грим",
  },
  {
    sectionHeading: "ОЧНА ЛИНИЯ",
    name: "Перманентна очна линия",
    price: "от 300 – 350 €",
    description: "Подчертаване на погледа с естествен ефект",
  },
  {
    name: "Поддръжка на очна линия",
    price: "от 220 – 260 €",
  },
  {
    sectionHeading: "УСТНИ",
    name: "Перманентно червило (Soft Lips)",
    price: "от 300 – 350 €",
    description: "Подчертаване на естествения цвят и форма",
  },
  {
    name: "Поддръжка на червило",
    price: "от 220 – 260 €",
  },
  {
    sectionHeading: "МИГЛИ И ВЕЖДИ",
    name: "Миглопластика",
    price: "60 – 70 €",
  },
  {
    name: "Ламиниране на мигли и вежди",
    price: "30 – 40 €",
  },
  {
    sectionHeading: "ЛАЗЕРНИ ПРОЦЕДУРИ",
    name: "Лазерно премахване на перманентен грим",
    price: "от 60 – 70 € / сесия",
  },
  {
    name: "Карбонов пилинг",
    price: "100 – 150 €",
  },
  {
    name: "Лазерно премахване на татуировки",
    price: "според зона и размер",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-black py-24 text-neutral-100">
      <div className="container">
        <div className="text-center mb-20">
          <span className="text-xs tracking-widest font-semibold text-[#D4AF37]" style={{ fontFamily: "Inter" }}>
            ИНВЕСТИРАЙ В КРАСОТАТА СИ
          </span>
          <h2
            className="mt-4 text-6xl font-light text-neutral-100"
            style={{ fontFamily: "Bodoni Moda" }}
          >
            Цени на Услугите
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400" style={{ fontFamily: "Inter" }}>
            Инвестиция в качество, дълготраен резултат и професионална грижа.
          </p>
          <div className="w-12 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-none"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {pricingItems.map((item, index) => (
            <div key={index} className="space-y-3">
              {item.sectionHeading ? (
                <p
                  className="mb-1 text-xs font-semibold tracking-widest text-[#D4AF37]"
                  style={{ fontFamily: "Inter" }}
                >
                  {item.sectionHeading}
                </p>
              ) : null}
              {/* Main pricing row with dotted line */}
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex-1">
                  <h3
                    className="text-xl font-light text-neutral-100"
                    style={{ fontFamily: "Bodoni Moda" }}
                  >
                    {item.name}
                  </h3>
                  {item.subtitle && (
                    <p className="mt-1 text-sm text-neutral-500" style={{ fontFamily: "Inter" }}>
                      {item.subtitle}
                    </p>
                  )}
                </div>
                
                {/* Dotted line */}
                <div className="flex-1 flex items-center px-4">
                  <div
                    className="flex-1 border-b border-dotted border-neutral-600"
                    style={{ borderBottomStyle: "dotted" }}
                  ></div>
                </div>

                {/* Price */}
                <span
                  className="text-lg font-light text-[#D4AF37] whitespace-nowrap"
                  style={{ fontFamily: "Bodoni Moda" }}
                >
                  {item.price}
                </span>
              </div>

              {/* Description if available */}
              {item.description && (
                <p className="pl-0 text-sm text-neutral-400" style={{ fontFamily: "Inter" }}>
                  {item.description}
                </p>
              )}

              {/* Divider between items */}
              {index < pricingItems.length - 1 && (
                <div className="border-b border-neutral-800 pt-4"></div>
              )}
            </div>
          ))}
        </div>

        <div
          className="mx-auto mt-14 max-w-4xl border border-[#D4AF37]/35 bg-neutral-950/90 px-6 py-5 text-sm leading-relaxed text-neutral-300"
          style={{ fontFamily: "Inter" }}
        >
          <p className="mb-3 font-semibold tracking-wide text-[#D4AF37]">⚠ Важно</p>
          <p className="mb-2">
            Цените са ориентировъчни и могат да варират в зависимост от индивидуалния случай,
            техника и сложност на процедурата.
          </p>
          <p className="mb-0 text-neutral-400">
            Окончателната цена се определя след консултация.
          </p>
        </div>

        {/* Package Deals Section */}
        <div className="mt-20 border-t-2 border-neutral-800 pt-12 text-center">
          <h3
            className="mb-6 text-3xl font-light text-neutral-100"
            style={{ fontFamily: "Bodoni Moda" }}
          >
            Пакетни оферти & Промоции
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-base text-neutral-300" style={{ fontFamily: "Inter" }}>
            Комбинирай няколко услиги и спести до 20%. Запиши се за консултация и обсъди пакетите, подходящи за твоите нужди и бюджет.
          </p>
          <a
            href="#contact"
            className="inline-block rounded-none border border-[#D4AF37] bg-[#D4AF37] px-8 py-3 font-medium text-black transition-all hover:border-[#b8941f] hover:bg-[#b8941f] hover:text-white"
            style={{ fontFamily: "Inter" }}
          >
            Запитвания за пакети
          </a>
        </div>
      </div>
    </section>
  );
}
