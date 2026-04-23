"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

function CountUpStat({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();

          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const display =
    target >= 1000 ? count.toLocaleString() : count.toString();

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-black text-[#54b435]">
        {display}{suffix}
      </p>
      <p className="mt-1 text-sm font-bold text-gray-600">{label}</p>
    </div>
  );
}

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    title: "Electrical Repair",
    description:
      "Swift and reliable electrical repair services to address issues efficiently, restoring safety and functionality to your home or business.",
    image: "/images/services-1.jpg",
  },
  {
    title: "New Installations",
    description:
      "Expert installation of new electrical systems tailored to your needs, ensuring top performance and adherence to all safety standards.",
    image: "/images/services-2.png",
  },
  {
    title: "Electrical Upgrades",
    description:
      "Enhance your electrical system with professional upgrades, improving efficiency, capacity, and safety to meet modern demands.",
    image: "/images/services-3.png",
  },
];

const WHY_US = [
  {
    icon: "🏆",
    title: "Quality Material",
    description:
      "We use only high-quality materials to ensure durability and safety in every electrical project.",
  },
  {
    icon: "✅",
    title: "Accredited",
    description:
      "Our team is fully accredited, adhering to industry standards and regulations for top-notch service.",
  },
  {
    icon: "👷",
    title: "Trained Workers",
    description:
      "Our skilled electricians undergo rigorous training to deliver expert solutions with precision and reliability.",
  },
  {
    icon: "🕐",
    title: "Time Availability",
    description:
      "We offer flexible scheduling to accommodate your needs and ensure timely completion of your electrical work.",
  },
  {
    icon: "⚡",
    title: "Quick Response",
    description:
      "Expect fast and efficient responses to all inquiries and service requests, minimizing any downtime.",
  },
  {
    icon: "🤝",
    title: "Trusted Service",
    description:
      "With a solid reputation in the Tri-State area, our trusted service delivers exceptional results and peace of mind.",
  },
];

const TESTIMONIALS = [
  {
    name: "Jennifer",
    location: "Philadelphia",
    text: "Battaglia & Sons provided exceptional service when we needed a full electrical upgrade for our home. Nick was professional, punctual, and made sure everything was up to code. We couldn't be happier with the results!",
  },
  {
    name: "Pamela",
    location: "Philadelphia",
    text: "After experiencing frequent power issues, we called Battaglia & Sons for an inspection and repair. Nick quickly identified the problem and resolved it efficiently. Their expertise and customer service were outstanding.",
  },
  {
    name: "Steve",
    location: "Philadelphia",
    text: "The team at Battaglia & Sons did a fantastic job installing new outlets and lighting in our office. Nick's work was clean, fast, and the new setup has greatly improved our workspace. Highly recommend their services!",
  },
];

function ParallaxCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const rect = section.getBoundingClientRect();
    const viewH = window.innerHeight;

    // Only calculate when section is near the viewport
    if (rect.bottom < 0 || rect.top > viewH) return;

    // How far the section center is from the viewport center
    const offset = (rect.top + rect.height / 2 - viewH / 2) * 0.35;
    img.style.transform = `translateY(${offset}px)`;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24">
      {/* Parallax background */}
      <div ref={imgRef} className="absolute inset-0 scale-125 will-change-transform">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      {/* Green overlay */}
      <div className="absolute inset-0 bg-[#379237]/80" />
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
          Don&apos;t Know What To Start With?
        </h2>
        <p className="mb-8 text-xl font-semibold text-white/90">
          Get A Solution For All Electrical Needs
        </p>
        <a
          href="#contact"
          className="inline-block rounded-full bg-white px-10 py-4 text-lg font-black text-[#54b435] transition-colors hover:bg-[#edfbe2]"
        >
          Contact Us Today
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setFormStatus(res.ok ? "success" : "error");
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Battaglia & Sons Electric"
              width={222}
              height={99}
              priority
              className="h-14 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-gray-700 transition-colors hover:text-[#54b435]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Phone CTA */}
          <a
            href="tel:2676933125"
            className="hidden rounded-full bg-[#54b435] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#379237] md:inline-block"
          >
            (267) 693-3125
          </a>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block h-0.5 w-6 bg-gray-700" />
            <span className="block h-0.5 w-6 bg-gray-700" />
            <span className="block h-0.5 w-6 bg-gray-700" />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t bg-white px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-bold text-gray-700 hover:text-[#54b435]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:2676933125"
                className="mt-2 rounded-full bg-[#54b435] px-5 py-2 text-center font-bold text-white hover:bg-[#379237]"
              >
                (267) 693-3125
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* ── Hero ────────────────────────────────────────────────── */}
        <section
          id="home"
          className="relative flex min-h-[600px] items-center justify-start overflow-hidden bg-[#0f172a]"
        >
          <Image
            src="/images/hero.jpg"
            alt="Electrician at work"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
            <h1 className="mb-4 max-w-xl text-4xl font-black leading-tight text-white md:text-5xl">
              Electricity Solutions for Your Home
            </h1>
            <p className="mb-8 text-lg font-semibold text-[#54b435]">
              Call us today for a free quote
            </p>
            <a
              href="tel:2676933125"
              className="inline-flex items-center gap-3 rounded-full bg-[#54b435] px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-[#379237]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-5 w-5 fill-current"
              >
                <path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" />
              </svg>
              267-693-3125
            </a>
          </div>
        </section>

        {/* ── About ───────────────────────────────────────────────── */}
        <section id="about" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#54b435]">
                  About Battaglia &amp; Sons
                </p>
                <h2 className="mb-6 text-3xl font-black text-gray-900 md:text-4xl">
                  Electrical Services Professionals
                </h2>
                <p className="font-serif text-lg leading-relaxed text-gray-600">
                  At Battaglia &amp; Sons Electrical Services, we bring
                  unmatched expertise and dedication to every project. Our team
                  of skilled professionals, led by an accredited electrician
                  with a legacy of excellence, is committed to delivering
                  top-quality electrical solutions. Whether it&apos;s a complex
                  installation, a critical repair, or an essential upgrade, we
                  pride ourselves on our attention to detail, reliability, and
                  customer-focused approach. Trust us to illuminate your space
                  with precision and care.
                </p>
                <div className="mt-8 inline-block rounded border-2 border-[#54b435] px-5 py-2 text-sm font-bold uppercase tracking-wider text-[#54b435]">
                  Certified Company
                </div>
              </div>
              <div className="relative h-80 overflow-hidden rounded-2xl shadow-xl md:h-[420px]">
                <Image
                  src="/images/hero.jpg"
                  alt="Battaglia & Sons Electrician"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-6 rounded-2xl bg-[#edfbe2] p-8 md:grid-cols-4">
              <CountUpStat target={20} suffix="+" label="Years In Business" />
              <CountUpStat target={500} suffix="+" label="Happy Clients" />
              <CountUpStat target={1000} suffix="+" label="Projects Completed" />
              <CountUpStat target={100} suffix="%" label="Certified" />
            </div>
          </div>
        </section>

        {/* ── Services ────────────────────────────────────────────── */}
        <section id="services" className="bg-gray-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#54b435]">
                Our Services
              </p>
              <h2 className="text-3xl font-black text-gray-900 md:text-4xl">
                We Provide Superior Electrical Services
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl"
                >
                  <div className="relative h-52">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-black text-gray-900">
                      {service.title}
                    </h3>
                    <p className="font-serif leading-relaxed text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ────────────────────────────────────────── */}
        <section id="why-us" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#54b435]">
                Why Choose Us
              </p>
              <h2 className="text-3xl font-black text-gray-900 md:text-4xl">
                Reasons Choosing Us
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_US.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#edfbe2] text-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-black text-gray-900">
                      {item.title}
                    </h3>
                    <p className="font-serif leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────── */}
        <section id="testimonials" className="bg-gray-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#54b435]">
                Our Testimonials
              </p>
              <h2 className="text-3xl font-black text-gray-900 md:text-4xl">
                Hear What Our Satisfied Customers Have To Say
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl bg-white p-8 shadow-md"
                >
                  <div className="mb-4 flex text-[#54b435]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-6 font-serif leading-relaxed text-gray-600">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="font-black text-gray-900">
                    {t.name}{" "}
                    <span className="font-normal text-gray-500">
                      — {t.location}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────────── */}
        <ParallaxCTA />

        {/* ── Contact ──────────────────────────────────────────────── */}
        <section id="contact" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#54b435]">
                Location
              </p>
              <h2 className="text-3xl font-black text-gray-900 md:text-4xl">
                Serving the Tri-State Area
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-serif text-gray-600">
                Ready to tackle your electrical needs with precision and care.
                Whether you&apos;re in Philadelphia, New Jersey, or Delaware,
                our team is here to provide expert service and solutions. Fill
                out the form below to get in touch with us — we will respond
                promptly to address your needs and schedule your service.
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2">
              {/* Contact Info */}
              <div>
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#edfbe2]">
                    <svg
                      className="h-5 w-5 text-[#54b435]"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Phone</p>
                    <a
                      href="tel:2676933125"
                      className="text-[#54b435] hover:underline"
                    >
                      267-693-3125
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#edfbe2]">
                    <svg
                      className="h-5 w-5 text-[#54b435]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Email</p>
                    <a
                      href="mailto:nick@battagliasonselectric.com"
                      className="text-[#54b435] hover:underline"
                    >
                      nick@battagliasonselectric.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#54b435] focus:outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#54b435] focus:outline-none"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#54b435] focus:outline-none"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#54b435] focus:outline-none"
                />
                {formStatus === "success" && (
                  <p className="text-sm font-semibold text-[#54b435]">
                    Message sent! We&apos;ll be in touch soon.
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="text-sm font-semibold text-red-500">
                    Something went wrong. Please try again or call us directly.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === "submitting" || formStatus === "success"}
                  className="rounded-full bg-[#54b435] px-8 py-3 font-bold text-white transition-colors hover:bg-[#379237] disabled:opacity-60"
                >
                  {formStatus === "submitting" ? "Sending…" : "Contact Us"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-[#0f172a] text-gray-300">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-3">
            {/* About col */}
            <div>
              <h3 className="mb-4 text-lg font-black text-white">
                About Battaglia &amp; Sons
              </h3>
              <p className="font-serif text-sm leading-relaxed">
                Battaglia &amp; Sons Electrical Services delivers expert
                electrical solutions across the Tri-State area. With a rich
                legacy of craftsmanship and a commitment to safety and
                reliability, we handle everything from repairs and installations
                to upgrades with precision and care.
              </p>
            </div>

            {/* Services col */}
            <div>
              <h3 className="mb-4 text-lg font-black text-white">
                Our Services
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Electrical Repairs",
                  "Electrical Inspections",
                  "Panel Inspections",
                  "Wiring Installations",
                ].map((s) => (
                  <li key={s}>
                    <a
                      href="#services"
                      className="transition-colors hover:text-[#54b435]"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact col */}
            <div>
              <h3 className="mb-4 text-lg font-black text-white">
                Free Estimate
              </h3>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-bold text-white">Call Us: </span>
                  <a href="tel:2676933125" className="hover:text-[#54b435]">
                    +1 267-693-3125
                  </a>
                </p>
                <p>
                  <span className="font-bold text-white">Email: </span>
                  <a
                    href="mailto:nick@battagliasonselectric.com"
                    className="hover:text-[#54b435]"
                  >
                    nick@battagliasonselectric.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-white/10 py-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Battaglia &amp; Sons Electric. All rights
          reserved.
        </div>
      </footer>
    </>
  );
}
