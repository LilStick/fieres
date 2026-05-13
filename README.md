# Festival Fier.e.s — site vitrine

Site vitrine V1 du **Festival Fier.e.s**, festival queer parisien.
Une journée, un lieu : **Césure, samedi 13 juin 2025, 16h – 00h.**

> Drag, musique, marché de créateur·rices, talk : un site pour donner envie,
> informer et vendre des billets.

## Stack

- **Next.js 14** (App Router) + **TypeScript** strict
- **Tailwind CSS** + **Framer Motion**
- **Lucide React** pour les icônes
- Fonts : **Playfair Display** (titres) + **Space Grotesk** (corps), via `next/font`

## Démarrer en local

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

## Contenu

Tout le contenu du site est centralisé dans un seul fichier :

- [`src/data/festival.ts`](src/data/festival.ts)

Pour mettre à jour la programmation, les artistes, les partenaires, etc., il
suffit d'éditer ce fichier.

## Architecture

```
src/
├── app/
│   ├── layout.tsx        # fonts, metadata, cursor
│   ├── page.tsx          # assemblage des sections
│   └── globals.css       # styles globaux + utilitaires
├── components/
│   ├── navbar.tsx        # nav fixe + menu mobile
│   ├── hero.tsx          # héro plein écran + parallax
│   ├── programme.tsx     # timeline / 4 créneaux
│   ├── artists.tsx       # grid 4 artistes
│   ├── artist-portrait.tsx
│   ├── talk.tsx          # speakers Talk 18h
│   ├── practical-info.tsx
│   ├── partners.tsx
│   ├── footer.tsx
│   ├── custom-cursor.tsx # curseur étoile desktop
│   ├── reveal.tsx        # utilitaire fade-in scroll
│   └── star.tsx          # SVG décoratif partagé
├── data/
│   └── festival.ts       # toutes les données
└── lib/
    └── utils.ts          # cn() pour Tailwind
```

## Accessibilité

- `lang="fr"`, `aria-label` sur la nav et les boutons interactifs
- Contrastes vérifiés (orange `#F4620A` + noir + crème)
- Focus visible orange
- Curseur custom désactivé sur touch et `prefers-reduced-motion: reduce`
- Tout le site reste utilisable au clavier

## Crédits

Festival organisé par **RAGE**.
Programmation, partenaires et illustrations : © respectifs.
