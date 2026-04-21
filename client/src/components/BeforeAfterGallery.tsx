import { useState } from "react";
import { fontFamilyBulgarian } from "@/lib/typography";

interface BeforeAfterItem {
  title: string;
  after: string;
  before: string;
  description: string;
}

interface BeforeAfterGalleryProps {
  items: BeforeAfterItem[];
}

export default function BeforeAfterGallery({ items }: BeforeAfterGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const current = items[activeIndex];

  return (
    <div className="space-y-8">
      {/* Main Slider */}
      <div
        className="relative mx-auto w-full max-w-2xl cursor-col-resize overflow-hidden rounded-none bg-neutral-900 shadow-lg"
        style={{ aspectRatio: "4/3" }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        <img
          src={current.before}
          alt="Преди"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={current.after}
            alt="След"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              width:
                sliderPosition > 0 ? `${(100 / sliderPosition) * 100}%` : "100%",
            }}
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[#D4AF37] transition-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] rounded-none p-3 shadow-lg">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M9 19l7-7-7-7" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>

        <div className="absolute top-4 left-4 rounded-none bg-black/50 px-3 py-1 text-sm font-semibold text-white">
          СЛЕД
        </div>
        <div className="absolute top-4 right-4 rounded-none bg-black/50 px-3 py-1 text-sm font-semibold text-white">
          ПРЕДИ
        </div>
      </div>

      {/* Title and Description */}
      <div className="text-center">
        <h3
          className="mb-4 text-4xl font-light text-neutral-100"
          style={{ fontFamily: fontFamilyBulgarian }}
        >
          {current.title}
        </h3>
        <p className="mx-auto max-w-2xl text-base text-neutral-400" style={{ fontFamily: fontFamilyBulgarian }}>
          {current.description}
        </p>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-4 justify-center flex-wrap">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setSliderPosition(50);
            }}
            className={`w-20 h-20 overflow-hidden rounded-none transition-all shadow-md ${
              activeIndex === index
                ? "ring-2 ring-[#D4AF37]"
                : "hover:shadow-lg"
            }`}
          >
            <img
              src={item.before}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Service Indicators */}
      <div className="flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setSliderPosition(50);
            }}
            className={`h-3 rounded-none transition-all ${
              activeIndex === index ? "bg-[#D4AF37] w-8" : "bg-neutral-600"
            }`}
            aria-label={`View service ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
