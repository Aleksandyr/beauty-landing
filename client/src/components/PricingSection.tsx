interface PricingItem {
  name: string;
  price: string;
  subtitle?: string;
  description?: string;
}

const pricingItems: PricingItem[] = [
  {
    name: "Microblading",
    price: "$399",
    subtitle: "(includes touch-up)",
    description: "Precision eyebrow enhancement with natural-looking strokes",
  },
  {
    name: "Eyelash Extensions",
    price: "$249",
    subtitle: "(full set)",
    description: "Premium quality synthetic lashes, customizable length and curl",
  },
  {
    name: "Laser Pigmentation Removal",
    price: "$299",
    subtitle: "(per session)",
    description: "Advanced laser technology, multiple sessions may be needed",
  },
  {
    name: "Permanent Lipstick",
    price: "$349",
    subtitle: "(includes touch-up)",
    description: "Long-lasting lip color with custom color selection",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-black py-24 text-neutral-100">
      <div className="container">
        <div className="text-center mb-20">
          <span className="text-xs tracking-widest font-semibold text-[#D4AF37]" style={{ fontFamily: "Inter" }}>
            INVESTMENT IN YOUR BEAUTY
          </span>
          <h2
            className="mt-4 text-6xl font-light text-neutral-100"
            style={{ fontFamily: "Bodoni Moda" }}
          >
            Service Pricing
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400" style={{ fontFamily: "Inter" }}>
            Transparent pricing for premium beauty services. All prices include consultation and professional aftercare support.
          </p>
          <div className="w-12 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-none"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {pricingItems.map((item, index) => (
            <div key={index} className="space-y-3">
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

        {/* Package Deals Section */}
        <div className="mt-20 border-t-2 border-neutral-800 pt-12 text-center">
          <h3
            className="mb-6 text-3xl font-light text-neutral-100"
            style={{ fontFamily: "Bodoni Moda" }}
          >
            Package Deals & Discounts
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-base text-neutral-300" style={{ fontFamily: "Inter" }}>
            Combine multiple services and save up to 20%. Book a consultation to discuss custom packages tailored to your needs and budget.
          </p>
          <button
            className="rounded-none border border-[#D4AF37] bg-[#D4AF37] px-8 py-3 font-medium text-black transition-all hover:border-[#b8941f] hover:bg-[#b8941f] hover:text-white"
            style={{ fontFamily: "Inter" }}
          >
            Inquire About Packages
          </button>
        </div>
      </div>
    </section>
  );
}
