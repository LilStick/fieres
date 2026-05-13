"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Train,
  Clock,
  Wine,
  Accessibility,
  Shield,
} from "lucide-react";
import { festival, practical } from "@/data/festival";
import { Star } from "@/components/shared/star";

const items = [
  {
    icon: MapPin,
    title: "Adresse",
    body: (
      <a
        href={festival.venue.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline-offset-4 hover:underline"
      >
        Césure — 13 rue Santeuil, 75005 Paris
      </a>
    ),
  },
  {
    icon: Train,
    title: "Transport",
    body: <span>Métro {festival.venue.metro}. Vélib&apos; à 1 min.</span>,
  },
  {
    icon: Clock,
    title: "Horaires",
    body: <span>{festival.hours} — entrée jusqu&apos;à 22h30</span>,
  },
  {
    icon: Wine,
    title: "Bar & restauration",
    body: <span>{practical.bar}</span>,
  },
  {
    icon: Accessibility,
    title: "Accessibilité",
    body: <span>{practical.accessibility}</span>,
  },
  {
    icon: Shield,
    title: "Espace safer",
    body: <span>{practical.safer}</span>,
  },
];

export function PracticalInfo() {
  return (
    <section
      id="infos"
      className="relative overflow-hidden bg-ink py-24 text-bone md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 grid grid-cols-1 gap-8 md:mb-16 md:grid-cols-2 md:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
              <Star className="h-3 w-3" /> Infos pratiques
            </span>
            <h2 className="mt-3 font-display text-5xl font-black italic leading-[0.95] md:text-7xl">
              Tout ce qu&apos;il faut savoir.
            </h2>
          </div>
          <p className="text-base text-bone/70 md:text-lg">
            Une journée pensée pour que tout le monde s&apos;y sente bien.
            Préviens-nous si tu as besoin de quoi que ce soit en amont,
            on s&apos;adapte.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-orange/60 hover:bg-orange/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange text-ink">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-bone/60">
                    {item.title}
                  </span>
                  <div className="text-base font-medium leading-snug text-bone">
                    {item.body}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Embedded map placeholder */}
        <motion.a
          href={festival.venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="group mt-10 block overflow-hidden rounded-3xl border border-white/10"
          aria-label="Voir Césure sur Google Maps"
        >
          <div className="relative aspect-[21/9] w-full bg-orange/20">
            {/* Stylised "map" — a thin grid + a pulsing pin */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(247,242,234,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,242,234,0.08) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="relative inline-flex h-16 w-16 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange text-ink">
                  <MapPin className="h-5 w-5" />
                </span>
              </span>
              <div className="mt-4 font-display text-3xl font-black italic">
                Césure
              </div>
              <div className="text-sm font-medium text-bone/80">
                13 rue Santeuil, 75005 Paris
              </div>
              <span className="mt-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-orange underline-offset-4 group-hover:underline">
                Ouvrir dans Maps →
              </span>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
