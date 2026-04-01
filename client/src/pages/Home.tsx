import { Button } from "@/components/ui/button";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import ContactForm from "@/components/ContactForm";
import ClientReviews from "@/components/ClientReviews";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import hairstrokesImage from "@/assets/hairstrokes.png";
import micropigmentationImage from "@/assets/micropigmentation.png";
import microbladingImage from "@/assets/microblading.png";
import hairstrokesPowderImage from "@/assets/hairstrokes-powder.png";
import softLipsImage from "@/assets/soft-lips.png";
import softEyesImage from "@/assets/soft-eyes.png";
import laserProceduresCardImage from "@/assets/laser-procedures-card.png";
import laserPmuRemovalImage from "@/assets/laser-pmu-removal.png";
import laserCarbonPeelingImage from "@/assets/laser-carbon-peeling.png";
import laserTattooRemovalImage from "@/assets/laser-tattoo-removal.png";
import migloplastikaImage from "@/assets/migloplastika.png";
import laminationBrowsLashesImage from "@/assets/lamination-brows-lashes.png";
import moreForMePortrait from "@/assets/more-for-me.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * PhiBrows Landing Page - Material Design
 * Design: Elegant luxury with pink accents, rounded components
 * Typography: Bodoni Moda (serif, editorial) + Inter (clean, readable)
 * Layout: Full-screen hero, compact gallery, pricing section
 */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesCarouselRef = useRef<HTMLDivElement>(null);
  const [canScrollServicesLeft, setCanScrollServicesLeft] = useState(false);
  const [canScrollServicesRight, setCanScrollServicesRight] = useState(true);
  const [focusedCarouselIndex, setFocusedCarouselIndex] = useState(0);

  const updateServicesCarouselScrollState = () => {
    const el = servicesCarouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollServicesLeft(scrollLeft > 4);
    setCanScrollServicesRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  const updateFocusedCarouselCard = useCallback(() => {
    const el = servicesCarouselRef.current;
    if (!el) return;
    const { children } = el;
    if (children.length === 0) return;
    const trackRect = el.getBoundingClientRect();
    const viewportCenterX = trackRect.left + el.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const r = child.getBoundingClientRect();
      const cardCenterX = r.left + r.width / 2;
      const dist = Math.abs(viewportCenterX - cardCenterX);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }
    setFocusedCarouselIndex(bestIdx);
  }, []);

  const scrollServicesCarousel = (dir: "left" | "right") => {
    const el = servicesCarouselRef.current;
    if (!el) return;
    const step = Math.max(el.clientWidth * 0.75, 280);
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  const additionalServices = [
    {
      title: "Soft Lips Перманентно червило",
      description:
        "Soft Lips е техника която подчертава естествения цвят и подобрява формата на устните.",
      image: softLipsImage,
    },
    {
      title: "Soft Eyes",
      description:
        "Перманентната очна линия деликатно подчертава линията на миглите и придава по-изразителен и оформен поглед.",
      image: softEyesImage,
    },
    {
      title: "Лазерни процедури",
      description:
        "Съвременните лазерни технологии почистват, подмладяват и изсветляват кожата, като разграждат пигменти и замърсявания, които организмът естествено елиминира.",
      image: laserProceduresCardImage,
    },
    {
      title: "Миглопластика",
      description:
        "Процедура, която сгъстява естествените мигли, придавайки им по-дълъг, плътен и изразителен вид.",
      image: migloplastikaImage,
    },
    {
      title: "Ламиниране на вежди и мигли",
      description:
        "Процедура, която оформя, подрежда и фиксира косъмчетата в желаната посока, създавайки по-плътен, подреден и естествен вид.",
      image: laminationBrowsLashesImage,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = servicesCarouselRef.current;
    if (!el) return;
    const syncCarouselUi = () => {
      updateServicesCarouselScrollState();
      updateFocusedCarouselCard();
    };
    syncCarouselUi();
    requestAnimationFrame(syncCarouselUi);
    el.addEventListener("scroll", syncCarouselUi, { passive: true });
    const ro = new ResizeObserver(syncCarouselUi);
    ro.observe(el);
    window.addEventListener("resize", syncCarouselUi);
    return () => {
      el.removeEventListener("scroll", syncCarouselUi);
      ro.disconnect();
      window.removeEventListener("resize", syncCarouselUi);
    };
  }, [updateFocusedCarouselCard]);

  const serviceSlideClass = (index: number) =>
    cn(
      "group relative flex min-w-0 w-full flex-col gap-3 px-3 pb-4 pt-2 sm:px-4 sm:pb-5 sm:pt-3 md:px-5 md:pb-6 md:pt-3 lg:px-4 lg:pb-5 snap-center shrink-0",
      /* ~1 card mobile, 2 on tablet, 5 on lg+ (middle card visible) */
      "basis-[85%] md:basis-[calc((100%-2rem)/2)] lg:basis-[calc((100%-8rem)/5)]",
      "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
      focusedCarouselIndex === index
        ? "z-20 shadow-[0_22px_55px_rgba(0,0,0,0.14)] ring-2 ring-[#D4AF37]/40 max-md:scale-[1.02] md:scale-[1.05]"
        : "z-0 shadow-md max-md:scale-100 max-md:opacity-100 md:scale-[0.96] md:opacity-[0.88]"
    );

  const serviceCardTitleClass =
    "min-w-0 max-w-full break-words [overflow-wrap:anywhere] text-pretty font-light leading-tight text-base sm:text-xl lg:text-sm xl:text-base 2xl:text-lg mb-2";

  const serviceCardDescClass =
    "min-w-0 max-w-full break-words [overflow-wrap:anywhere] text-pretty text-gray-600 mb-0 text-xs sm:text-sm leading-relaxed";

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0A0A0A]">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#FAFAF8] shadow-sm border-b border-[#E5E5E0]" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between py-4">
          <div />
          <div className="hidden md:flex gap-12" style={{ fontFamily: "Inter" }}>
            <a href="#services" className={`nav-link text-sm font-semibold transition-colors ${isScrolled ? "text-[#0A0A0A]" : "text-white"} hover:text-[#D4AF37]`}>
              Услуги
            </a>
            <a href="#gallery" className={`nav-link text-sm font-semibold transition-colors ${isScrolled ? "text-[#0A0A0A]" : "text-white"} hover:text-[#D4AF37]`}>
              Галерия
            </a>
            <a href="#pricing" className={`nav-link text-sm font-semibold transition-colors ${isScrolled ? "text-[#0A0A0A]" : "text-white"} hover:text-[#D4AF37]`}>
              Цени
            </a>
            <a href="#about" className={`nav-link text-sm font-semibold transition-colors ${isScrolled ? "text-[#0A0A0A]" : "text-white"} hover:text-[#D4AF37]`}>
              За нас
            </a>
            <a href="#contact" className={`nav-link text-sm font-semibold transition-colors ${isScrolled ? "text-[#0A0A0A]" : "text-white"} hover:text-[#D4AF37]`}>
              Контакти
            </a>
          </div>
          <a
            href="https://wa.me/359899124512"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button className={`transition-all border rounded-none ${isScrolled ? "bg-[#0A0A0A] text-white hover:bg-[#D4AF37] border-[#0A0A0A]" : "bg-[#D4AF37] text-white hover:bg-white hover:text-[#D4AF37] border-[#D4AF37]"}`}>
              Запази Час
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-hero-bw_3955e7a9.webp')`,
            backgroundPosition: 'center 35%',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container">
            <div className="max-w-2xl space-y-8">
              <div className="inline-block">
                <span className="text-xs tracking-widest font-semibold text-[#D4AF37]" style={{ fontFamily: "Inter" }}>
                  LUXURY BEAUTY SERVICES
                </span>
              </div>
              <h1
                className="text-7xl lg:text-8xl font-light leading-tight text-white"
                style={{ fontFamily: "Bodoni Moda" }}
              >
                <span className="block">Tsvetelina Kamenova</span>
                <span className="block text-3xl lg:text-4xl mt-3 font-light">
                  Master Trainer in Permanent Makeup
                </span>
              </h1>
              <p className="text-xl text-gray-100 max-w-lg leading-relaxed" style={{ fontFamily: "Inter" }}>
                Перманентен грим и професионални обучения
              </p>
              <div className="flex gap-6 pt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#D4AF37] text-white px-8 py-6 hover:bg-white hover:text-[#D4AF37] transition-all text-base rounded-none font-semibold">
                      Повече за Мен
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex max-h-[90vh] w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden border-[#E7DBC1] bg-gradient-to-br from-[#FFFEFB] via-white to-[#F8F3E8] p-0 shadow-2xl backdrop-blur-sm sm:max-w-4xl md:max-w-5xl md:flex-row">
                    {/* Left: portrait */}
                    <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-64 md:h-auto md:min-h-[min(78vh,560px)] md:w-[42%]">
                      <img
                        src={moreForMePortrait}
                        alt="Цветелина Каменова"
                        className="h-full w-full object-cover object-[center_20%]"
                      />
                    </div>
                    {/* Right: text (scrolls independently on desktop) */}
                    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto px-6 pb-6 pt-0 sm:px-8 sm:pb-8 md:max-h-[min(90vh,620px)]">
                      <DialogHeader className="space-y-0 pt-0 text-left">
                        <DialogTitle
                          className="text-2xl leading-snug tracking-wide"
                          style={{ fontFamily: "Bodoni Moda" }}
                        >
                          Повече за мен
                        </DialogTitle>
                      </DialogHeader>
                      <div
                        className="mt-10 space-y-5 text-sm leading-relaxed text-foreground sm:mt-12"
                        style={{ fontFamily: "Inter" }}
                      >
                        <div className="space-y-3">
                          <p className="text-xs tracking-[0.25em] text-[#D4AF37] uppercase">
                            Мaster trainer • Permanent makeup
                          </p>
                          <p className="text-base">
                            <span className="font-semibold">
                              Цветелина Каменова
                            </span>{" "}
                            е утвърден професионалист и разпознаваемо име в света
                            на перманентния грим. Нейната работа се отличава с{" "}
                            <span className="font-semibold">
                              изключителна прецизност, естетика и безкомпромисно
                              качество.
                            </span>
                          </p>
                        </div>

                        <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                          <p className="font-semibold text-sm text-[#D4AF37]">
                            Международно признание
                          </p>
                          <p>
                            През <span className="font-semibold">2025 година</span>{" "}
                            печели признанието на световноизвестни имена в
                            областта на перманентния грим, като завоюва{" "}
                            <span className="font-semibold">Първо място</span> на
                            международния шампионат{" "}
                            <span className="italic">The Queens Night</span> с
                            представяне на своята работа в техниката{" "}
                            <span className="font-semibold">Powderbrows</span> —
                            отличие, което утвърждава нейния авторитет и я
                            позиционира сред най-добрите професионалисти в
                            България.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="font-semibold text-sm text-[#D4AF37]">
                            Обучител и ментор
                          </p>
                          <p>
                            Освен активен практик, Цветелина е и{" "}
                            <span className="font-semibold">
                              вдъхновяващ обучител
                            </span>
                            , провеждащ професионални обучения{" "}
                            <span className="font-semibold">
                              на живо и онлайн
                            </span>
                            . Нейните курсове са насочени както към{" "}
                            начинаещи, така и към практикуващи специалисти, които
                            търсят не просто техника, а{" "}
                            <span className="font-semibold">
                              висок стандарт, увереност и професионално
                              израстване.
                            </span>
                          </p>
                        </div>

                        <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                          <p className="font-semibold text-sm text-[#D4AF37]">
                            Цел
                          </p>
                          <p>
                            Участието ѝ в престижни кампании и шампионати е
                            естествено продължение на философията ѝ — да представя
                            перманентния грим като{" "}
                            <span className="font-semibold">
                              изкуство, професия и отговорност
                            </span>
                            , издигнати на най-високо ниво.
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-white relative">
        <div className="container">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-xs tracking-widest font-semibold text-[#D4AF37]" style={{ fontFamily: "Inter" }}>
              УСЛУГИ
            </span>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-light mt-4 px-2"
              style={{ fontFamily: "Bodoni Moda" }}
            >
              {/* Mobile/tablet: stacked */}
              <span className="block lg:hidden">Прецизност</span>
              <span className="block lg:hidden text-[#D4AF37] leading-none">
                &
              </span>
              <span className="block lg:hidden">Артистичност</span>

              {/* Desktop: single centered line */}
              <span className="hidden lg:inline-block lg:relative lg:left-8">
                Прецизност{" "}
                <span className="text-[#D4AF37] leading-none">&</span>{" "}
                Артистичност
              </span>
            </h2>
            <div className="w-12 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-none"></div>
          </div>

          <div className="flex items-stretch gap-2 sm:gap-3 md:gap-5">
            <button
              type="button"
              aria-label="Scroll services left"
              disabled={!canScrollServicesLeft}
              onClick={() => scrollServicesCarousel("left")}
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border-2 border-[#D4AF37] bg-white/90 text-[#0A0A0A] opacity-40 shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-[opacity,transform,box-shadow,background-color,color] max-md:hover:opacity-100 hover:bg-[#D4AF37] hover:text-white max-md:hover:shadow-lg sm:h-12 sm:w-12 md:h-14 md:w-14 md:opacity-100 md:bg-white md:shadow-[0_4px_20px_rgba(0,0,0,0.12)] md:hover:shadow-lg active:scale-95",
                !canScrollServicesLeft &&
                  "pointer-events-none border-[#E5E5E0] text-[#A3A3A3] opacity-25 shadow-none max-md:hover:opacity-25 hover:bg-white/90 hover:text-[#A3A3A3] md:opacity-25 md:bg-white md:hover:bg-white md:hover:text-[#A3A3A3] md:hover:shadow-none"
              )}
            >
              <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.5} aria-hidden />
            </button>
            <div
              ref={servicesCarouselRef}
              className="min-w-0 flex-1 flex gap-4 md:gap-8 overflow-x-auto overflow-y-visible py-4 sm:py-6 snap-x snap-mandatory scroll-smooth touch-pan-x overscroll-x-contain [-webkit-overflow-scrolling:touch] scroll-pl-3 scroll-pr-3 sm:scroll-pl-0 sm:scroll-pr-0 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D4AF37]/40 select-none"
            >
            {/* Service 1: Hairstrokes */}
            <div className={serviceSlideClass(0)}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative h-52 sm:h-64 overflow-hidden mb-4 sm:mb-6 rounded-none shadow-md cursor-pointer select-none">
                    <img
                      src={hairstrokesImage}
                      alt="Hairstrokes"
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span
                        className="px-6 py-2 border border-white/70 text-white tracking-widest text-xs font-semibold rounded-none"
                        style={{ fontFamily: "Inter" }}
                      >
                        повече
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl border-[#E7DBC1] bg-gradient-to-br from-[#FFFEFB] via-white to-[#F8F3E8] backdrop-blur-sm shadow-2xl">
                  <DialogHeader>
                    <DialogTitle
                      className="text-2xl tracking-wide"
                      style={{ fontFamily: "Bodoni Moda" }}
                    >
                      Hairstrokes
                    </DialogTitle>
                  </DialogHeader>
                  <div
                    style={{ fontFamily: "Inter" }}
                    className="space-y-5 text-sm leading-relaxed"
                  >
                    <p className="text-base">
                      <span className="font-semibold">Hairstrokes</span> е
                      хиперреалистична техника за перманентен грим на вежди.
                    </p>
                    <div className="space-y-4">
                      <p>
                        Hairstrokes е хиперреалистична техника за перманентен
                        грим на вежди, при която се създават фини косъмчета,
                        наподобяващи естествения растеж на веждите.
                      </p>

                      <p>
                        Тази техника позволява постигане на изключително
                        естествен резултат, като внимателно се изгражда форма,
                        съобразена с индивидуалните черти на лицето.
                      </p>

                      <p>
                        Всеки косъм се поставя стратегически, за да се създаде
                        хармонична и балансирана визия, без да изглежда тежко
                        или изкуствено.
                      </p>

                      <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                        <div className="font-semibold text-[#D4AF37]">
                          Подходяща за:
                        </div>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            клиенти, които търсят максимално естествен ефект
                          </li>
                          <li>редки и светли вежди</li>
                          <li>фино подчертаване без плътен грим ефект</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <div className="font-semibold text-[#D4AF37]">
                          Какво да очаквате:
                        </div>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Времетраене на процедурата: 2–3 часа</li>
                          <li>Корекция: след 4–6 седмици</li>
                          <li>Трайност: 12–18 месеца</li>
                        </ul>
                      </div>

                      <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                        <div className="font-semibold text-[#D4AF37]">Важно:</div>
                        <p>
                          Резултатът се съобразява индивидуално с типа кожа и
                          начина на живот, като целта е да се създаде естествена
                          и дълготрайна визия.
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <h3
                className={serviceCardTitleClass}
                style={{ fontFamily: "Bodoni Moda" }}
              >
                Hairstrokes
              </h3>
              <p className={serviceCardDescClass} style={{ fontFamily: "Inter" }}>
                Hairstrokes е хиперреалистична техника за перманентен грим на вежди
              </p>
            </div>

            {/* Service 2: Микропигментация на вежди */}
            <div className={serviceSlideClass(1)}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative h-52 sm:h-64 overflow-hidden mb-4 sm:mb-6 rounded-none shadow-md cursor-pointer select-none">
                    <img
                      src={micropigmentationImage}
                      alt="Микропигментация на вежди"
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span
                        className="px-6 py-2 border border-white/70 text-white tracking-widest text-xs font-semibold rounded-none"
                        style={{ fontFamily: "Inter" }}
                      >
                        повече
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl border-[#E7DBC1] bg-gradient-to-br from-[#FFFEFB] via-white to-[#F8F3E8] backdrop-blur-sm shadow-2xl">
                  <DialogHeader>
                    <DialogTitle
                      className="text-2xl tracking-wide"
                      style={{ fontFamily: "Bodoni Moda" }}
                    >
                      Микропигментация на вежди
                    </DialogTitle>
                  </DialogHeader>
                  <div
                    style={{ fontFamily: "Inter" }}
                    className="space-y-5 text-sm leading-relaxed"
                  >
                    <p className="text-base">
                      <span className="font-semibold">Микропигментацията</span>{" "}
                      е техника, при която чрез машинен метод пигментът се
                      въвежда в кожата.
                    </p>

                    <div className="space-y-4">
                      <p>
                        Микропигментацията е съвременна техника за перманентен
                        грим, при която чрез машинен метод пигментът се въвежда
                        в кожата с висока прецизност.
                      </p>
                      <p>
                        Тази техника позволява създаване на{" "}
                        <span className="font-semibold">
                          меки, равномерни и добре оформени вежди
                        </span>
                        , с по-плътен и дълготраен ефект в сравнение с ръчните
                        техники.
                      </p>
                      <p>
                        Резултатът е подчертана форма с фин градиент на цвета,
                        съобразен изцяло с индивидуалните черти на лицето.
                      </p>
                    </div>

                    <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                      <p className="font-semibold text-[#D4AF37]">
                        Подходяща за:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>нормална, комбинирана и мазна кожа</li>
                        <li>
                          клиенти, които желаят по-дълготраен резултат
                        </li>
                        <li>по-плътна и изразена визия на веждите</li>
                        <li>корекция на асиметрия</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold text-[#D4AF37]">
                        Какво да очаквате:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Времетраене на процедурата: 2–3 часа</li>
                        <li>Корекция: след 5-8 седмици</li>
                        <li>Трайност: 12–24 месеца</li>
                      </ul>
                    </div>

                    <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                      <p className="font-semibold text-[#D4AF37]">
                        Предимства на техниката:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>по-дълготраен резултат</li>
                        <li>равномерно задържане на пигмента</li>
                        <li>подходяща за различни типове кожа</li>
                        <li>възможност за прецизно изграждане на форма</li>
                      </ul>
                      <p>
                        Микропигментацията позволява комбиниране с други техники
                        за постигане на още по-красив резултат.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <h3
                className={serviceCardTitleClass}
                style={{ fontFamily: "Bodoni Moda" }}
              >
                Микропигментация на вежди
              </h3>
              <p className={serviceCardDescClass} style={{ fontFamily: "Inter" }}>
                Микропигментацията е техника, при която чрез машинен метод пигментът се въвежда в кожата.
              </p>
            </div>

            {/* Service 3: Микроблейдинг */}
            <div className={serviceSlideClass(2)}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative h-52 sm:h-64 overflow-hidden mb-4 sm:mb-6 rounded-none shadow-md cursor-pointer select-none">
                    <img
                      src={microbladingImage}
                      alt="Микроблейдинг"
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span
                        className="px-6 py-2 border border-white/70 text-white tracking-widest text-xs font-semibold rounded-none"
                        style={{ fontFamily: "Inter" }}
                      >
                        повече
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl border-[#E7DBC1] bg-gradient-to-br from-[#FFFEFB] via-white to-[#F8F3E8] backdrop-blur-sm shadow-2xl">
                  <DialogHeader>
                    <DialogTitle
                      className="text-2xl tracking-wide"
                      style={{ fontFamily: "Bodoni Moda" }}
                    >
                      Микроблейдинг
                    </DialogTitle>
                  </DialogHeader>
                  <div
                    style={{ fontFamily: "Inter" }}
                    className="space-y-5 text-sm leading-relaxed"
                  >
                    <p className="text-base">
                      <span className="font-semibold">Микроблейдингът</span> е
                      ръчна техника за перманентен грим, при която чрез фин
                      инструмент се създават деликатни косъмчета, имитиращи
                      естествения растеж на веждите.
                    </p>

                    <div className="space-y-4">
                      <p>
                        Микроблейдингът е ръчна техника за перманентен грим, при
                        която чрез фин инструмент се създават деликатни
                        косъмчета, имитиращи естествения растеж на веждите.
                      </p>
                      <p>
                        Процедурата е подходяща за клиенти, които желаят{" "}
                        <span className="font-semibold">
                          естествен и лек резултат
                        </span>
                        , с подчертана форма и по-плътна визия на веждите.
                      </p>
                      <p>
                        Формата и интензитетът на цвета се съобразяват
                        индивидуално с чертите на лицето, типа кожа и желания
                        ефект, като целта е максимално естествено излъчване.
                      </p>
                    </div>

                    <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                      <p className="font-semibold text-[#D4AF37]">
                        Подходящ за:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>редки или неравномерни вежди</li>
                        <li>оформяне и корекция на форма</li>
                        <li>подчертаване на естествената линия</li>
                      </ul>
                    </div>

                    <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                      <p className="font-semibold text-[#D4AF37]">
                        Какво да очаквате:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Времетраене на процедурата: около 2 часа</li>
                        <li>Корекция: след 4–6 седмици</li>
                        <li>
                          Трайност: до 12–18 месеца (в зависимост от кожата)
                        </li>
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <h3
                className={serviceCardTitleClass}
                style={{ fontFamily: "Bodoni Moda" }}
              >
                Микроблейдинг
              </h3>
              <p className={serviceCardDescClass} style={{ fontFamily: "Inter" }}>
                Ръчна техника, при която се създават деликатни косъмчета, имитиращи естествения растеж на веждите.
              </p>
            </div>

            {/* Service 4: hairstrokes + powder effect */}
            <div className={serviceSlideClass(3)}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative h-52 sm:h-64 overflow-hidden mb-4 sm:mb-6 rounded-none shadow-md cursor-pointer select-none">
                    <img
                      src={hairstrokesPowderImage}
                      alt="hairstrokes + powder effect"
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span
                        className="px-6 py-2 border border-white/70 text-white tracking-widest text-xs font-semibold rounded-none"
                        style={{ fontFamily: "Inter" }}
                      >
                        повече
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl border-[#E7DBC1] bg-gradient-to-br from-[#FFFEFB] via-white to-[#F8F3E8] backdrop-blur-sm shadow-2xl">
                  <DialogHeader>
                    <DialogTitle
                      className="text-2xl tracking-wide"
                      style={{ fontFamily: "Bodoni Moda" }}
                    >
                      hairstrokes + powder effect
                    </DialogTitle>
                  </DialogHeader>
                  <div
                    style={{ fontFamily: "Inter" }}
                    className="space-y-5 text-sm leading-relaxed"
                  >
                    <p className="text-base">
                      Комбинираната техника съчетава прецизността на косъм по
                      косъм (hairstrokes) с мекото засенчване на пудра ефекта, за
                      да се създадат{" "}
                      <span className="font-semibold">
                        естествени, но по-плътни и изразени вежди.
                      </span>
                    </p>

                    <div className="space-y-4">
                      <p>
                        Чрез внимателно изградени косъмчета в предната част и
                        деликатно преливане към по-мек, пудрен ефект в останалата
                        зона, се постига балансирана и хармонична визия.
                      </p>
                      <p>
                        Тази техника осигурява{" "}
                        <span className="font-semibold">
                          по-дълготраен резултат
                        </span>
                        , като същевременно запазва естествения вид на веждите.
                      </p>
                    </div>

                    <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                      <p className="font-semibold text-[#D4AF37]">
                        Подходяща за:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>редки или неравномерни вежди</li>
                        <li>липса на форма и плътност</li>
                        <li>
                          клиенти, които искат естествен, но по-дефиниран
                          резултат
                        </li>
                        <li>комбинирана и мазна кожа</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold text-[#D4AF37]">
                        Какво да очаквате:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Времетраене на процедурата: 2–3 часа</li>
                        <li>Корекция: след 4–6 седмици</li>
                        <li>Трайност: 12–24 месеца</li>
                      </ul>
                    </div>

                    <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                      <p className="font-semibold text-[#D4AF37]">
                        Предимства на техниката:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>съчетава естествен и плътен ефект</li>
                        <li>по-добра дълготрайност</li>
                        <li>плавен и мек преход на цвета</li>
                        <li>подходяща за различни типове кожа</li>
                      </ul>
                    </div>

                    <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                      <p className="font-semibold text-[#D4AF37]">Важно:</p>
                      <p>
                        Комбинираната техника се съобразява изцяло с
                        индивидуалните черти на лицето, типа кожа и желания
                        резултат, за да се постигне максимално естествен и
                        дълготраен ефект.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <h3
                className={serviceCardTitleClass}
                style={{ fontFamily: "Bodoni Moda" }}
              >
                hairstrokes + powder effect
              </h3>
              <p className={serviceCardDescClass} style={{ fontFamily: "Inter" }}>
                Комбинирана техника за естествени, но по-плътни и изразени вежди с дълготраен резултат.
              </p>
            </div>

            {additionalServices.map((service, slideIdx) => (
                <div
                  key={service.title}
                  className={serviceSlideClass(4 + slideIdx)}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative h-52 sm:h-64 overflow-hidden mb-4 sm:mb-6 rounded-none shadow-md cursor-pointer select-none">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span
                            className="px-6 py-2 border border-white/70 text-white tracking-widest text-xs font-semibold rounded-none"
                            style={{ fontFamily: "Inter" }}
                          >
                            more
                          </span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl border-[#E7DBC1] bg-gradient-to-br from-[#FFFEFB] via-white to-[#F8F3E8] backdrop-blur-sm shadow-2xl">
                      <DialogHeader>
                        <DialogTitle
                          className="text-2xl tracking-wide"
                          style={{ fontFamily: "Bodoni Moda" }}
                        >
                          {service.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div
                        style={{ fontFamily: "Inter" }}
                        className="space-y-4 text-sm leading-relaxed"
                      >
                        {service.title === "Soft Lips Перманентно червило" ? (
                          <>
                            <p className="text-base">
                              Soft Lips е техника за перманентен грим на устни,
                              която подчертава естествения им цвят, подобрява
                              формата и придава свеж и хармоничен вид.
                            </p>

                            <div className="space-y-4">
                              <p>
                                Чрез деликатно имплантиране на пигмент се
                                създава мек, естествен ефект, който визуално
                                прави устните по-живи, по-гладки и по-добре
                                оформени.
                              </p>
                              <p>
                                Цветът се избира индивидуално според тена на
                                кожата, естествения цвят на устните и желания
                                резултат.
                              </p>
                            </div>

                            <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                              <p className="font-semibold text-[#D4AF37]">
                                Подходяща за:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>бледи или неравномерно оцветени устни</li>
                                <li>липса на ясно изразен контур</li>
                                <li>визуално освежаване на лицето</li>
                                <li>леко коригиране на асиметрия</li>
                              </ul>
                            </div>

                            <div className="space-y-2">
                              <p className="font-semibold text-[#D4AF37]">
                                Какво да очаквате:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Времетраене на процедурата: 2–3 часа</li>
                                <li>Корекция: след 4–6 седмици</li>
                                <li>Трайност: 1.5 – 2 години</li>
                              </ul>
                            </div>

                            <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                              <p className="font-semibold text-[#D4AF37]">
                                Предимства на процедурата:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>естествен и свеж ефект</li>
                                <li>по-добре оформени устни</li>
                                <li>равномерен цвят</li>
                                <li>
                                  дълготраен резултат без нужда от ежедневен
                                  грим
                                </li>
                              </ul>
                            </div>

                            <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                              <p className="font-semibold text-[#D4AF37]">
                                Важно:
                              </p>
                              <p>
                                Целта на процедурата е да се подчертае
                                естествената красота на устните, без да се
                                създава тежък или изкуствен ефект.
                              </p>
                            </div>
                          </>
                        ) : service.title === "Soft Eyes" ? (
                          <>
                            <p className="text-base">
                              Перманентната очна линия е процедура, която
                              деликатно подчертава линията на миглите и придава
                              по-изразителен и оформен поглед.
                            </p>

                            <div className="space-y-4">
                              <p>
                                Чрез прецизно имплантиране на пигмент се създава
                                естествен ефект, който визуално сгъстява
                                миглите и подчертава очите, без да изглежда
                                тежко или изкуствено.
                              </p>
                              <p>
                                Интензитетът и формата се съобразяват
                                индивидуално според формата на очите и желаната
                                визия.
                              </p>
                            </div>

                            <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                              <p className="font-semibold text-[#D4AF37]">
                                Подходяща за:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>
                                  подчертаване на естествената линия на окото
                                </li>
                                <li>
                                  по-изразителен поглед без ежедневен грим
                                </li>
                                <li>визуално сгъстяване на миглите</li>
                                <li>
                                  клиенти, които търсят деликатен ефект
                                </li>
                              </ul>
                            </div>

                            <div className="space-y-2">
                              <p className="font-semibold text-[#D4AF37]">
                                Какво да очаквате:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Времетраене на процедурата: 1.5 – 2 часа</li>
                                <li>Корекция: след 8 – 10 седмици</li>
                                <li>Трайност: 2 – 4 години</li>
                              </ul>
                            </div>

                            <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                              <p className="font-semibold text-[#D4AF37]">
                                Предимства:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>естествен и изчистен резултат</li>
                                <li>спестява време от ежедневен грим</li>
                                <li>дълготраен ефект</li>
                                <li>подчертава формата на очите</li>
                              </ul>
                            </div>

                            <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                              <p className="font-semibold text-[#D4AF37]">
                                Важно:
                              </p>
                              <p>
                                Целта на процедурата е да подчертае погледа по
                                фин и елегантен начин, без да натоварва
                                визията.
                              </p>
                            </div>
                          </>
                        ) : service.title === "Лазерни процедури" ? (
                          <>
                            <p className="text-base">
                              Съвременни лазерни технологии за ефективно
                              премахване на пигменти и подобряване на
                              състоянието на кожата.
                            </p>
                            <p>
                              Процедурите се извършват с внимание към детайла и
                              индивидуален подход, като се цели максимална
                              ефективност и безопасност.
                            </p>

                            <div className="space-y-4 border-t border-[#E7DBC1]/60 pt-4">
                              <h3
                                className="text-base font-semibold tracking-wide text-[#D4AF37]"
                                style={{ fontFamily: "Bodoni Moda" }}
                              >
                                Лазерно отстраняване на стар перманентен грим
                              </h3>
                              <div className="flow-root">
                                <div className="mb-4 overflow-hidden rounded-sm border border-[#E7DBC1] bg-white/60 shadow-sm max-md:w-full md:float-left md:mb-3 md:mr-5 md:w-[40%] md:max-w-[280px]">
                                  <img
                                    src={laserPmuRemovalImage}
                                    alt="Лазерно отстраняване на перманентен грим"
                                    className="h-auto w-full max-h-56 object-cover md:max-h-[min(320px,55vh)]"
                                  />
                                </div>
                                <p className="text-sm leading-relaxed text-[#0A0A0A]">
                                  Процедура, при която чрез лазерна технология
                                  пигментът в кожата се разгражда постепенно,
                                  позволявайки неговото изсветляване или пълно
                                  премахване.
                                  <br />
                                  <br />
                                  Подходяща при нежелан, променен или
                                  неправилно направен перманентен грим.
                                </p>
                              </div>
                              <div className="w-full clear-both space-y-3 pt-1">
                                <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                                  <p className="font-semibold text-[#D4AF37]">
                                    Предимства:
                                  </p>
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li>
                                      контролирано и постепенно премахване
                                    </li>
                                    <li>щадящо към кожата</li>
                                    <li>
                                      възможност за корекция и нова процедура
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4 border-t border-[#E7DBC1]/60 pt-4">
                              <h3
                                className="text-base font-semibold tracking-wide text-[#D4AF37]"
                                style={{ fontFamily: "Bodoni Moda" }}
                              >
                                Карбонов пилинг
                              </h3>
                              <div className="flow-root">
                                <div className="mb-4 overflow-hidden rounded-sm border border-[#E7DBC1] bg-white/60 shadow-sm max-md:w-full md:float-left md:mb-3 md:mr-5 md:w-[40%] md:max-w-[280px]">
                                  <img
                                    src={laserCarbonPeelingImage}
                                    alt="Карбонов пилинг"
                                    className="h-auto w-full max-h-56 object-cover md:max-h-[min(320px,55vh)]"
                                  />
                                </div>
                                <p className="text-sm leading-relaxed text-[#0A0A0A]">
                                  Карбоновият пилинг е иновативна лазерна
                                  процедура за дълбоко почистване, подмладяване
                                  и освежаване на кожата.
                                  <br />
                                  <br />
                                  Чрез нанасяне на специална въглеродна маска и
                                  последващо лазерно третиране се постига
                                  почистване на порите, подобряване на текстурата
                                  на кожата и стимулиране на колагена.
                                </p>
                              </div>
                              <div className="w-full clear-both space-y-3 pt-1">
                                <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                                  <p className="font-semibold text-[#D4AF37]">
                                    Подходящ за:
                                  </p>
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li>разширени пори</li>
                                    <li>мазна кожа</li>
                                    <li>неравен тен и пигментни петна</li>
                                    <li>уморена и безжизнена кожа</li>
                                  </ul>
                                </div>
                                <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                                  <p className="font-semibold text-[#D4AF37]">
                                    Предимства:
                                  </p>
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li>заличаване на бръчици</li>
                                    <li>дълбоко почистване</li>
                                    <li>отстраняване на акне</li>
                                    <li>по-гладка и свежа кожа</li>
                                    <li>стимулиране на колаген</li>
                                    <li>моментален освежаващ ефект</li>
                                  </ul>
                                </div>
                                <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                                  <p className="font-semibold text-[#D4AF37]">
                                    Важно:
                                  </p>
                                  <p>
                                    Броят на необходимите процедури се определя
                                    индивидуално в зависимост от състоянието на
                                    кожата и желания резултат.
                                  </p>
                                  <p>
                                    Преди всяка процедура се провежда
                                    консултация.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4 border-t border-[#E7DBC1]/60 pt-4">
                              <h3
                                className="text-base font-semibold tracking-wide text-[#D4AF37]"
                                style={{ fontFamily: "Bodoni Moda" }}
                              >
                                Лазерно премахване на татуировки
                              </h3>
                              <div className="flow-root">
                                <div className="mb-4 overflow-hidden rounded-sm border border-[#E7DBC1] bg-white/60 shadow-sm max-md:w-full md:float-left md:mb-3 md:mr-5 md:w-[40%] md:max-w-[280px]">
                                  <img
                                    src={laserTattooRemovalImage}
                                    alt="Лазерно премахване на татуировки"
                                    className="h-auto w-full max-h-56 object-cover md:max-h-[min(320px,55vh)]"
                                  />
                                </div>
                                <p className="text-sm leading-relaxed text-[#0A0A0A]">
                                  Лазерната технология разгражда туша в кожата на
                                  малки частици, които организмът естествено
                                  елиминира с времето.
                                  <br />
                                  <br />
                                  Процедурата се извършва на етапи, като са
                                  необходими няколко сесии за постигане на
                                  оптимален резултат.
                                </p>
                              </div>
                              <div className="w-full clear-both space-y-3 pt-1">
                                <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                                  <p className="font-semibold text-[#D4AF37]">
                                    Предимства:
                                  </p>
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li>
                                      ефективно премахване на нежелани
                                      татуировки
                                    </li>
                                    <li>
                                      постепенно изсветляване без увреждане на
                                      кожата
                                    </li>
                                    <li>
                                      подходяща за различни цветове и размери
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <p className="border-t border-[#E7DBC1]/60 pt-4 text-center text-sm text-[#0A0A0A]/85">
                              Работя с модерна лазерна технология за максимална
                              ефективност и безопасност.
                            </p>
                          </>
                        ) : service.title === "Миглопластика" ? (
                          <>
                            <p className="text-base">
                              Миглопластиката е процедура, която сгъстява
                              естествените мигли, придавайки им по-дълъг, плътен
                              и изразителен вид без нужда от ежедневен грим.
                            </p>
                            <p>
                              Чрез фините снопчета, които са направени от
                              естествен косъм, миглите се оформят и фиксират в
                              желаната форма, което създава ефект на по-отворен и
                              свеж поглед.
                            </p>

                            <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                              <p className="font-semibold text-[#D4AF37]">
                                Подходяща за:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>прави или падащи мигли</li>
                                <li>желание за естествен ефект</li>
                                <li>подчертаване на погледа без спирала</li>
                                <li>
                                  клиенти, които търсят поддържана визия с
                                  минимални усилия
                                </li>
                              </ul>
                            </div>

                            <div className="space-y-2">
                              <p className="font-semibold text-[#D4AF37]">
                                Какво да очаквате:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>
                                  Времетраене на процедурата: около 60 минути
                                </li>
                                <li>Ефект: веднага след процедурата</li>
                                <li>Трайност: 3 – 5 седмици</li>
                              </ul>
                            </div>

                            <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                              <p className="font-semibold text-[#D4AF37]">
                                Предимства:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>естествен резултат</li>
                                <li>визуално по-дълги и извити мигли</li>
                                <li>без нужда от ежедневен грим</li>
                                <li>удобство и лесна поддръжка</li>
                              </ul>
                            </div>

                            <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                              <p className="font-semibold text-[#D4AF37]">
                                Важно:
                              </p>
                              <p>
                                Процедурата е напълно неинвазивна и щадяща
                                естествените мигли.
                              </p>
                            </div>
                          </>
                        ) : service.title === "Ламиниране на вежди и мигли" ? (
                          <>
                            <p className="text-base">
                              Ламинирането на вежди и мигли е процедура, която
                              оформя, подрежда и фиксира косъмчетата в желаната
                              посока, създавайки по-плътен, подреден и естествен
                              вид.
                            </p>
                            <p>
                              Чрез специални продукти се постига дълготраен
                              ефект, при който веждите изглеждат по-обемни и
                              оформени, а миглите – по-повдигнати и изразителни.
                            </p>

                            <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                              <p className="font-semibold text-[#D4AF37]">
                                Подходяща за:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>непокорни или тънки косъмчета</li>
                                <li>редки или неоформени вежди</li>
                                <li>естествено подчертаване на миглите</li>
                                <li>
                                  поддържана визия без ежедневен грим
                                </li>
                              </ul>
                            </div>

                            <div className="space-y-2">
                              <p className="font-semibold text-[#D4AF37]">
                                Какво да очаквате:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Времетраене: около 50 минути</li>
                                <li>Ефект: веднага след процедурата</li>
                                <li>Трайност: 4 – 6 седмици</li>
                              </ul>
                            </div>

                            <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                              <p className="font-semibold text-[#D4AF37]">
                                Предимства:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>по-плътни и оформени вежди</li>
                                <li>подреден и естествен вид</li>
                                <li>повдигнати и изразителни мигли</li>
                                <li>лесна поддръжка</li>
                              </ul>
                            </div>

                            <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                              <p className="font-semibold text-[#D4AF37]">
                                Важно:
                              </p>
                              <p>
                                Процедурата е неинвазивна и щадяща, като
                                резултатът се съобразява с естествената форма на
                                веждите и миглите.
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="text-base">{service.description}</p>
                            <div className="space-y-2 bg-white/80 border border-[#E7DBC1] px-4 py-3 shadow-sm">
                              <p className="font-semibold text-[#D4AF37]">
                                More details
                              </p>
                              <p>
                                This is a preview card layout for upcoming
                                services. We can replace this with your final
                                full text at any time.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <h3
                    className={serviceCardTitleClass}
                    style={{ fontFamily: "Bodoni Moda" }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={serviceCardDescClass}
                    style={{ fontFamily: "Inter" }}
                  >
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
            <button
              type="button"
              aria-label="Scroll services right"
              disabled={!canScrollServicesRight}
              onClick={() => scrollServicesCarousel("right")}
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border-2 border-[#D4AF37] bg-white/90 text-[#0A0A0A] opacity-40 shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-[opacity,transform,box-shadow,background-color,color] max-md:hover:opacity-100 hover:bg-[#D4AF37] hover:text-white max-md:hover:shadow-lg sm:h-12 sm:w-12 md:h-14 md:w-14 md:opacity-100 md:bg-white md:shadow-[0_4px_20px_rgba(0,0,0,0.12)] md:hover:shadow-lg active:scale-95",
                !canScrollServicesRight &&
                  "pointer-events-none border-[#E5E5E0] text-[#A3A3A3] opacity-25 shadow-none max-md:hover:opacity-25 hover:bg-white/90 hover:text-[#A3A3A3] md:opacity-25 md:bg-white md:hover:bg-white md:hover:text-[#A3A3A3] md:hover:shadow-none"
              )}
            >
              <ChevronRight className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.5} aria-hidden />
            </button>
          </div>
          <div className="mt-10 flex justify-center">
            <a href="#contact" className="inline-block">
              <Button
                className="rounded-none border-2 border-[#D4AF37] bg-[#D4AF37] px-10 py-5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-[#D4AF37]"
                style={{ fontFamily: "Inter" }}
              >
                Научи повече
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Before & After Gallery Section */}
      <section id="gallery" className="py-16 bg-[#FAFAF8] relative">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-xs tracking-widest font-semibold text-[#D4AF37]" style={{ fontFamily: "Inter" }}>
              REAL RESULTS
            </span>
            <h2
              className="text-5xl font-light mt-4"
              style={{ fontFamily: "Bodoni Moda" }}
            >
              Transformations
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mt-4" style={{ fontFamily: "Inter" }}>
              Drag the slider to compare before and after results from our clients.
            </p>
          </div>

          <BeforeAfterGallery
            items={[
              {
                title: "Microblading",
                before: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-microblading-before-fSKWSsKiZrNnCf5ggwcTvs.webp",
                after: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-microblading-after-Siyeqe9r76wSrS8WR5Sm8a.webp",
                description: "Precision microblading creates natural, symmetrical eyebrows with perfect definition.",
              },
              {
                title: "Eyelash Extensions",
                before: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-lashes-before-gUXc3RrbykaxR8BWXG7Brm.webp",
                after: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-lashes-after-Z8Jg8EYakF4SgP8s9JwgLP.webp",
                description: "Luxurious lash extensions add volume, length, and curl to your natural lashes.",
              },
              {
                title: "Laser Pigmentation Removal",
                before: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-removal-before-WNFDGkUyvRHxtqpx9W8wdn.webp",
                after: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-removal-after-ZUPSHFoEkaHtps5n75PRcw.webp",
                description: "Our advanced laser technology safely removes unwanted tattoos and pigmentation.",
              },
              {
                title: "Permanent Lipstick",
                before: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-lips-before-BgvabpjN9b8U49xZF2HCyw.webp",
                after: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-lips-after-oNYmFiPH9DxH7sEvyXfZrT.webp",
                description: "Long-lasting permanent lipstick that stays vibrant and perfect throughout your day.",
              },
            ]}
          />
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Why PhiBrows Section */}
      <section id="about" className="py-24 bg-white relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div>
                <span className="text-xs tracking-widest font-semibold text-[#D4AF37]" style={{ fontFamily: "Inter" }}>
                  ABOUT US
                </span>
                <h2
                  className="text-6xl font-light mt-4"
                  style={{ fontFamily: "Bodoni Moda" }}
                >
                  Why PhiBrows?
                </h2>
              </div>
              <div className="space-y-8">
                {[
                  { title: "Expert Artisans", desc: "Certified professionals with years of experience" },
                  { title: "Premium Products", desc: "Only the finest, hypoallergenic materials used" },
                  { title: "Personalized Care", desc: "Custom treatments tailored to your unique features" },
                  { title: "Luxury Experience", desc: "Spa-like atmosphere designed for your comfort" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 bg-[#D4AF37] flex items-center justify-center flex-shrink-0 rounded-none">
                      <span className="text-white font-bold" style={{ fontFamily: "Bodoni Moda" }}>
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h3
                        className="text-xl font-light mb-2"
                        style={{ fontFamily: "Bodoni Moda" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm" style={{ fontFamily: "Inter" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#F5F5F0] p-12 rounded-none border border-gray-200 relative shadow-md">
              <p
                className="text-3xl font-light text-center mb-8"
                style={{ fontFamily: "Bodoni Moda" }}
              >
                "Beauty is not about perfection. It's about confidence."
              </p>
              <p className="text-center text-gray-700 text-sm" style={{ fontFamily: "Inter" }}>
                At PhiBrows, we believe every client deserves to feel beautiful and confident. Our mission is to enhance your natural beauty through precision, artistry, and luxury care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <ClientReviews />

      {/* Contact Section */}
      <section id="contact" className="py-0 bg-[#1A1A1A] relative">
        <ContactForm />
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-white py-16 border-t-2 border-[#D4AF37]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3
                className="text-2xl font-light mb-4"
                style={{ fontFamily: "Bodoni Moda" }}
              >
                PhiBrows
              </h3>
              <p className="text-gray-400 text-sm" style={{ fontFamily: "Inter" }}>
                Premium beauty services crafted with precision and luxury.
              </p>
            </div>
            <div>
              <h4 className="font-light mb-4" style={{ fontFamily: "Bodoni Moda" }}>
                Services
              </h4>
              <ul className="space-y-2 text-gray-400 text-sm" style={{ fontFamily: "Inter" }}>
                <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Microblading</a></li>
                <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Eyelashes</a></li>
                <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Laser Removal</a></li>
                <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Permanent Lipstick</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-light mb-4" style={{ fontFamily: "Bodoni Moda" }}>
                Company
              </h4>
              <ul className="space-y-2 text-gray-400 text-sm" style={{ fontFamily: "Inter" }}>
                <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
                <li><a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Gallery</a></li>
                <li><a href="#pricing" className="hover:text-[#D4AF37] transition-colors">Pricing</a></li>
                <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-light mb-4" style={{ fontFamily: "Bodoni Moda" }}>
                Connect
              </h4>
              <ul className="space-y-2 text-gray-400 text-sm" style={{ fontFamily: "Inter" }}>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">TikTok</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Pinterest</a></li>
              </ul>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 bg-[#25D366] text-white px-4 py-2 rounded-none hover:bg-[#20BA5E] transition-all font-medium text-sm" style={{ fontFamily: "Inter" }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.259-1.02 1.02-1.756 2.119-2.259 3.356-.524 1.205-.954 2.56-.949 4.255 0 3.476 2.829 6.305 6.305 6.305 1.695 0 3.05-.425 4.255-.949 1.238-.503 2.335-1.236 3.356-2.259 1.02-1.02 1.756-2.119 2.259-3.356.524-1.205.954-2.56.949-4.255 0-3.476-2.829-6.305-6.305-6.305z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p style={{ fontFamily: "Inter" }}>
              © 2026 PhiBrows. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
