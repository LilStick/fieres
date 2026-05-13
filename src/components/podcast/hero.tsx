"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Headphones, ArrowUpRight, Sparkles } from "lucide-react";
import { brand } from "@/data/brand";
import { latestEpisode, platforms } from "@/data/podcast";
import { Star } from "@/components/shared/star";
import { ListenModal } from "@/components/shared/listen-modal";

const FLOATING_STARS = [
  { top: "12%", left: "6%", size: 64, delay: 0.0 },
  { top: "18%", right: "8%", size: 36, delay: 0.4 },
  { top: "62%", left: "4%", size: 48, delay: 0.8 },
  { top: "74%", right: "10%", size: 28, delay: 0.2 },
  { top: "44%", right: "6%", size: 20, delay: 0.6 },
  { top: "86%", left: "44%", size: 24, delay: 1.1 },
];

export function PodcastHero() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const topPlatform = [...platforms].sort((a, b) => a.priority - b.priority)[0];

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-orange text-ink noise pt-24 sm:pt-28"
    >
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="absolute inset-0 -z-10 will-parallax"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-orange to-orange-600" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink/30" />
      </motion.div>

      {FLOATING_STARS.map((s, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute text-ink"
          style={{ top: s.top, left: s.left, right: s.right }}
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
              duration: 18 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            },
          }}
        >
          <Star className="block" style={{ width: s.size, height: s.size }} />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-5 sm:px-8"
      >
        <span className="rounded-full bg-ink px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bone">
          Podcast — saison 4 en cours
        </span>
        <span className="hidden text-xs font-bold uppercase tracking-[0.2em] text-ink sm:inline">
          Hebdo · Paris
        </span>
      </motion.div>

      <motion.div
        style={{ y: titleY }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 py-10 text-center sm:px-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[20vw] font-black italic leading-[0.85] tracking-tight text-bone drop-shadow-[6px_6px_0_rgba(0,0,0,1)] sm:text-[14vw] lg:text-[200px]"
        >
          <span className="inline-flex items-center gap-3">
            <Star className="h-[0.65em] w-[0.65em] text-bone" />
            <span>{brand.name}</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-6 max-w-2xl text-balance text-base font-medium text-ink/90 sm:text-lg"
        >
          {brand.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group inline-flex animate-pulse-cta items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-bold uppercase tracking-[0.16em] text-bone shadow-[6px_6px_0_0_rgba(0,0,0,0.9)] transition-transform hover:scale-105"
          >
            <Headphones className="h-5 w-5" />
            Écouter le dernier épisode
          </button>
          <a
            href={topPlatform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-bone px-6 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-bone"
          >
            <Sparkles className="h-4 w-4" />
            S&apos;abonner sur {topPlatform.label}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Bandeau dernier épisode */}
      <motion.aside
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 mx-auto mb-8 w-full max-w-7xl px-5 sm:mb-12 sm:px-8"
        aria-label="Dernier épisode"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group flex w-full items-stretch gap-0 rounded-3xl border-2 border-ink bg-bone text-left text-ink shadow-[10px_10px_0_0_rgba(0,0,0,0.9)] transition-transform hover:-translate-y-[2px]"
        >
          <div className="hidden w-32 shrink-0 items-center justify-center rounded-l-2xl border-r-2 border-ink bg-orange text-ink sm:flex">
            <Star className="h-12 w-12" />
          </div>
          <div className="flex-1 px-5 py-4 sm:px-7 sm:py-5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-orange">
              <Headphones className="h-3 w-3" />
              Dernier épisode · #{latestEpisode.number} · S{latestEpisode.season}
            </div>
            <div className="mt-1 font-display text-xl font-black italic leading-tight sm:text-2xl">
              {latestEpisode.title}
            </div>
            <div className="mt-0.5 text-xs text-ink/70">
              avec {latestEpisode.guest} — {latestEpisode.duration}
            </div>
          </div>
          <div className="hidden items-center justify-center pr-6 sm:flex">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-bone transition group-hover:bg-orange group-hover:text-ink">
              <Headphones className="h-5 w-5" />
            </span>
          </div>
        </button>
      </motion.aside>

      <ListenModal
        open={open}
        onClose={() => setOpen(false)}
        episodeTitle={latestEpisode.title}
        episodeNumber={latestEpisode.number}
      />
    </section>
  );
}
