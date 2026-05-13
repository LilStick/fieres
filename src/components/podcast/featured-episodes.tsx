"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Headphones } from "lucide-react";
import { featuredEpisodes } from "@/data/podcast";
import { EpisodeCover } from "./episode-cover";
import { Star } from "@/components/shared/star";
import { ListenModal } from "@/components/shared/listen-modal";

const VARIANTS = ["orange", "bone", "default", "orange", "default", "bone"] as const;

export function FeaturedEpisodes() {
  const [modal, setModal] = useState<
    null | { title: string; number: number }
  >(null);

  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
              <Star className="h-3 w-3" /> Épisodes phares
            </span>
            <h2 className="mt-3 max-w-2xl font-display text-5xl font-black italic leading-[0.95] text-bone md:text-7xl">
              Les voix qui ont marqué.
            </h2>
          </div>
          <p className="max-w-md text-base text-bone/70">
            Six conversations à ne pas manquer si tu découvres Fier.e.s.
            Drag, danse, militantisme, écriture : un échantillon de ce qu&apos;on
            fait, et avec qui.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEpisodes.map((ep, i) => (
            <motion.article
              key={ep.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col gap-4"
            >
              <button
                type="button"
                onClick={() =>
                  setModal({ title: ep.title, number: ep.number })
                }
                className="relative block transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1.5deg]"
                aria-label={`Écouter ${ep.title}`}
              >
                <EpisodeCover
                  guest={ep.guest}
                  number={ep.number}
                  variant={VARIANTS[i % VARIANTS.length]}
                />
                <span className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange text-ink opacity-0 transition group-hover:opacity-100">
                  <Headphones className="h-4 w-4" />
                </span>
              </button>
              <div>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-bone/50">
                  <span>S{ep.season}E{String(ep.number).padStart(2, "0")}</span>
                  <span>·</span>
                  <span>{ep.duration}</span>
                </div>
                <h3 className="mt-1 font-display text-2xl font-black italic leading-tight text-bone transition-colors group-hover:text-orange">
                  {ep.title}
                </h3>
                <p className="mt-1 text-sm text-bone/60">
                  {ep.guest} — {ep.guestRole}
                </p>
                <p className="mt-3 text-sm text-bone/70">{ep.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/episodes"
            className="inline-flex items-center gap-2 rounded-full border-2 border-bone px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-bone hover:text-ink"
          >
            Voir tous les épisodes
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <ListenModal
        open={modal !== null}
        onClose={() => setModal(null)}
        episodeTitle={modal?.title}
        episodeNumber={modal?.number}
      />
    </section>
  );
}
