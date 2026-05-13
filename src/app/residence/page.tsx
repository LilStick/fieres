import type { Metadata } from "next";
import Link from "next/link";
import { Mic, MapPin, ArrowUpRight, Calendar } from "lucide-react";
import { residence } from "@/data/residence";
import { Star } from "@/components/shared/star";

export const metadata: Metadata = {
  title: "Résidence — Gaîté Lyrique",
  description:
    "Fier.e.s prend ses quartiers à la Gaîté Lyrique avec Ebony et Tess Kirby.",
};

export default function ResidencePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink py-32 sm:py-40">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(244,98,10,0.3), transparent 50%), radial-gradient(circle at 70% 80%, rgba(244,98,10,0.2), transparent 50%)",
          }}
        />
        <Star
          aria-hidden
          className="absolute -left-12 top-20 hidden h-44 w-44 text-orange/20 md:block"
        />
        <Star
          aria-hidden
          className="absolute -right-12 bottom-12 hidden h-56 w-56 text-orange/15 md:block"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-orange">
            <Mic className="h-3.5 w-3.5" /> {residence.status}
          </span>
          <h1 className="mt-6 font-display text-[14vw] font-black italic leading-[0.85] text-bone sm:text-[10vw] lg:text-[140px]">
            Résidence
            <br />
            <span className="text-orange">Gaîté Lyrique</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base font-medium text-bone/80 md:text-lg">
            {residence.pitch}
          </p>
        </div>
      </section>

      <section className="bg-bone py-24 text-ink md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
              <Star className="h-3 w-3" /> Le format
            </span>
            <h2 className="mt-3 font-display text-5xl font-black italic leading-[0.95] md:text-6xl">
              Le podcast sort du studio.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              {residence.description}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              Deux soirs, deux invité·es, deux ambiances. On enregistre devant
              vous, on prend le temps, et on prolonge la conversation au bar
              juste après.
            </p>
          </div>

          <aside className="rounded-3xl border-2 border-ink bg-orange p-6 text-ink shadow-[10px_10px_0_0_rgba(0,0,0,1)] sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.2em]">
              Infos pratiques
            </div>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <div className="font-bold">{residence.venue}</div>
                  <div className="text-ink/70">{residence.address}</div>
                </div>
              </li>
              <li className="flex gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <div className="font-bold">Dates</div>
                  <div className="text-ink/70">
                    {/* TODO: insérer les vraies dates de la résidence. */}
                    À confirmer prochainement
                  </div>
                </div>
              </li>
            </ul>
            <Link
              href={residence.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-bone transition hover:scale-105"
            >
              Site Gaîté Lyrique
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
            <Star className="h-3 w-3" /> Invité·es
          </span>
          <h2 className="mt-3 font-display text-5xl font-black italic leading-[0.95] text-bone md:text-7xl">
            Deux voix, deux soirs.
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {residence.guests.map((g) => (
              <article
                key={g.name}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
              >
                <Star
                  aria-hidden
                  className="absolute -right-4 -top-4 h-20 w-20 text-orange/30"
                />
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
                  {g.role}
                </div>
                <h3 className="mt-3 font-display text-5xl font-black italic leading-tight text-bone">
                  {g.name}
                </h3>
                <p className="mt-4 text-base text-bone/75">{g.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
