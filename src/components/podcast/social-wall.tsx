"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, AtSign, ArrowUpRight, Play } from "lucide-react";
import { brand } from "@/data/brand";
import { Star } from "@/components/shared/star";

/**
 * Mur de placeholders Reels/TikTok — sobre, pas flashy (cf. brief Q4.4).
 * TODO: brancher l'oEmbed Instagram / TikTok officiel pour afficher les vrais
 * derniers Reels & TikToks. Cf. https://developers.facebook.com/docs/instagram/oembed
 */
const TIKTOK_PLACEHOLDERS = [
  { caption: "Quand on découvre Paloma sur le tournage", views: "240k" },
  { caption: "Lou Trotignon explique pourquoi", views: "98k" },
  { caption: "François Chaignaud — la phrase", views: "62k" },
  { caption: "Drag & deuil, un extrait", views: "45k" },
];

const INSTA_PLACEHOLDERS = [
  { type: "Reel", caption: "Behind the scenes" },
  { type: "Post", caption: "Nouveau cette semaine" },
  { type: "Story", caption: "On enregistre…" },
];

export function SocialWall() {
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
              <Star className="h-3 w-3" /> Suivre
            </span>
            <h2 className="mt-3 max-w-2xl font-display text-5xl font-black italic leading-[0.95] text-bone md:text-7xl">
              Les coulisses, les extraits.
            </h2>
          </div>
          <p className="max-w-md text-base text-bone/70">
            Les meilleurs moments des épisodes sortent en clips. Le reste —
            studio, dédicaces, après-shows — vit sur Insta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          {/* TikTok wall */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <Link
                href={brand.socials.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-bone transition hover:text-orange"
              >
                <AtSign className="h-4 w-4" />
                TikTok {brand.socials.tiktok.handle}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-bone/40">
                Derniers extraits
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TIKTOK_PLACEHOLDERS.map((tik, i) => (
                <motion.a
                  key={i}
                  href={brand.socials.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group relative block aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-orange/20 to-ink"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 50% 50%, rgba(244,98,10,0.4), transparent 60%)",
                    }}
                  />
                  <Star
                    aria-hidden
                    className="absolute right-3 top-3 h-4 w-4 text-orange/60"
                  />
                  <span className="absolute left-1/2 top-1/2 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone/90 text-ink transition group-hover:scale-110">
                    <Play className="h-5 w-5 translate-x-[1px]" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-3 pt-10">
                    <p className="text-xs font-medium text-bone/90 line-clamp-2">
                      {tik.caption}
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
                      {tik.views} vues
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Instagram column */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <Link
                href={brand.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-bone transition hover:text-orange"
              >
                <Instagram className="h-4 w-4" />
                {brand.socials.instagram.handle}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {INSTA_PLACEHOLDERS.map((post, i) => (
                <motion.a
                  key={i}
                  href={brand.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-orange/60 hover:bg-orange/5"
                >
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-orange to-orange-700">
                    <Star className="h-6 w-6 text-ink/80" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
                      {post.type}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-bone">
                      {post.caption}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-bone/40 transition group-hover:text-orange" />
                </motion.a>
              ))}
              <Link
                href={brand.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-bone/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-bone transition hover:border-orange hover:text-orange"
              >
                Voir tout
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
