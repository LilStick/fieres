"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Ticket, MapPin, Clock } from "lucide-react";
import { useRef } from "react";
import { festival } from "@/data/festival";
import { Star } from "./star";

const FLOATING_STARS = [
  { top: "8%", left: "6%", size: 64, delay: 0.0, spin: 28 },
  { top: "18%", left: "84%", size: 40, delay: 0.4, spin: 22 },
  { top: "62%", left: "4%", size: 52, delay: 0.8, spin: 26 },
  { top: "74%", left: "88%", size: 36, delay: 0.2, spin: 18 },
  { top: "44%", left: "92%", size: 28, delay: 0.6, spin: 30 },
  { top: "86%", left: "48%", size: 24, delay: 1.1, spin: 14 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-orange text-ink noise"
    >
      {/* Parallax bg layer (slight texture + gradient) */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="absolute inset-0 -z-10 will-parallax"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-orange to-orange-600" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink/30" />
      </motion.div>

      {/* Floating stars */}
      {FLOATING_STARS.map((s, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute text-ink"
          style={{ top: s.top, left: s.left }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0],
            rotate: [0, 8, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: s.delay },
            scale: { duration: 0.8, delay: s.delay },
            y: {
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            },
            rotate: {
              duration: s.spin,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            },
          }}
        >
          <Star className="block" style={{ width: s.size, height: s.size }} />
        </motion.div>
      ))}

      {/* Top date strip */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mx-auto mt-24 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:mt-28 sm:px-8"
      >
        <span className="rounded-full bg-ink px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bone">
          {festival.edition}
        </span>
        <span className="hidden text-xs font-bold uppercase tracking-[0.2em] text-ink sm:inline">
          Paris — {festival.venue.name}
        </span>
      </motion.div>

      {/* Title */}
      <motion.div
        style={{ y: titleY }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 text-center sm:px-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[18vw] font-black italic leading-[0.85] tracking-tight text-bone drop-shadow-[6px_6px_0_rgba(0,0,0,1)] sm:text-[14vw] lg:text-[180px]"
        >
          Festival
          <br />
          <span className="inline-flex items-center gap-3">
            <Star className="h-[0.7em] w-[0.7em] text-bone" />
            <span>Fier.e.s</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-6 max-w-2xl text-balance text-base font-medium text-ink/90 sm:text-lg"
        >
          {festival.tagline}
        </motion.p>
      </motion.div>

      {/* Bottom info block */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 mx-auto mb-10 grid w-full max-w-7xl grid-cols-1 gap-6 px-5 sm:mb-14 sm:px-8 md:grid-cols-[1fr_auto_1fr] md:items-end"
      >
        <div className="flex flex-col gap-2 text-ink">
          <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">
            Quand
          </span>
          <span className="font-display text-3xl font-black italic leading-none sm:text-4xl">
            Sam. 13 juin
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider">
            <Clock className="h-4 w-4" />
            {festival.hours}
          </span>
        </div>

        <Link
          href={festival.ticketsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex animate-pulse-cta items-center justify-center gap-2 self-center rounded-full bg-ink px-8 py-4 text-base font-bold uppercase tracking-[0.18em] text-bone shadow-[6px_6px_0_0_rgba(0,0,0,0.9)] transition-transform hover:scale-105 md:text-lg"
        >
          <Ticket className="h-5 w-5" />
          Prendre mes billets
        </Link>

        <div className="flex flex-col gap-2 text-ink md:items-end md:text-right">
          <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">
            Où
          </span>
          <span className="font-display text-3xl font-black italic leading-none sm:text-4xl">
            Césure
          </span>
          <a
            href={festival.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider underline-offset-4 hover:underline md:justify-end"
          >
            <MapPin className="h-4 w-4" />
            13 rue Santeuil, 75005
          </a>
        </div>
      </motion.div>
    </section>
  );
}
