import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Instagram, AtSign, ArrowUpRight } from "lucide-react";
import { brand } from "@/data/brand";
import { host } from "@/data/podcast";
import { Star } from "@/components/shared/star";

export const metadata: Metadata = {
  title: "À propos",
  description: brand.description,
};

const principles = [
  {
    title: "Écouter, vraiment.",
    body: "Pas d'interview à la chaîne. On prend le temps qu'il faut pour qu'une voix puisse s'installer, hésiter, se contredire, et revenir.",
  },
  {
    title: "Mettre en lumière.",
    body: "On invite celleux qu'on n'entend pas assez. Pas les têtes d'affiche déjà saturées : les voix qui bossent, qui agissent, qui font.",
  },
  {
    title: "Rester libre.",
    body: "Pas de format pré-mâché, pas de questions imposées par une marque. Le podcast est indépendant et le restera.",
  },
  {
    title: "Faire la fête, aussi.",
    body: "Le militantisme sans joie nous épuise. On parle dur, on parle vrai, mais on rit beaucoup. Et chaque année, on organise un festival.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-orange py-32 text-ink noise sm:py-40">
        <Star
          aria-hidden
          className="absolute -left-10 top-20 hidden h-44 w-44 text-ink/15 md:block"
        />
        <Star
          aria-hidden
          className="absolute -right-10 bottom-12 hidden h-56 w-56 text-ink/15 md:block"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bone">
            <Star className="h-3 w-3" /> À propos
          </span>
          <h1 className="mt-6 font-display text-[14vw] font-black italic leading-[0.85] sm:text-[10vw] lg:text-[160px]">
            Fier.e.s,
            <br />
            c&apos;est quoi ?
          </h1>
          <p className="mt-6 max-w-3xl text-base font-medium md:text-lg">
            Un podcast hebdomadaire né d&apos;une envie simple : faire de la
            place aux récits queer et féministes qu&apos;on entend trop peu.
            Un micro, un·e invité·e, et le temps de poser les bonnes questions.
          </p>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
            <Star className="h-3 w-3" /> Manifeste
          </span>
          <h2 className="mt-3 font-display text-5xl font-black italic leading-[0.95] text-bone md:text-6xl">
            Quatre principes,
            <br />
            qu&apos;on n&apos;oublie jamais.
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {principles.map((p, i) => (
              <article
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-orange/60 hover:bg-orange/5"
              >
                <span className="font-display text-5xl font-black italic text-orange">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-2xl font-black italic text-bone">
                  {p.title}
                </h3>
                <p className="mt-2 text-base text-bone/75">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone py-24 text-ink md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 md:grid-cols-[1fr_1.3fr]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border-2 border-ink bg-orange shadow-[10px_10px_0_0_rgba(0,0,0,1)]">
            {[
              { top: "8%", left: "10%", size: 28 },
              { top: "18%", right: "12%", size: 22 },
              { top: "70%", left: "10%", size: 20 },
              { top: "82%", right: "16%", size: 30 },
            ].map((s, i) => (
              <Star
                key={i}
                className="absolute text-ink/80"
                style={{
                  top: s.top,
                  left: s.left,
                  right: s.right,
                  width: s.size,
                  height: s.size,
                }}
              />
            ))}
            <span
              className="absolute inset-0 flex items-center justify-center font-display text-[36vw] font-black italic leading-none text-ink sm:text-[20vw] md:text-[12vw]"
              aria-hidden
            >
              TC
            </span>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
              <Star className="h-3 w-3" /> Aux manettes
            </span>
            <h2 className="mt-3 font-display text-5xl font-black italic leading-[0.95]">
              {host.name}
            </h2>
            <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-ink/60">
              {host.pronouns} — {host.role}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ink/85">
              {host.bio}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              Fier.e.s, c&apos;est aussi une équipe qui prépare, monte, écrit
              et diffuse — toustes bénévoles, toustes queer, toustes
              insomniaques.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
            <Star className="h-3 w-3" /> Nous écrire
          </span>
          <h2 className="mt-3 font-display text-5xl font-black italic leading-[0.95] text-bone md:text-6xl">
            Une voix qu&apos;on devrait inviter ?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-bone/70 md:text-lg">
            Une recommandation d&apos;invité·e, une question, une envie de
            collaborer : écris-nous, on lit tout.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${brand.contactEmail}`}
              className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:scale-105"
            >
              <Mail className="h-4 w-4" />
              {brand.contactEmail}
            </a>
            <Link
              href={brand.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-bone px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-bone hover:text-ink"
            >
              <Instagram className="h-4 w-4" />
              {brand.socials.instagram.handle}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={brand.socials.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-bone px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-bone hover:text-ink"
            >
              <AtSign className="h-4 w-4" />
              TikTok {brand.socials.tiktok.handle}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
