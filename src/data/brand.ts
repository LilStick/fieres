/**
 * Marque commune au podcast et au festival.
 */
export const brand = {
  name: "Fier.e.s",
  tagline: "Un podcast queer et engagé qui met en lumière les voix qu'on n'entend pas assez.",
  description:
    "Fier.e.s est un podcast hebdomadaire : table ronde et portraits, à la rencontre des récits queer et féministes que les médias mainstream laissent dans l'angle mort.",
  // TODO: confirmer le domaine final avec Noé.
  domain: "fier-e-s.fr",
  contactEmail: "fier.e.s.podcast@gmail.com",
  organizer: {
    name: "RAGE",
    description: "Association queer pour la fête et la lutte.",
  },
  socials: {
    instagram: {
      handle: "@fier.e.s",
      // TODO: confirmer l'URL exacte du compte podcast (vs festival).
      url: "https://instagram.com/fier.e.s",
    },
    tiktok: {
      handle: "@fier.e.s",
      // TODO: ajouter l'URL TikTok réelle quand dispo.
      url: "https://tiktok.com/@fier.e.s",
    },
  },
} as const;

export const navLinks = [
  { label: "Épisodes", href: "/episodes" },
  { label: "Résidence", href: "/residence" },
  { label: "Festival", href: "/festival" },
  { label: "À propos", href: "/a-propos" },
  { label: "Partenariat", href: "/partenariat" },
] as const;
