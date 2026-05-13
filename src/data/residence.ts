/**
 * Résidence du podcast à la Gaîté Lyrique.
 * Ebony (à sortir prochainement) + Tess Kirby.
 * TODO: confirmer les dates exactes et le format avec Noé.
 */
export const residence = {
  venue: "La Gaîté Lyrique",
  address: "3bis rue Papin, 75003 Paris",
  pitch:
    "Fier.e.s prend ses quartiers à la Gaîté Lyrique : deux épisodes enregistrés en public, en résidence, avec des invité·es qu'on adore.",
  description:
    "Le podcast quitte le studio pour un format live et public — micros sur scène, invité·es face à la salle, et après-show ouvert. Une manière d'inviter celleux qui écoutent à entrer dans la conversation.",
  status: "À venir",
  guests: [
    {
      name: "Ebony",
      role: "Épisode à paraître",
      blurb:
        "Voix puissante de la scène queer francophone, Ebony ouvre la résidence avec un épisode qui mêle musique, intimité et héritage.",
    },
    {
      name: "Tess Kirby",
      role: "Épisode public",
      blurb:
        "Tess Kirby clôt la résidence par un live hybride entre podcast et showcase — chant, conversation, et reprise pour finir.",
    },
  ],
  externalUrl: "https://gaite-lyrique.net",
} as const;
