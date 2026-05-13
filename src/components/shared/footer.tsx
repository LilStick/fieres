"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Instagram,
  Ticket,
  ArrowUpRight,
  Mail,
  AtSign,
} from "lucide-react";
import { brand } from "@/data/brand";
import { festival } from "@/data/festival";
import { platforms } from "@/data/podcast";
import { Star } from "./star";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink py-20 text-bone">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9 }}
        className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 text-center sm:px-8"
      >
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange">
          Un podcast queer & engagé
        </span>
        <h2 className="mt-4 font-display text-[18vw] font-black italic leading-[0.85] tracking-tight text-bone sm:text-[14vw] lg:text-[200px]">
          Fier
          <span className="text-orange">.</span>
          e
          <span className="text-orange">.</span>
          s
        </h2>
      </motion.div>

      <div className="mx-auto mt-20 grid w-full max-w-7xl grid-cols-1 gap-10 border-t border-white/10 px-5 pt-12 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-orange" />
            <span className="font-display text-2xl font-black italic">
              {brand.name}
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm text-bone/60">
            {brand.description}
          </p>
          <p className="mt-4 max-w-md text-xs text-bone/40">
            Podcast & festival organisés par{" "}
            <strong className="text-bone">RAGE</strong> —{" "}
            {brand.organizer.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-bone/50">
            Écouter
          </span>
          {platforms
            .slice()
            .sort((a, b) => a.priority - b.priority)
            .map((p) => (
              <Link
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-bone hover:text-orange"
              >
                <Star className="h-3 w-3 text-orange" />
                {p.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-bone/50">
            Suivre & contacter
          </span>
          <Link
            href={brand.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-bone hover:text-orange"
          >
            <Instagram className="h-4 w-4" />
            {brand.socials.instagram.handle}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={brand.socials.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-bone hover:text-orange"
          >
            <AtSign className="h-4 w-4" />
            TikTok {brand.socials.tiktok.handle}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href={`mailto:${brand.contactEmail}`}
            className="inline-flex items-center gap-2 text-bone hover:text-orange"
          >
            <Mail className="h-4 w-4" />
            {brand.contactEmail}
          </a>
          <Link
            href={festival.ticketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-bone hover:text-orange"
          >
            <Ticket className="h-4 w-4" />
            Billets festival
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 px-5 pt-6 text-xs text-bone/40 sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} RAGE — Tous droits réservés</span>
        <span>Fait avec amour, paillettes et caféine</span>
      </div>
    </footer>
  );
}
