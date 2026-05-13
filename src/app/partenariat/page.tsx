import type { Metadata } from "next";
import {
  Mail,
  Megaphone,
  Handshake,
  Users,
  Newspaper,
  ArrowUpRight,
} from "lucide-react";
import { brand } from "@/data/brand";
import { Star } from "@/components/shared/star";

export const metadata: Metadata = {
  title: "Partenariat",
  description:
    "Soutenir, sponsoriser, co-produire : on parle ensemble. Fier.e.s est un podcast indépendant.",
};

const audience = [
  { label: "Auditeur·ices / mois", value: "+8 000" },
  { label: "Followers Instagram", value: "+12 000" },
  { label: "Vues TikTok / mois", value: "+250 000" },
  { label: "Festival 2024", value: "+800 personnes" },
];
// TODO: remplacer ces chiffres par les vrais KPI quand Noé les aura.

const offers = [
  {
    icon: Megaphone,
    title: "Sponsoring épisode",
    body: "Sponsoring d'un ou plusieurs épisodes (mention native lue par l'hôte, jingle de pré-roll, mid-roll possible).",
  },
  {
    icon: Handshake,
    title: "Co-production",
    body: "Mini-série co-produite autour d'un sujet : votre marque s'engage sur 3-6 épisodes thématiques.",
  },
  {
    icon: Users,
    title: "Partenaire festival",
    body: "Présence physique au festival : stand, signature visuelle, accès loge, mention sur tous les supports.",
  },
  {
    icon: Newspaper,
    title: "Kit presse",
    body: "Vous êtes journaliste ? On envoie le press kit (logo HD, photos, communiqué) sur simple demande email.",
  },
];

export default function PartnershipPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink py-32 sm:py-40">
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
            <Handshake className="h-3.5 w-3.5" /> Partenariat
          </span>
          <h1 className="mt-6 font-display text-[14vw] font-black italic leading-[0.85] text-bone sm:text-[10vw] lg:text-[160px]">
            Travailler
            <br />
            ensemble.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-medium text-bone/80 md:text-lg">
            Fier.e.s est un podcast indépendant — mais on aime travailler avec
            celleux qui partagent nos valeurs. Sponsoring, co-production,
            partenariat festival : on discute volontiers.
          </p>
        </div>
      </section>

      <section className="bg-bone py-20 text-ink">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange">
            Ce qu&apos;on représente
          </span>
          <h2 className="mt-2 font-display text-4xl font-black italic md:text-5xl">
            Quelques chiffres.
          </h2>
          <p className="mt-3 text-sm text-ink/60">
            {/* TODO: remplacer les valeurs par les vrais KPI. */}
            Chiffres indicatifs — données du dernier trimestre. À actualiser
            par l&apos;équipe.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {audience.map((a) => (
              <div
                key={a.label}
                className="rounded-2xl border-2 border-ink bg-orange px-5 py-6 text-center shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
              >
                <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/70">
                  {a.label}
                </dt>
                <dd className="mt-2 font-display text-4xl font-black italic leading-none">
                  {a.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
            <Star className="h-3 w-3" /> Formats
          </span>
          <h2 className="mt-3 font-display text-5xl font-black italic leading-[0.95] text-bone md:text-7xl">
            Comment on bosse.
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {offers.map((o, i) => {
              const Icon = o.icon;
              return (
                <article
                  key={i}
                  className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-orange/60 hover:bg-orange/5 md:p-8"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange text-ink">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-black italic leading-tight text-bone">
                      {o.title}
                    </h3>
                    <p className="mt-2 text-base text-bone/75">{o.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-orange py-24 text-ink noise md:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-5xl font-black italic leading-[0.95] md:text-6xl">
            On en parle ?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base font-medium md:text-lg">
            Envoie-nous un mail avec ton projet, on revient vers toi sous 5
            jours. On répond à tout, même aux idées un peu folles.
          </p>
          <a
            href={`mailto:${brand.contactEmail}?subject=Partenariat%20Fier.e.s`}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-bold uppercase tracking-[0.16em] text-bone shadow-[6px_6px_0_0_rgba(0,0,0,0.9)] transition-transform hover:scale-105"
          >
            <Mail className="h-5 w-5" />
            {brand.contactEmail}
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-ink/70">
            Press kit disponible sur simple demande
          </p>
        </div>
      </section>
    </>
  );
}
