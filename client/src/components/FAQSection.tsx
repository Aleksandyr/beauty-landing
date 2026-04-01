import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    category: "Microblading",
    question: "How long do microblading results last?",
    answer: "Microblading results typically last 12-18 months. After your initial appointment and touch-up (4 weeks later), you'll need a refresh appointment annually to maintain the color and shape.",
  },
  {
    category: "Microblading",
    question: "Is microblading painful?",
    answer: "Most clients experience minimal discomfort. We apply a numbing cream before the procedure to ensure your comfort. You may feel slight pressure or scratching, but it's generally well-tolerated.",
  },
  {
    category: "Microblading",
    question: "What is the aftercare process?",
    answer: "Keep the area dry for 7-10 days, avoid makeup and skincare products on the brows, and don't pick or scratch. Use the provided aftercare cream as instructed. Avoid swimming, saunas, and excessive sweating during healing.",
  },
  {
    category: "Eyelash Extensions",
    question: "How long do eyelash extensions last?",
    answer: "Eyelash extensions typically last 4-6 weeks. Natural lashes shed every 60-90 days, so maintenance refills are recommended every 2-3 weeks to maintain fullness.",
  },
  {
    category: "Eyelash Extensions",
    question: "Can I wear makeup with eyelash extensions?",
    answer: "Yes, you can wear makeup, but use oil-free products and avoid waterproof mascara. We recommend avoiding heavy eye makeup during the first 24 hours after application.",
  },
  {
    category: "Eyelash Extensions",
    question: "How do I care for my lash extensions?",
    answer: "Avoid water for 24 hours after application, use oil-free makeup remover, brush lashes gently with the provided spoolie, and avoid rubbing your eyes. Sleep on your back to prevent damage.",
  },
  {
    category: "Laser Pigmentation Removal",
    question: "How many sessions are needed for removal?",
    answer: "The number of sessions varies depending on pigment depth, color, and age. Most clients need 3-8 sessions spaced 6-8 weeks apart. We'll assess your specific situation during consultation.",
  },
  {
    category: "Laser Pigmentation Removal",
    question: "Is laser removal safe?",
    answer: "Yes, our advanced laser technology is safe and FDA-approved. We use cooling technology to minimize discomfort and protect surrounding skin. Some redness and swelling may occur temporarily.",
  },
  {
    category: "Laser Pigmentation Removal",
    question: "What should I avoid after laser treatment?",
    answer: "Avoid sun exposure, swimming, and intense exercise for 48 hours. Don't pick or scratch the treated area. Use sunscreen (SPF 30+) for at least 2 weeks and follow our aftercare instructions carefully.",
  },
  {
    category: "Permanent Lipstick",
    question: "How long does permanent lipstick last?",
    answer: "Permanent lipstick typically lasts 2-3 years. Color may fade gradually, and you may want a refresh appointment to maintain vibrancy. We can adjust the shade or intensity during touch-ups.",
  },
  {
    category: "Permanent Lipstick",
    question: "Will the color look natural?",
    answer: "Yes! We customize the color to match your skin tone and preferences. During consultation, we'll show you color options and help you choose the perfect shade for a natural, flattering look.",
  },
  {
    category: "Permanent Lipstick",
    question: "What is the healing process like?",
    answer: "Expect slight swelling and tenderness for 24-48 hours. The color will appear darker initially and lighten as it heals. Avoid hot foods, spicy foods, and staining beverages for 48 hours.",
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
            COMMON QUESTIONS
          </span>
          <h2
            className="mt-4 text-6xl font-light text-neutral-100"
            style={{ fontFamily: "Bodoni Moda" }}
          >
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400" style={{ fontFamily: "Inter" }}>
            Find answers to common questions about our beauty services, aftercare, and procedures.
          </p>
          <div className="w-12 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-none"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {categories.map((category) => (
            <div key={category}>
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
                          onClick={() =>
                            setOpenIndex(isOpen ? null : globalIndex)
                          }
                          className="w-full flex items-start justify-between gap-4 py-4 hover:text-[#D4AF37] transition-colors text-left"
                        >
                          <span
                            className="flex-1 text-lg font-light text-neutral-100"
                            style={{ fontFamily: "Bodoni Moda" }}
                          >
                            {item.question}
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-300 ${
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
            Didn't find your answer? Contact us directly for personalized assistance.
          </p>
          <button
            className="rounded-none border border-[#D4AF37] bg-[#D4AF37] px-8 py-3 font-medium text-black transition-all hover:bg-white hover:text-[#D4AF37]"
            style={{ fontFamily: "Inter" }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
