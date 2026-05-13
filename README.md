# Festival Fier.e.s — site vitrine

> Site vitrine V1 du **Festival Fier.e.s**, festival queer parisien.
> Une journée, un lieu : **Césure, samedi 13 juin 2025, 16h – 00h.**

Drag, musique, marché de créateur·rices, talk : un site pour **donner envie,
informer et vendre des billets**.

🔗 **Billetterie** → https://www.helloasso.com/associations/rage/evenements/festival-fier-e-s
📸 **Instagram** → [@fier.e.s](https://instagram.com/fier.e.s)

---

## Sommaire

- [Stack](#stack)
- [Démarrage rapide](#démarrage-rapide)
- [Build production](#build-production)
- [Déploiement](#déploiement)
- [Structure du projet](#structure-du-projet)
- [Édition du contenu](#édition-du-contenu)
- [Accessibilité](#accessibilité)
- [Brief V2](#brief-v2)
- [Crédits](#crédits)

---

## Stack

- **Next.js 14** (App Router) + **TypeScript** strict
- **Tailwind CSS** + **Framer Motion**
- **Lucide React** pour les icônes
- Fonts : **Playfair Display** (titres) + **Space Grotesk** (corps), via `next/font`
- Aucune dépendance lourde — bundle de 151 kB First Load JS sur la home

## Démarrage rapide

```bash
npm install
npm run dev
```

Le site est servi sur [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
npm start
```

## Déploiement

Compatible **Vercel** sans configuration supplémentaire :

1. Push du repo sur GitHub
2. Import dans Vercel (le framework Next.js est détecté automatiquement)
3. Déploiement

Pour un autre hébergeur (Netlify, OVH, Cloudflare Pages), l'app est une
build Next.js standard — un `output: "standalone"` peut être ajouté dans
`next.config.mjs` au besoin.

## Structure du projet

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, curseur custom
│   ├── page.tsx            # assemblage de toutes les sections
│   └── globals.css         # styles globaux + utilitaires
├── components/
│   ├── navbar.tsx          # nav fixe + menu mobile plein écran
│   ├── hero.tsx            # héro plein écran + parallax + étoiles
│   ├── programme.tsx       # 4 créneaux, marquee
│   ├── artists.tsx         # grid 4 artistes
│   ├── artist-portrait.tsx # placeholder initials + étoiles
│   ├── talk.tsx            # 3 speakers en chips/cards
│   ├── practical-info.tsx  # adresse, transport, accessibilité, map
│   ├── partners.tsx        # logos texte stylisés
│   ├── footer.tsx          # CTA final + liens + crédits
│   ├── custom-cursor.tsx   # curseur étoile desktop
│   ├── reveal.tsx          # utilitaire fade-in scroll
│   └── star.tsx            # SVG étoile partagé
├── data/
│   └── festival.ts         # 🟠 toutes les données du site
└── lib/
    └── utils.ts            # cn() pour Tailwind merge
```

## Édition du contenu

Tout le contenu du site est centralisé dans un **seul fichier** :

📄 [`src/data/festival.ts`](src/data/festival.ts)

Pour modifier les horaires, les artistes, les partenaires, la billetterie,
les pronoms, l'adresse, etc. → c'est là. Pas de CMS, pas de back-office :
on édite, on commit, on push, Vercel redéploie.

| Variable | Ce que ça contrôle |
|---|---|
| `festival` | nom, dates, lieu, billetterie, Instagram |
| `programme` | les 4 créneaux de la timeline |
| `artists` | les 4 cartes artistes |
| `speakers` | les 3 chips du talk |
| `partners` | les logos texte du bandeau partenaires |
| `practical` | textes sur l'accessibilité, bar, safer space |
| `navLinks` | les ancres de la nav |

## Accessibilité

- `lang="fr"`, `aria-label` sur la nav, les boutons, les liens externes
- Contrastes vérifiés (orange `#F4620A` + ink `#0A0A0A` + bone `#F7F2EA`)
- Focus visible orange sur tout élément interactif
- Curseur custom **désactivé** sur écran tactile et `prefers-reduced-motion: reduce`
- Animations Framer Motion respectent `prefers-reduced-motion`
- Hiérarchie de titres `h1` → `h2` → `h3` cohérente
- Lien Maps, billetterie, Instagram avec `target="_blank" rel="noopener noreferrer"`
- Tout reste utilisable au clavier

## Brief V2

Pour préparer la **prochaine édition** (élargir la prog, intégrer la
billetterie, ajouter des candidatures, multi-langue, archives, etc.) un gros
formulaire est dispo :

📋 **[BRIEF_V2.md](./BRIEF_V2.md)** — questionnaire complet à remplir par
l'équipe festival : objectifs, identité, programmation, billetterie,
accessibilité, technique, budget. Plus c'est rempli, plus la V2 sera taillée
sur mesure.

## Scripts npm

| Script | Action |
|---|---|
| `npm run dev` | Lance le serveur de dev sur `:3000` |
| `npm run build` | Build production optimisé |
| `npm start` | Sert le build production |
| `npm run lint` | Lint le projet (ESLint + Next.js rules) |

## Crédits

Festival organisé par **RAGE** — association queer pour la fête et la lutte.

Programmation, partenaires et illustrations originales : © respectifs.
Site V1 — site vitrine fait avec amour, paillettes et caféine 🧡

---

> **Une remarque, un bug, une idée ?** Ouvre une issue ou un PR.
> Le site est volontairement tout-petit : facile à lire, facile à modifier.
