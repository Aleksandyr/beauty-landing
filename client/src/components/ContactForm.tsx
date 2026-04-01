import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 gap-0 overflow-hidden rounded-none bg-black lg:min-h-auto lg:grid-cols-2">
      {/* Left Side - Map/Location Image */}
      <div
        className="hidden lg:block h-full min-h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663405959620/fyDCaCDjBEZajfCbgjZ8q2/phibrows-hero-aALDGAh5YNLHVHPPj9a8en.webp')`,
          opacity: 0.7,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Location Pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-none flex items-center justify-center mb-4 mx-auto">
              <div className="w-4 h-4 bg-[#0A0A0A]"></div>
            </div>
            <p className="text-white text-sm font-semibold tracking-wider" style={{ fontFamily: "Inter" }}>
              PHIBROWS STUDIO
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center bg-black p-8 lg:p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
          {/* Heading */}
          <div className="mb-10">
            <h2
              className="text-5xl lg:text-6xl font-light text-white mb-3"
              style={{ fontFamily: "Bodoni Moda" }}
            >
              Begin Your Journey
            </h2>
            <p className="text-gray-400 text-xs tracking-widest font-semibold" style={{ fontFamily: "Inter" }}>
              BESPOKE BEAUTY TAILORED TO YOUR UNIQUE ESSENCE.
            </p>
          </div>

          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-semibold tracking-widest text-gray-300 mb-4" style={{ fontFamily: "Inter" }}>
                FULL NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Evelyn Vane"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors text-base"
                style={{ fontFamily: "Inter" }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest text-gray-300 mb-4" style={{ fontFamily: "Inter" }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="evelyn@bespoke.beauty"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors text-base"
                style={{ fontFamily: "Inter" }}
              />
            </div>
          </div>

          {/* Phone and Service */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-semibold tracking-widest text-gray-300 mb-4" style={{ fontFamily: "Inter" }}>
                PHONE NUMBER
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors text-base"
                style={{ fontFamily: "Inter" }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest text-gray-300 mb-4" style={{ fontFamily: "Inter" }}>
                DESIRED SERVICE
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-0 py-3 bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer text-base"
                style={{ fontFamily: "Inter" }}
              >
                <option value="" className="bg-black text-white">Select a treatment</option>
                <option value="microblading" className="bg-black text-white">Microblading</option>
                <option value="eyelashes" className="bg-black text-white">Eyelash Extensions</option>
                <option value="laser" className="bg-black text-white">Laser Pigmentation Removal</option>
                <option value="lipstick" className="bg-black text-white">Permanent Lipstick</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold tracking-widest text-gray-300 mb-4" style={{ fontFamily: "Inter" }}>
              MESSAGE
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How may we enhance your natural beauty?"
              rows={4}
              className="w-full px-0 py-3 bg-transparent border-b border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none text-base"
              style={{ fontFamily: "Inter" }}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-8">
            <Button
              type="submit"
              className="w-full bg-white text-[#0A0A0A] px-8 py-4 hover:bg-[#D4AF37] hover:text-white transition-all rounded-none border-none font-semibold tracking-wider text-sm"
              style={{ fontFamily: "Inter" }}
            >
              REQUEST CONSULTATION
            </Button>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="bg-green-900/30 border border-green-700 text-green-300 px-4 py-3 rounded-none text-sm">
              <p style={{ fontFamily: "Inter" }}>Thank you! We'll get back to you soon.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
