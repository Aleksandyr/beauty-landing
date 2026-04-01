import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  service: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    service: "Microblading",
    rating: 5,
    text: "PhiBrows transformed my eyebrows completely. The precision and artistry are unmatched. I feel so confident now!",
  },
  {
    id: 2,
    name: "Jessica Chen",
    service: "Eyelash Extensions",
    rating: 5,
    text: "Best lash experience ever. The technician was so professional and the results are absolutely stunning. Highly recommend!",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    service: "Permanent Lipstick",
    rating: 5,
    text: "I love my permanent lipstick! It looks so natural and beautiful. The whole experience was luxurious and relaxing.",
  },
  {
    id: 4,
    name: "Olivia Thompson",
    service: "Laser Pigmentation Removal",
    rating: 5,
    text: "Finally got rid of my old tattoo. The laser treatment was painless and the results are incredible. Thank you PhiBrows!",
  },
  {
    id: 5,
    name: "Sophia Anderson",
    service: "Microblading",
    rating: 5,
    text: "The attention to detail is remarkable. My eyebrows look natural yet perfectly defined. Worth every penny!",
  },
];

export default function ClientReviews() {
  return (
    <section id="reviews" className="bg-black py-24 text-neutral-100">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="mb-4 text-6xl font-light text-neutral-100"
            style={{ fontFamily: "Bodoni Moda" }}
          >
            Client Reviews
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400" style={{ fontFamily: "Inter" }}>
            Hear from our satisfied clients who have experienced the PhiBrows difference
          </p>
          <div className="w-12 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-none"></div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-none border border-neutral-800 bg-neutral-950 p-8 transition-shadow hover:shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-[#D4AF37] text-[#D4AF37]"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p
                className="mb-6 text-base leading-relaxed text-neutral-300"
                style={{ fontFamily: "Inter" }}
              >
                "{review.text}"
              </p>

              {/* Client Info */}
              <div className="border-t border-neutral-800 pt-4">
                <p
                  className="font-semibold text-neutral-100"
                  style={{ fontFamily: "Inter" }}
                >
                  {review.name}
                </p>
                <p
                  className="text-sm text-neutral-500"
                  style={{ fontFamily: "Inter" }}
                >
                  {review.service}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
