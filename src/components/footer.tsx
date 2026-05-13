"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Ticket, ArrowUpRight } from "lucide-react";
import { festival } from "@/data/festival";
import { Star } from "./star";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink py-20 text-bone">
      {/* Giant decorative title */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9 }}
        className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 text-center sm:px-8"
      >
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange">
          On se voit le 13 juin
        </span>
        <h2 className="mt-4 font-display text-[18vw] font-black italic leading-[0.85] tracking-tight text-bone sm:text-[14vw] lg:text-[200px]">
          Fier
          <span className="text-orange">.</span>
          e
          <span className="text-orange">.</span>
          s
        </h2>
        <Link
          href={festival.ticketsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 text-base font-bold uppercase tracking-[0.18em] text-ink shadow-[6px_6px_0_0_rgba(247,242,234,1)] transition-transform hover:scale-105"
        >
          <Ticket className="h-5 w-5" />
          Prendre mes billets
        </Link>
      </motion.div>

      <div className="mx-auto mt-20 grid w-full max-w-7xl grid-cols-1 gap-8 border-t border-white/10 px-5 pt-10 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-orange" />
            <span className="font-display text-2xl font-black italic">
              Fier.e.s
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-bone/60">
            Festival organisé par <strong className="text-bone">RAGE</strong> —{" "}
            {festival.organizer.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-bone/50">
            Suivre
          </span>
          <Link
            href={festival.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-bone hover:text-orange"
          >
            <Instagram className="h-4 w-4" />
            {festival.instagram.handle}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={festival.ticketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-bone hover:text-orange"
          >
            <Ticket className="h-4 w-4" />
            Billetterie HelloAsso
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex flex-col gap-3 text-sm md:items-end md:text-right">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-bone/50">
            Contact
          </span>
          <a
            href="mailto:hello@fier-e-s.fr"
            className="text-bone hover:text-orange"
          >
            hello@fier-e-s.fr
          </a>
          <span className="text-xs text-bone/50">
            Presse, partenariats, accessibilité
          </span>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 px-5 pt-6 text-xs text-bone/40 sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} RAGE — Tous droits réservés</span>
        <span>Site vitrine v1 — fait avec amour, paillettes et caféine.</span>
      </div>
    </footer>
  );
}
