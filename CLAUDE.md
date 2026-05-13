# CLAUDE.md — Contexte projet Fier.e.s

Ce fichier est auto-chargé par Claude Code dans ce repo. Il te donne le
contexte projet, les conventions, et les pièges à éviter. **Lis-le en
priorité** quand tu démarres une session ici.

Pour le détail (architecture, todos, design system, comment intégrer les
assets, etc.), consulte **HANDOVER.md** à la racine.

---

## Le projet en 2 phrases

Site portfolio du podcast **Fier.e.s** (queer & engagé, hôte Thomas
Chinarro, hebdo, 30+ épisodes sur 4 saisons) avec une **page festival**
dédiée (édition 2025 à Césure le 13 juin). Stack : Next.js 14 App Router +
TypeScript strict + Tailwind + Framer Motion + Lenis.

## Conventions de code

- **Tout en français** : code, commentaires, copy, commits.
- **TypeScript strict** activé. Pas de `any` sans justification.
- **`"use client"`** uniquement quand nécessaire (state, effects, framer,
  event handlers). Les pages sont Server par défaut sauf `episodes/page.tsx`.
- **Export nommé** partout, jamais `default` sauf pour les `page.tsx` Next.
- **Alias `@/`** → `./src/` (toujours utilisé pour les imports cross-folder).
- **Composants en `kebab-case.tsx`**, types en `PascalCase`, variables en
  `camelCase`.
- **Pas de styles inline** sauf valeurs dynamiques runtime (positions étoiles,
  etc.). Utiliser Tailwind + `cn()` depuis `@/lib/utils`.
- **Commits Conventional Commits** : `feat:`, `fix:`, `chore:`, `docs:`,
  `refactor:`.

## Architecture en bref

```
src/
├── app/           ← Pages App Router (page.tsx par route)
│   ├── layout.tsx ← Lenis + Navbar + Footer + bandeau festival (englobe tout)
│   ├── page.tsx              (home podcast)
│   ├── episodes/page.tsx     (client component — state filtre saison)
│   ├── residence/page.tsx
│   ├── festival/page.tsx
│   ├── a-propos/page.tsx
│   └── partenariat/page.tsx
├── components/
│   ├── shared/    ← navbar, footer, bandeau, listen-modal, star, lenis, cursor
│   ├── podcast/   ← composants home podcast (hero, featured-episodes, etc.)
│   └── festival/  ← composants page festival (héritage V1, à ne pas casser)
├── data/
│   ├── brand.ts      ← marque & nav globale
│   ├── podcast.ts    ← host, plateformes, épisodes, saisons
│   ├── residence.ts  ← résidence Gaîté Lyrique
│   └── festival.ts   ← édition 2025 (date, programme, artistes, partenaires)
└── lib/utils.ts      ← `cn()` Tailwind merge
```

## Design system

- **Couleurs Tailwind** : `orange` (`#F4620A`), `ink` (`#0A0A0A`),
  `bone` (`#F7F2EA`). Variantes `orange-400` à `orange-900` dispo.
- **Fonts** : `font-display` (Playfair Display italic 900) pour les titres,
  `font-body` (Space Grotesk) par défaut.
- **Style sticker** : `shadow-[6px_6px_0_0_rgba(0,0,0,1)]` pour les cards
  bone/blanc. Pas de soft shadows iOS-style.
- **Animations Framer Motion** : pattern `initial / whileInView / once: true /
  amount: 0.2-0.3 / ease: [0.22, 1, 0.36, 1]`. Cohérence importante.
- **Classes custom** : `.noise` (texture grain SVG overlay), `.text-stroke`
  (texte contour seul), `.sticker` / `.sticker-light` (ombres décalées).
- **Animations Tailwind custom** (dans `tailwind.config.ts`) :
  `animate-pulse-cta` (CTA principal), `animate-marquee`, `animate-twinkle`.

## Données importantes

- **Email contact** : `fier.e.s.podcast@gmail.com`
- **Plateformes podcast** (par priorité) : Deezer (1), Apple (2), Amazon
  (3), Spotify (4 — **volontairement discret**, ne pas le mettre en avant).
