import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

const intro =
  "Доверието и удовлетворението на клиентите са най-важната част от моята работа. Всеки резултат е съобразен индивидуално, с внимание към детайла и естествената визия.";

const clientReviews: string[] = [
  "Изключителен професионализъм и внимание към детайла. Резултатът е много естествен – точно това, което исках!",
  "Посетих студиото за перманентен грим на вежди и съм изключително доволна. Формата е перфектна и много добре съобразена с лицето ми.",
  "Препоръчвам с две ръце! Много внимателна, обяснява всичко подробно и резултатът е страхотен.",
  "Soft Lips процедурата надмина очакванията ми – устните изглеждат свежи и естествени.",
  "Изключително прецизна работа! Веждите ми изглеждат напълно естествено, никой не може да разбере, че имам перманентен грим.",
  "Посещавам студиото не за първи път и винаги съм повече от доволна. Работи много чисто и прецизно.",
  "Имах стар перманентен грим и след лазерните процедури резултатът е страхотен. Много съм благодарна!",
];

const studentReviews: string[] = [
  "Обучението беше изключително подробно и полезно. Получих много повече увереност и знания, отколкото очаквах.",
  "Много добро отношение и индивидуално внимание. Препоръчвам на всеки, който иска да започне в тази сфера.",
  "Практиката върху модел беше най-ценната част. Чувствам се подготвена да започна работа.",
  "Бих записала отново без колебание. Страхотно отношение и професионализъм.",
];

function StarsRating() {
  return (
    <div
      className="absolute bottom-4 right-4 flex gap-px"
      role="img"
      aria-label="Оценка: 5 от 5 звезди"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className="h-3 w-3 fill-[#D4AF37] text-[#D4AF37]"
          aria-hidden
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function ReviewCard({ text }: { text: string }) {
  return (
    <article className="relative w-[min(100vw-3rem,22rem)] shrink-0 border-l-2 border-l-[#D4AF37]/70 border-y border-r border-y-neutral-800 border-r-neutral-800 bg-neutral-950/95 p-6 pb-11 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(212,175,55,0.08)] sm:w-80">
      <span className="mb-3 block text-lg opacity-90" aria-hidden>
        💬
      </span>
      <p
        className="pr-14 text-[15px] leading-relaxed text-neutral-300"
        style={{ fontFamily: "Inter" }}
      >
        <span className="text-[#D4AF37]/90">„</span>
        {text}
        <span className="text-[#D4AF37]/90">“</span>
      </p>
      <StarsRating />
    </article>
  );
}

const SCROLLBAR_HIDE =
  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

function InfiniteReviewTrack({
  reviews,
  direction,
  ariaLabel,
}: {
  reviews: string[];
  direction: "left" | "right";
  ariaLabel: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const singleW = () => el.scrollWidth / 2;

    const init = () => {
      if (direction === "right" && el.scrollWidth > 0) {
        el.scrollLeft = singleW();
      }
    };
    init();
    const ro = new ResizeObserver(init);
    ro.observe(el);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;

    const speed = direction === "left" ? 0.45 : -0.45;
    const loop = () => {
      if (
        !reduceMotion.matches &&
        !pausedRef.current &&
        el.scrollWidth > 0
      ) {
        const half = singleW();
        el.scrollLeft += speed;
        if (direction === "left") {
          if (el.scrollLeft >= half - 0.5) el.scrollLeft -= half;
        } else {
          if (el.scrollLeft <= 0.5) el.scrollLeft += half;
        }
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

    const pause = () => {
      pausedRef.current = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };

    const scheduleResume = () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        pausedRef.current = false;
      }, 2800);
    };

    el.addEventListener("pointerdown", pause);
    el.addEventListener("pointerup", scheduleResume);
    el.addEventListener("pointercancel", scheduleResume);
    el.addEventListener("pointerleave", scheduleResume);
    const onWheel = () => {
      pause();
      scheduleResume();
    };
    el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("pointerup", scheduleResume);
      el.removeEventListener("pointercancel", scheduleResume);
      el.removeEventListener("pointerleave", scheduleResume);
      el.removeEventListener("wheel", onWheel);
    };
  }, [direction]);

  const doubled = [...reviews, ...reviews];

  return (
    <div
      className="relative -mx-4 sm:mx-0"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        ref={scrollerRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className={`flex cursor-grab gap-4 overflow-x-auto overflow-y-hidden px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40 sm:px-0 ${SCROLLBAR_HIDE}`}
        style={{ scrollBehavior: "auto" }}
      >
        {doubled.map((text, i) => (
          <ReviewCard key={`${direction}-${i}`} text={text} />
        ))}
      </div>
    </div>
  );
}

function ReviewSectionBlock({
  eyebrow,
  title,
  subtitle,
  reviews,
  direction,
  ariaLabel,
  headingLevel = "h2",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  reviews: string[];
  direction: "left" | "right";
  ariaLabel: string;
  headingLevel?: "h2" | "h3";
}) {
  const HeadingTag = headingLevel;
  return (
    <div className="border-t border-neutral-800 pt-20 first:border-t-0 first:pt-0">
      <div className="mb-10 text-center">
        <span
          className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37]"
          style={{ fontFamily: "Inter" }}
        >
          {eyebrow}
        </span>
        <HeadingTag
          className="mt-4 text-3xl font-light text-neutral-100 sm:text-4xl md:text-5xl"
          style={{ fontFamily: "Bodoni Moda" }}
        >
          {title}
        </HeadingTag>
        <p
          className="mx-auto mt-3 max-w-xl text-base text-neutral-400"
          style={{ fontFamily: "Inter" }}
        >
          {subtitle}
        </p>
        <div className="mx-auto mt-6 h-px max-w-xs bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      </div>

      <InfiniteReviewTrack
        reviews={reviews}
        direction={direction}
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

export default function ClientReviews() {
  return (
    <section id="reviews" className="bg-black py-24 text-neutral-100">
      <div className="container">
        <p
          className="mx-auto mb-10 max-w-3xl text-center text-lg leading-relaxed text-neutral-400"
          style={{ fontFamily: "Inter" }}
        >
          {intro}
        </p>
        <div className="mx-auto mb-14 max-w-xl border-t border-neutral-800" />

        <ReviewSectionBlock
          eyebrow="КЛИЕНТИ"
          title="Какво казват клиентите"
          subtitle="Реални впечатления от посетители на студиото"
          reviews={clientReviews}
          direction="left"
          ariaLabel="Отзиви от клиенти — плъзни за преглед"
        />

        <ReviewSectionBlock
          eyebrow="ОБУЧЕНИЯ"
          title="Отзиви от курсисти"
          subtitle="Какво казват курсистите ни след обученията"
          reviews={studentReviews}
          direction="right"
          ariaLabel="Отзиви от курсисти — плъзни за преглед"
          headingLevel="h3"
        />
      </div>
    </section>
  );
}
