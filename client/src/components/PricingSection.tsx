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
    <section id="pricing" className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-20">
          <span className="text-xs tracking-widest font-semibold text-[#D4AF37]" style={{ fontFamily: "Inter" }}>
            INVESTMENT IN YOUR BEAUTY
          </span>
          <h2
            className="text-6xl font-light mt-4"
            style={{ fontFamily: "Bodoni Moda" }}
          >
            Service Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6" style={{ fontFamily: "Inter" }}>
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
                    className="text-xl font-light"
                    style={{ fontFamily: "Bodoni Moda" }}
                  >
                    {item.name}
                  </h3>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: "Inter" }}>
                      {item.subtitle}
                    </p>
                  )}
                </div>
                
                {/* Dotted line */}
                <div className="flex-1 flex items-center px-4">
                  <div
                    className="flex-1 border-b border-dotted border-gray-400"
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
                <p className="text-sm text-gray-600 pl-0" style={{ fontFamily: "Inter" }}>
                  {item.description}
                </p>
              )}

              {/* Divider between items */}
              {index < pricingItems.length - 1 && (
                <div className="border-b border-gray-200 pt-4"></div>
              )}
            </div>
          ))}
        </div>

        {/* Package Deals Section */}
        <div className="mt-20 pt-12 border-t-2 border-gray-300 text-center">
          <h3
            className="text-3xl font-light mb-6"
            style={{ fontFamily: "Bodoni Moda" }}
          >
            Package Deals & Discounts
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8 text-base" style={{ fontFamily: "Inter" }}>
            Combine multiple services and save up to 20%. Book a consultation to discuss custom packages tailored to your needs and budget.
          </p>
          <button
            className="bg-[#0A0A0A] text-white px-8 py-3 rounded-none hover:bg-[#D4AF37] hover:text-white transition-all font-medium"
            style={{ fontFamily: "Inter" }}
          >
            Inquire About Packages
          </button>
        </div>
      </div>
    </section>
  );
}