- **Festival 2025** : Samedi 13 juin 2025, Césure (13 rue Santeuil, 75005
  Paris), 16h-00h. Billetterie HelloAsso.
- **Bandeau sticky festival** : présent sur toutes les pages, fermable,
  pousse la navbar via la CSS var `--banner-h`. État en `sessionStorage`.
- **CTA navbar contextuel** : "Dernier épisode" (modale plateformes) sur la
  plupart des pages, "Billets" (HelloAsso) sur `/festival/*`.

## Ce qui est en placeholder (à remplacer en priorité)

- **Logo** : actuellement typo Playfair italique + SVG étoile. Vrais logos
  PNG dans `medias/FieresLOGOstars_Sansfond.png` (blanc) et
  `medias/FieresLOGOstars_SansfondNOIR.png` (noir).
- **Photo Thomas Chinarro** : placeholder "TC" sur fond orange dans
  `podcast/host-section.tsx` et `a-propos/page.tsx`.
- **26 épisodes placeholder** dans `data/podcast.ts` (`placeholderTitles`)
  → à remplacer par les vrais épisodes (idéalement via parsing RSS).
- **Miniatures épisodes** : cover typographique générée — TODO API
  Deezer/Apple feed.
- **Chiffres audience** sur `/partenariat` : TODO réels KPI.
- **TikTok / Instagram social wall** : placeholders. TODO oEmbed officiel.

## Pièges connus

- **`pathname` peut être `null`** : `usePathname()` renvoie `string | null`.
  Toujours `pathname?.startsWith(...) ?? false`.
- **Lenis + `useScroll` Framer Motion** : marche mais légèrement décalé.
  Pour scroll programmatique, préférer `lenis.scrollTo(target)` à
  `window.scrollTo()`.
- **`ListenModal` est instanciée à plusieurs endroits** (Navbar, hero,
  cards, page épisodes). Chaque instance a son propre state local.
- **Festival 2025 est passé** au moment où tu lis peut-être ça. Si oui,
  mets à jour `festival.date` dans `data/festival.ts` ou bascule en mode
  archive.

## Commandes utiles

```bash
npm run dev      # serveur de dev sur :3000
npm run build    # build production (DOIT passer)
npm start        # sert le build prod
npm run lint     # lint
```

```bash
grep -rn "TODO" src/                    # lister tous les TODOs
grep -rn "@/components" src/            # voir tous les imports composants
```

## Si tu modifies le contenu

- Texte / horaires / partenaires → édite `src/data/*.ts`. **Pas besoin** de
  toucher aux composants.
- Nouveau lien dans la nav → édite `navLinks` dans `data/brand.ts`.
- Nouvelle plateforme d'écoute → ajoute à `platforms` dans `data/podcast.ts`
  avec son `priority`.
- Nouvel épisode phare → ajoute à `featuredEpisodes` dans `data/podcast.ts`.

## Si tu modifies l'UI

- **Toujours `npm run build`** après refactor des schémas / props.
- **Ne pas casser `/festival`** (les composants `festival/*` sont l'héritage
  V1 intouchable).
- **Tester `prefers-reduced-motion`** quand tu ajoutes une animation —
  Lenis et CustomCursor s'éteignent dessus.

## Si tu intègres les vrais assets

Suis la **section 11 du HANDOVER.md** (méthode pas-à-pas pour copier les
PNG vers `public/brand/`, optimiser, et brancher dans les composants).

## Ressources

- **HANDOVER.md** — doc verbose complète (architecture, todos, design,
  workflow Claude, assets, déploiement, gotchas).
- **README.md** — README utilisateur·rice (démarrage rapide, sitemap).
- **BRIEF_V2.md** — gros formulaire pour collecter le brief de la prochaine
  itération (à remplir par RAGE).
- **medias/** — assets bruts officiels (logo, affiche, kit PDF).

## Contact projet

- Festival / asso RAGE : Noé Le Roux — `noe.le-roux@ovhcloud.com`
- Podcast / Thomas : `fier.e.s.podcast@gmail.com`
- Repo : `LilStick/festival-fieres`
