"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Ticket, ArrowUpRight, MapPin, Clock } from "lucide-react";
import { festival } from "@/data/festival";
import { Star } from "@/components/shared/star";

/**
 * Section "Festival" mise en avant sur la home podcast.
 * Renvoie vers la page /festival pour le détail complet.
 */
export function FestivalFeature() {
  return (
    <section className="relative overflow-hidden bg-orange py-24 text-ink md:py-32 noise">
      <Star
        aria-hidden
        className="absolute -left-10 top-10 hidden h-48 w-48 text-ink/15 md:block"
      />
      <Star
        aria-hidden
        className="absolute -right-12 bottom-12 hidden h-60 w-60 text-ink/15 md:block"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bone">
            <Ticket className="h-3.5 w-3.5" /> Le festival
          </span>
          <h2 className="mt-6 font-display text-[14vw] font-black italic leading-[0.85] sm:text-[10vw] lg:text-[140px]">
            On se voit IRL.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base font-medium md:text-lg">
            Une journée — drag, marché, talk, showcase. Le podcast quitte le
            micro pour la scène. Une seule date, un seul lieu.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-12 grid w-full max-w-4xl grid-cols-1 gap-5 rounded-3xl border-2 border-ink bg-bone p-6 text-ink shadow-[10px_10px_0_0_rgba(0,0,0,0.9)] sm:grid-cols-3 sm:p-8"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
              Quand
            </span>
            <div className="mt-1 font-display text-2xl font-black italic leading-tight">
              Sam. 13 juin 2025
            </div>
            <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em]">
              <Clock className="h-3.5 w-3.5" /> {festival.hours}
            </div>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
              Où
            </span>
            <div className="mt-1 font-display text-2xl font-black italic leading-tight">
              Césure
            </div>
            <a
              href={festival.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] underline-offset-4 hover:underline"
            >
              <MapPin className="h-3.5 w-3.5" />
              13 rue Santeuil, 75005
            </a>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
              Programme
            </span>
            <div className="mt-1 text-sm font-bold leading-snug">
              Marché · Talk · Drag Show · Showcase Tess Kirby
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href={festival.ticketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex animate-pulse-cta items-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-bold uppercase tracking-[0.16em] text-bone shadow-[6px_6px_0_0_rgba(0,0,0,0.9)] transition-transform hover:scale-105"
          >
            <Ticket className="h-5 w-5" />
            Prendre mes billets
          </Link>
          <Link
            href="/festival"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-bone"
          >
            Voir le festival
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
