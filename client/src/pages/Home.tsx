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
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * PhiBrows Landing Page - Material Design
 * Design: Elegant luxury with pink accents, rounded components
 * Typography: Bodoni Moda (serif, editorial) + Inter (clean, readable)
 * Layout: Full-screen hero, compact gallery, pricing section
 */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0A0A0A]">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#FAFAF8] shadow-sm border-b border-[#E5E5E0]" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className={`h-12 w-12 rounded-none flex items-center justify-center transition-all duration-300 ${
                isScrolled ? "bg-[#FAFAF8]" : "bg-transparent border-2 border-white/30"
              }`}
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-logo_5dc3b0c5.webp"
                alt="PhiBrows Logo"
                className={`h-8 w-8 transition-all duration-300 ${
                  isScrolled ? "brightness-0" : "brightness-100"
                }`}
              />
            </div>
            <div
              className={`text-xl font-bold tracking-wider transition-colors duration-300 ${
                isScrolled ? "text-[#0A0A0A]" : "text-white drop-shadow-lg"
              }}`}
              style={{ fontFamily: "Bodoni Moda" }}
            >
              PhiBrows
            </div>
          </div>
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
                      повече за мен
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle style={{ fontFamily: "Bodoni Moda" }}>
                        Повече за мен
                      </DialogTitle>
                    </DialogHeader>
                    <div
                      className="space-y-4 text-sm leading-relaxed text-foreground"
                      style={{ fontFamily: "Inter" }}
                    >
                      <p>
                        Цветелина Каменова е утвърден професионалист и
                        разпознаваемо име в света на перманентния грим. Нейната
                        работа се отличава с изключителна прецизност, естетика и
                        безкомпромисно качество.
                      </p>
                      <p>
                        През 2025 година Цветелина Каменова печели признанието
                        на световноизвестни имена в областта на перманентния
                        грим, като завоюва Първо място на международния
                        шампионат The Queens Night с представяне на своята
                        работа в техниката Powderbrows — отличие, което
                        утвърждава нейния авторитет и я позиционира сред
                        най-добрите професионалисти в България.
                      </p>
                      <p>
                        Освен активен практик, тя е и вдъхновяващ обучител,
                        провеждащ професионални обучения на живо и онлайн.
                        Нейните курсове за перманентен грим са насочени както
                        към начинаещи, така и към практикуващи специалисти,
                        които търсят не просто техника, а висок стандарт,
                        увереност и професионално израстване.
                      </p>
                      <p>
                        Участието ѝ в престижни кампании и шампионати е
                        естествено продължение на философията ѝ — да представя
                        перманентния грим като изкуство, професия и отговорност,
                        издигнати на най-високо ниво.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="container">
          <div className="text-center mb-20">
            <span className="text-xs tracking-widest font-semibold text-[#D4AF37]" style={{ fontFamily: "Inter" }}>
              УСЛУГИ
            </span>
            <h2
              className="text-6xl font-light mt-4"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1: Hairstrokes */}
            <div className="group relative">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative h-64 overflow-hidden mb-6 rounded-none shadow-md cursor-pointer select-none">
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
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle style={{ fontFamily: "Bodoni Moda" }}>
                      Hairstrokes
                    </DialogTitle>
                  </DialogHeader>
                  <div
                    style={{ fontFamily: "Inter" }}
                    className="space-y-4 text-sm leading-relaxed"
                  >
                    <p>
                      Hairstrokes е хиперреалистична техника за перманентен грим
                      на вежди
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

                      <div className="space-y-2">
                        <div className="font-semibold">Подходяща за:</div>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            клиенти, които търсят максимално естествен ефект
                          </li>
                          <li>редки и светли вежди</li>
                          <li>фино подчертаване без плътен грим ефект</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <div className="font-semibold">Какво да очаквате:</div>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Времетраене на процедурата: 2–3 часа</li>
                          <li>Корекция: след 4–6 седмици</li>
                          <li>Трайност: 12–18 месеца</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <div className="font-semibold">Важно:</div>
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
                className="text-2xl font-light mb-3"
                style={{ fontFamily: "Bodoni Moda" }}
              >
                Hairstrokes
              </h3>
              <p className="text-gray-600 mb-4 text-sm" style={{ fontFamily: "Inter" }}>
                Hairstrokes е хиперреалистична техника за перманентен грим на вежди
              </p>
              <a href="#contact" className="text-[#D4AF37] font-semibold hover:text-black transition-colors flex items-center gap-2">
                Learn More <ArrowRight size={16} />
              </a>
            </div>

            {/* Service 2: Eyelashes */}
            <div className="group relative">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative h-64 overflow-hidden mb-6 rounded-none shadow-md cursor-pointer select-none">
                    <img
                      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-lashes-F5zZdUXR9MBFzrNGSrdQsq.webp"
                      alt="Eyelash Extensions"
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
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle style={{ fontFamily: "Bodoni Moda" }}>
                      Eyelash Extensions
                    </DialogTitle>
                  </DialogHeader>
                  <div
                    style={{ fontFamily: "Inter" }}
                    className="space-y-4 text-sm leading-relaxed"
                  >
                    <p>
                      Luxurious lash extensions that enhance your natural beauty
                      and last for weeks.
                    </p>
                    <p>Свържете се с нас за повече информация и свободни часове.</p>
                  </div>
                </DialogContent>
              </Dialog>
              <h3
                className="text-2xl font-light mb-3"
                style={{ fontFamily: "Bodoni Moda" }}
              >
                Eyelash Extensions
              </h3>
              <p className="text-gray-600 mb-4 text-sm" style={{ fontFamily: "Inter" }}>
                Luxurious lash extensions that enhance your natural beauty and last for weeks.
              </p>
              <a href="#contact" className="text-[#D4AF37] font-semibold hover:text-black transition-colors flex items-center gap-2">
                Learn More <ArrowRight size={16} />
              </a>
            </div>

            {/* Service 3: Laser Pigmentation */}
            <div className="group relative">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative h-64 overflow-hidden mb-6 rounded-none shadow-md cursor-pointer select-none">
                    <img
                      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-microblading-QSqdDjgraD8xN4YEbXip3z.webp"
                      alt="Laser Removal"
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
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle style={{ fontFamily: "Bodoni Moda" }}>
                      Laser Pigmentation Removal
                    </DialogTitle>
                  </DialogHeader>
                  <div
                    style={{ fontFamily: "Inter" }}
                    className="space-y-4 text-sm leading-relaxed"
                  >
                    <p>
                      Safe and effective laser removal of unwanted tattoos and
                      pigmentation.
                    </p>
                    <p>Свържете се с нас за повече информация и свободни часове.</p>
                  </div>
                </DialogContent>
              </Dialog>
              <h3
                className="text-2xl font-light mb-3"
                style={{ fontFamily: "Bodoni Moda" }}
              >
                Laser Pigmentation Removal
              </h3>
              <p className="text-gray-600 mb-4 text-sm" style={{ fontFamily: "Inter" }}>
                Safe and effective laser removal of unwanted tattoos and pigmentation.
              </p>
              <a href="#contact" className="text-[#D4AF37] font-semibold hover:text-black transition-colors flex items-center gap-2">
                Learn More <ArrowRight size={16} />
              </a>
            </div>

            {/* Service 4: Permanent Lipstick */}
            <div className="group relative">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative h-64 overflow-hidden mb-6 rounded-none shadow-md cursor-pointer select-none">
                    <img
                      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-lips-LLuyFtvzV8eFpzNwi3QLtD.webp"
                      alt="Permanent Lipstick"
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
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle style={{ fontFamily: "Bodoni Moda" }}>
                      Permanent Lipstick
                    </DialogTitle>
                  </DialogHeader>
                  <div
                    style={{ fontFamily: "Inter" }}
                    className="space-y-4 text-sm leading-relaxed"
                  >
                    <p>
                      Long-lasting lip color that stays perfect throughout your
                      day and beyond.
                    </p>
                    <p>Свържете се с нас за повече информация и свободни часове.</p>
                  </div>
                </DialogContent>
              </Dialog>
              <h3
                className="text-2xl font-light mb-3"
                style={{ fontFamily: "Bodoni Moda" }}
              >
                Permanent Lipstick
              </h3>
              <p className="text-gray-600 mb-4 text-sm" style={{ fontFamily: "Inter" }}>
                Long-lasting lip color that stays perfect throughout your day and beyond.
              </p>
              <a href="#contact" className="text-[#D4AF37] font-semibold hover:text-black transition-colors flex items-center gap-2">
                Learn More <ArrowRight size={16} />
              </a>
            </div>
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
