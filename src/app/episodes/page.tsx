"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Headphones, Sparkles } from "lucide-react";
import { seasons, latestEpisode, allEpisodes } from "@/data/podcast";
import { EpisodeCover } from "@/components/podcast/episode-cover";
import { Star } from "@/components/shared/star";
import { ListenModal } from "@/components/shared/listen-modal";

export default function EpisodesPage() {
  const [activeSeason, setActiveSeason] = useState<number>(seasons[0].number);
  const [modal, setModal] = useState<null | { title: string; number: number }>(
    null
  );

  const current = seasons.find((s) => s.number === activeSeason) ?? seasons[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-orange py-32 text-ink noise sm:py-40">
        <Star
          aria-hidden
          className="absolute -left-10 top-20 hidden h-44 w-44 text-ink/15 md:block"
        />
        <Star
          aria-hidden
          className="absolute -right-10 bottom-12 hidden h-56 w-56 text-ink/15 md:block"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bone">
              <Headphones className="h-3.5 w-3.5" /> Tous les épisodes
            </span>
            <h1 className="mt-6 font-display text-[14vw] font-black italic leading-[0.85] sm:text-[10vw] lg:text-[160px]">
              Le catalogue.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium md:text-lg">
              {allEpisodes.length} épisodes répartis sur {seasons.length}{" "}
              saisons. Choisis la tienne ci-dessous. La saison la plus récente
              est mise en avant.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured latest */}
      <section className="bg-ink py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
              <Sparkles className="h-3 w-3" /> Le plus récent
            </span>
            <h2 className="mt-3 font-display text-4xl font-black italic leading-tight text-bone md:text-5xl">
              {latestEpisode.title}
            </h2>
            <p className="mt-2 text-sm text-bone/60">
              avec {latestEpisode.guest} — {latestEpisode.guestRole} ·{" "}
              {latestEpisode.duration}
            </p>
            <p className="mt-4 max-w-2xl text-base text-bone/75">
              {latestEpisode.description}
            </p>

            <button
              type="button"
              onClick={() =>
                setModal({
                  title: latestEpisode.title,
                  number: latestEpisode.number,
                })
              }
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:scale-105"
            >
              <Headphones className="h-4 w-4" />
              Écouter
            </button>
          </motion.div>
        </div>
      </section>

      {/* Season tabs + episode list */}
      <section className="bg-ink pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 flex flex-wrap items-center gap-3 border-y border-white/10 py-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-bone/50">
              Saison :
            </span>
            {seasons.map((s) => (
              <button
                key={s.number}
                type="button"
                onClick={() => setActiveSeason(s.number)}
                className={`rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-[0.12em] transition ${
                  s.number === activeSeason
                    ? "bg-orange text-ink"
                    : "border border-white/20 text-bone/80 hover:border-orange hover:text-orange"
                }`}
              >
                S{s.number}
              </button>
            ))}
            <span className="ml-auto text-xs text-bone/50">
              {current.episodes.length} épisodes
            </span>
          </div>

          <motion.div
            key={current.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h3 className="font-display text-3xl font-black italic text-bone md:text-4xl">
              {current.title}
            </h3>
            {current.pitch && (
              <p className="mt-2 max-w-2xl text-base text-bone/70">
                {current.pitch}
              </p>
            )}
          </motion.div>

          <ul className="grid grid-cols-1 gap-3">
            {current.episodes.map((ep, i) => (
              <motion.li
                key={ep.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(i * 0.03, 0.4),
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setModal({ title: ep.title, number: ep.number })
                  }
                  className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left transition hover:border-orange/60 hover:bg-orange/5 md:p-4"
                >
                  <div className="h-20 w-20 shrink-0 sm:h-24 sm:w-24">
                    <EpisodeCover
                      guest={ep.guest}
                      number={ep.number}
                      variant={
                        ep.number % 3 === 0
                          ? "orange"
                          : ep.number % 3 === 1
                          ? "bone"
                          : "default"
                      }
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-bone/50">
                      <span>
                        S{ep.season}E{String(ep.number).padStart(2, "0")}
                      </span>
                      <span>·</span>
                      <span>{ep.duration}</span>
                      <span>·</span>
                      <span>{ep.publishedAt}</span>
                    </div>
                    <div className="mt-1 font-display text-lg font-black italic leading-tight text-bone transition-colors group-hover:text-orange md:text-xl">
                      {ep.title}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-bone/60">
                      avec {ep.guest} — {ep.guestRole}
                    </div>
                    {/* TODO: ajouter un onglet "Transcription" sur les pages saison.
                        Pour l'instant on prévoit l'UI mais sans contenu. */}
                  </div>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-bone transition group-hover:bg-orange group-hover:text-ink">
                    <Headphones className="h-4 w-4" />
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <ListenModal
        open={modal !== null}
        onClose={() => setModal(null)}
        episodeTitle={modal?.title}
        episodeNumber={modal?.number}
      />
    </>
  );
}
