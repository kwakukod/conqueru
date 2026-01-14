import { useEffect, useMemo, useState, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, easeOut, easeInOut } from "framer-motion";
import logo from "./assets/ConquerU-logo.jpg";
import hero from "./assets/hero-3.png";
import founder from "./assets/SH.jpg";

const BOOKING_URL = "https://www.conquerucoaching.com/book-online"; // :contentReference[oaicite:1]{index=1}

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
 

export default function ConquerULanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nav = useMemo(
    () => [
      { label: "Approach", href: "#approach" },
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

    const scrollToId = (id: string) => {
    const el = document.querySelector(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const shouldReduceMotion = useReducedMotion();

  const aboutContainer = {
    hidden: { opacity: 0 },
    show: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.05 },
        },
  };

  const aboutItem = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
    show: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
  };

  const chipContainer = {
    hidden: {},
    show: shouldReduceMotion
      ? {}
      : { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };

  const chipItem = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 },
    show: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: easeOut } },
  };


  // HERO stagger (subtle)
  const heroContainer = {
    hidden: { opacity: 0 },
    show: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.12 },
        },
  };

  const heroItem = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
    show: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
  };

  // SECTION reveal on scroll
  const sectionWrap = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    show: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
  };

  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"], // while hero scrolls out
  });

  // move image slightly + tiny scale for “alive” feel
  const heroY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 80]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);

  return (
    <div className="min-h-screen bg-[#7ac3e3] text-[#1F2937]">
      {/* Top gradient wash */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#A7C4A0]/40 via-white/40 to-[#FACC15]/20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#F4F1EC]/50 backdrop-blur">
        <div className="mx-auto flex w-full items-center justify-between px-4 py-4 md:px-10">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img
                src={logo}
                alt="ConquerU"
                className="h-11 w-11 rounded-xl object-cover shadow-sm ring-1 ring-black/0"
              />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">ConquerU</div>
              <div className="text-xs text-black/60">Coaching • Counseling</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-black/70 transition hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[#0B2A4A] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
            >
              Book a Session
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/40 px-3 py-2 text-sm font-semibold md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={classNames(
            "md:hidden overflow-hidden border-t border-black/5 bg-[#F4F1EC]/95 backdrop-blur transition-[max-height] duration-300",
            mobileMenuOpen ? "max-h-96" : "max-h-0"
          )}
        >
          <div className="mx-auto max-w-screen-xl px-4 py-4 md:px-6">
            <div className="flex flex-col gap-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-black/80 hover:bg-black/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 rounded-xl bg-[#0B2A4A] px-3 py-3 text-center text-sm font-semibold text-white shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Discovery Session
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section
          ref={heroRef}
          className="relative h-screen w-full overflow-hidden bg-[#F4F1EC]"
        >
          {/* Full-bleed background image w/ parallax */}
          <motion.img
            src={hero}
            alt="Conqueru coaching"
            className="absolute inset-0 h-full w-full object-cover object-left"
            style={{ y: heroY, scale: heroScale }}
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.02, 1] }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 10, repeat: Infinity, ease: easeInOut }
            }
          />

          {/* Readability wash */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#F4F1EC]/100 via-[#F4F1EC]/0 to-transparent" />

          {/* Content frame */}
          <div className="relative mx-auto flex h-full w-full max-w-screen-xl items-center px-4 md:px-6">
            <div className="ml-auto flex h-full w-full max-w-xl items-center">
              {/* HERO TEXT stagger */}
              <motion.div variants={heroContainer} initial="hidden" animate="show">
                <motion.div
                  variants={heroItem}
                  className="text-xs font-semibold tracking-widest text-black/75 drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
                >
                  CONQUERU COACHING & COUNSELING
                </motion.div>

                <motion.div
                  variants={heroItem}
                  className="mt-3 h-[3px] w-40 rounded-full bg-[#F59E0B]/90"
                />

                <motion.h1
                  variants={heroItem}
                  className="mt-6 text-5xl font-serif font-medium tracking-tight text-[#0B2A4A] md:text-6xl"
                >
                  Transform You.
                </motion.h1>

                <motion.h2
                  variants={heroItem}
                  className="mt-2 text-4xl font-serif font-medium text-[#0F6A6B] md:text-5xl"
                >
                  Impact Your World.
                </motion.h2>

                <motion.p
                  variants={heroItem}
                  className="mt-6 text-lg leading-relaxed text-black/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                >
                  Empowering individuals of every generation through continuous growth and
                  transformative learning experiences.
                </motion.p>

                <motion.div
                  variants={heroItem}
                  className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#0B2A4A] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                  >
                    Book a Discovery Session
                  </a>

                  <button
                    type="button"
                    onClick={() => scrollToId("#approach")}
                    className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/40 px-8 py-3 text-sm font-semibold text-black/80 hover:bg-black/5"
                  >
                    Learn the Approach
                  </button>
                </motion.div>

                <motion.div
                  variants={heroItem}
                  className="mt-8 flex flex-wrap gap-2 text-xs text-black/55"
                >
                  {["Life Coaching", "Counseling Support", "Workshops", "Leadership Development"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/15 bg-white/45 backdrop-blur-[1px] px-3 py-1 text-black/70 shadow-sm"
                      >
                        {t}
                      </span>
                    )
                  )}
                </motion.div>

                {/* Scroll cue */}
                <motion.button
                  variants={heroItem}
                  type="button"
                  onClick={() => scrollToId("#approach")}
                  className="mt-10 inline-flex animate-bounce items-center gap-2 text-xs text-black/55 hover:text-black"
                >
                  <span aria-hidden>↓</span> Scroll
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Core Purpose / Approach */}
        <motion.section
          id="approach"
          className="scroll-mt-18 mx-auto max-w-screen-xl px-4 py-14 md:px-6 md:py-20"
          variants={sectionWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            {/* Left: Title + intro */}
            <div className="md:col-span-5">
              <div className="text-xs font-semibold tracking-widest text-black/50">
                THE APPROACH
              </div>

              <h2 className="mt-4 text-3xl font-serif font-medium tracking-tight text-[#0B2A4A] md:text-4xl">
                A grounded path to growth—built for real life.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-black/70">
                ConquerU blends warmth and accountability to help you create change that
                lasts. We focus on clarity, practical steps, and support you can feel—
                so you can move forward with confidence.
              </p>

              {/* subtle accent (optional, matches hero) */}
              <div className="mt-8 h-[3px] w-16 rounded-full bg-[#F59E0B]/90" />
            </div>

            {/* Right: Pillar blocks */}
            <div className="md:col-span-7">
              <div className="divide-y divide-black/10 rounded-3xl border border-black/10 bg-white/25">
                {[
                  {
                    title: "Empowerment",
                    desc: "Build self-awareness and confidence to move forward with clarity and agency. Cultivating Confident Leaders",
                  },
                  {
                    title: "Inspiration",
                    desc: "Reconnect with what matters most—and the courage to pursue meaningful change. Creative Leadership Strategies",
                  },
                  {
                    title: "Connection",
                    desc: "Strengthen relationships—with yourself and the people who support your growth. Fostering Strong Communities",
                  },
                  {
                    title: "Impact",
                    desc: "Create change that ripples outward—into your home, work, and community. Achieving Meaningful Growth",
                  },
                ].map((item, idx) => (
                  <div key={item.title} className="p-6 md:p-7">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/40 text-xs font-semibold text-[#0B2A4A]">
                        {String(idx + 1).padStart(2, "0")}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-[#0B2A4A]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-black/70">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Micro-CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#0B2A4A] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                >
                  Start with a Discovery Session
                </a>

                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/30 px-7 py-3 text-sm font-semibold text-black/80 hover:bg-white/50"
                >
                  View Services
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Services */}
        <motion.section
          id="services"
          className="scroll-mt-18 mx-auto max-w-screen-xl px-4 py-10 md:px-6 md:py-14"
          variants={sectionWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Services</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-black/70 md:text-base">
              Choose the support that matches your season—personal growth, leadership development,
              or guided learning experiences.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              {
                title: "Leadership Development",
                desc: "Build resilient, values-led leadership skills with evidence-based strategies.",
              },
              {
                title: "Coaching",
                desc: "Personalized sessions to clarify goals, navigate transitions, and grow with intention.",
              },
              {
                title: "Workshops",
                desc: "Interactive learning experiences designed to spark insight and practical action.",
              },
              {
                title: "Consulting",
                desc: "Strategic guidance to strengthen programs, teams, and community-centered impact.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-black/10 bg-white/35 p-6 shadow-sm transition hover:bg-white/55"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/70">{s.desc}</p>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#F59E0B]/70 text-[#0B2A4A]">
                    <span className="text-sm font-bold">→</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-[#0B2A4A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                  >
                    Book Now
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/40 px-4 py-2.5 text-sm font-semibold text-black/80 hover:bg-white/60"
                  >
                    Ask a Question
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* How it works */}
        <section className="mx-auto max-w-screen-xl px-4 py-10 md:px-6 md:py-14">
          <div className="rounded-3xl border border-black/10 bg-white/35 p-6 shadow-sm md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">How it Works</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/70 md:text-base">
              A simple, supportive process—so you always know what comes next.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Book a discovery session",
                  desc: "We start with where you are, what you want, and what’s been getting in the way.",
                },
                {
                  step: "02",
                  title: "Align goals + plan",
                  desc: "Together we define outcomes and build an actionable path that feels realistic.",
                },
                {
                  step: "03",
                  title: "Ongoing growth",
                  desc: "Support, accountability, and reflection—so change becomes sustainable.",
                },
              ].map((x) => (
                <div key={x.step} className="rounded-2xl border border-black/10 bg-white/40 p-5">
                  <div className="text-xs font-bold tracking-widest text-[#0B2A4A]">
                    STEP {x.step}
                  </div>
                  <div className="mt-2 text-base font-semibold">{x.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">{x.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <motion.section
          id="about"
          className="scroll-mt-18 mx-auto max-w-screen-xl px-4 py-10 md:px-6 md:py-14"
          variants={sectionWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            {/* Founder image */}
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-black/10 bg-white/20 shadow-sm">
                <motion.img
                  src={founder}
                  alt="Stephaine Huston – Founder of ConquerU"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.05, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: easeOut }}
                  viewport={{ once: true }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* subtle corner tag */}
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
                  Founder • Owner
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="md:col-span-7">
            <motion.div variants={aboutContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
              <motion.div variants={aboutItem} className="text-xs font-semibold tracking-widest text-black/50">
                MEET YOUR GUIDE
              </motion.div>

              <motion.h2
                variants={aboutItem}
                className="mt-3 text-2xl font-semibold tracking-tight text-[#0B2A4A] md:text-3xl"
              >
                Stephaine Huston
              </motion.h2>

              {/* Signature flourish row (with subtle motion) */}
              <motion.div variants={aboutItem} className="mt-3 flex items-center gap-3">
                <motion.div
                  className="h-[3px] w-16 rounded-full bg-[#F59E0B]/70"
                  animate={shouldReduceMotion ? undefined : { opacity: [0.7, 1, 0.7], scaleX: [1, 1.08, 1] }}
                  transition={shouldReduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: easeInOut }}
                  style={{ transformOrigin: "left" }}
                />
                <span className="text-sm font-serif italic text-[#0F6A6B]/90">Founder, ConquerU</span>
              </motion.div>

              <motion.p variants={aboutItem} className="mt-5 text-sm leading-relaxed text-black/70 md:text-base">
                Hi, I’m Stephaine — founder and driving force behind ConquerU Coaching & Consulting.
                With extensive senior leadership experience and a deep commitment to community service,
                I understand the transformative power of intentional coaching and leadership development.
                My work is fueled by a passion for helping others thrive and a dedication to creating
                meaningful impact — personally, professionally, and across communities.
              </motion.p>

              {/* Credentials chips stagger */}
              <motion.div variants={aboutItem} className="mt-6">
                <motion.div variants={chipContainer} className="flex flex-wrap gap-2 text-xs">
                  {[
                    "Senior Leadership Experience",
                    "Leadership Development",
                    "Coaching & Consulting",
                    "Community Impact",
                    "MBA (optional)",
                    "ICF (optional)",
                    "Certified Coach (optional)",
                  ].map((badge) => (
                    <motion.span
                      key={badge}
                      variants={chipItem}
                      className="rounded-full border border-black/10 bg-white/25 px-3 py-1 text-black/65"
                    >
                      {badge}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Quote pullout with gentle drift */}
              <motion.div variants={aboutItem} className="mt-7 rounded-2xl border border-black/10 bg-white/20 p-5">
                <div className="text-xs font-semibold tracking-widest text-black/45">FROM STEPHAINE</div>
                <motion.p
                  className="mt-3 text-sm font-serif italic leading-relaxed text-[#0B2A4A]"
                  animate={shouldReduceMotion ? undefined : { opacity: [0.92, 1, 0.92] }}
                  transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: easeInOut }}
                >
                  “You don’t have to stay who you were to become who you’re called to be.
                  Growth is possible — and you don’t have to do it alone.”
                </motion.p>
              </motion.div>

              {/* Social + CTA row */}
              <motion.div variants={aboutItem} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="https://www.linkedin.com/in/stephaine-s-huston/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/0 px-6 py-2.5 text-sm font-semibold text-black/80 hover:bg-black/5"
                >
                  LinkedIn →
                </a>

                <button
                  type="button"
                  onClick={() => scrollToId("#contact")}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/0 px-7 py-3 text-sm font-semibold text-black/80 hover:bg-black/5"
                >
                  Send a Message
                </button>

                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#0B2A4A] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                >
                  Book with ConquerU
                </a>
              </motion.div>

              <motion.p variants={aboutItem} className="mt-4 text-xs text-black/50">
                Prefer a quick starting point? Book a discovery session and we’ll map your next steps.
              </motion.p>
            </motion.div>
          </div>
          </div>
        </motion.section>


        {/* Testimonials */}
        <section className="mx-auto max-w-screen-xl px-4 py-10 md:px-6 md:py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Words from Clients
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/70 md:text-base">
                Replace these with real testimonials when you have them. Keep them short and specific.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "I gained clarity and confidence during a season that felt overwhelming.",
              "Supportive, grounded, and practical—each session gave me a next step.",
              "I’m showing up differently in my life, and people around me feel it too.",
            ].map((q, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-black/10 bg-white/35 p-6 shadow-sm"
              >
                <p className="text-sm leading-relaxed text-black/75">“{q}”</p>
                <div className="mt-4 text-xs font-semibold text-black/60">— Client</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Band */}
        <section className="mx-auto max-w-screen-xl px-4 pb-10 md:px-6 md:pb-14">
          <div className="rounded-3xl border border-black/10 bg-gradient-to-br from-[#0B2A4A] to-[#0F6A6B] p-7 text-white shadow-sm md:p-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Ready to Begin Your Journey?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/85 md:text-base">
                  Take the first step toward meaningful growth—one conversation at a time.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-[#0B2A4A] shadow-sm transition hover:opacity-95"
                >
                  Book a Discovery Session
                </a>
                <a
                  href="#contact"
                  className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-white/15"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <motion.section
          id="contact"
          className="mx-auto max-w-screen-xl px-4 pb-16 md:px-6"
          variants={sectionWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Contact</h2>
              <p className="mt-2 text-sm leading-relaxed text-black/70 md:text-base">
                Prefer to reach out first? Send a message and we’ll respond soon.
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <div className="rounded-2xl border border-black/10 bg-white/35 p-4">
                  <div className="text-xs font-semibold text-black/60">Booking</div>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block font-semibold text-[#0B2A4A] underline decoration-black/10 underline-offset-4"
                  >
                    ConquerU Book Online
                  </a>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white/35 p-4">
                  <div className="text-xs font-semibold text-black/60">Email</div>
                  <div className="mt-1 text-black/70">
                    Replace with official contact email
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white/35 p-4">
                  <div className="text-xs font-semibold text-black/60">Location</div>
                  <div className="mt-1 text-black/70">Remote • In-person (if applicable)</div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-3xl border border-black/10 bg-white/35 p-6 shadow-sm md:p-8">
                <h3 className="text-lg font-semibold">Send a message</h3>
                <p className="mt-1 text-sm text-black/70">
                  (Wireframe form — we’ll connect this to Formspree/EmailJS next.)
                </p>

                <form
                  className="mt-6 grid gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Next step: connect form submission (Formspree/EmailJS).");
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm">
                      <span className="font-medium text-black/70">First name</span>
                      <input
                        className="rounded-xl border border-black/10 bg-white/60 px-4 py-3 outline-none ring-0 placeholder:text-black/30 focus:border-black/20"
                        placeholder="First name"
                        required
                      />
                    </label>
                    <label className="grid gap-2 text-sm">
                      <span className="font-medium text-black/70">Last name</span>
                      <input
                        className="rounded-xl border border-black/10 bg-white/60 px-4 py-3 outline-none ring-0 placeholder:text-black/30 focus:border-black/20"
                        placeholder="Last name"
                        required
                      />
                    </label>
                  </div>

                  <label className="grid gap-2 text-sm">
                    <span className="font-medium text-black/70">Email</span>
                    <input
                      type="email"
                      className="rounded-xl border border-black/10 bg-white/60 px-4 py-3 outline-none ring-0 placeholder:text-black/30 focus:border-black/20"
                      placeholder="you@example.com"
                      required
                    />
                  </label>

                  <label className="grid gap-2 text-sm">
                    <span className="font-medium text-black/70">Message</span>
                    <textarea
                      className="min-h-[140px] rounded-xl border border-black/10 bg-white/60 px-4 py-3 outline-none ring-0 placeholder:text-black/30 focus:border-black/20"
                      placeholder="Tell us what you’re looking for support with..."
                      required
                    />
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="rounded-xl bg-[#0B2A4A] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                    >
                      Send Message
                    </button>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-center text-sm font-semibold text-[#0B2A4A] underline decoration-black/10 underline-offset-4"
                    >
                      Or book directly →
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 border-t border-black/5 pt-10 text-sm text-black/60">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <img
                    src={logo}
                    alt="ConquerU"
                    className="h-11 w-11 rounded-xl object-cover shadow-sm ring-1 ring-black/0"
                  />
                <div>
                  <div className="font-semibold text-black/70">ConquerU</div>
                  <div className="text-xs">Transform You • Impact Your World</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a className="hover:text-black" href="#approach">
                  Approach
                </a>
                <a className="hover:text-black" href="#services">
                  Services
                </a>
                <a className="hover:text-black" href="#about">
                  About
                </a>
                <a className="hover:text-black" href="#contact">
                  Contact
                </a>
              </div>
            </div>

            <div className="mt-8 text-xs">
              © {new Date().getFullYear()} ConquerU. All rights reserved.
            </div>
          </footer>
        </motion.section>
      </main>
    </div>
  );
}
