# Agence Mue — Site vitrine

Site vitrine de l'Agence Mue, agence de design et développement digital basée à Paris.

## Stack technique

- **Framework** : Next.js 16 (App Router)
- **UI** : React 19, Tailwind CSS 4
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **Langage** : TypeScript
- **Déploiement** : Vercel

## Structure du projet

```
app/
├── layout.tsx          # Layout global (fonts, metadata, Navbar, Footer)
├── page.tsx            # Page d'accueil
└── mentions/
    └── page.tsx        # Page mentions légales

components/
├── Navbar.tsx          # Navigation fixe (desktop + mobile hamburger)
├── Hero.tsx            # Section héro principale
├── Marquee.tsx         # Bandeau défilant (Identifier, Créer, Tester, Itérer, Transmettre)
├── Manifeste.tsx       # Section manifeste de l'agence
├── Services.tsx        # Section méthode (5 étapes)
├── Products.tsx        # Section produits / projets
├── ProductCard.tsx     # Carte individuelle de produit
├── Team.tsx            # Section équipe
├── Contact.tsx         # Section formulaire de contact (mailto)
├── Footer.tsx          # Pied de page avec navigation et mentions légales
├── TornDivider.tsx     # Séparateur visuel entre sections
└── AlouetteOverlay.tsx # Overlay projet Alouette

public/
├── Subtract.svg        # Logo Mue (forme)
├── Vector 65.svg       # Élément décoratif
├── logo.svg            # Logo
├── image/              # Photos de l'équipe
└── *.jpg               # Images projets
```

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build & production

```bash
npm run build
npm start
```

## Équipe

| Nom | Rôle |
|-----|------|
| Mamou Traoré | UX / Product Designer |
| Pierre Collay | DA / UI Designer |
| Chaïnez Hajjaoui | DA / UI Designer |
| Giovanni Kloussey | Développeur |
| Eléa Ya | Développeuse |
| Hugo Borges | MKTI |
| Gabin Rouquet | MKTI |
| Walid Traoré | Motion Designer |

## Architecture technique

### Rendu & SEO

- SSR par défaut (Server Components)
- Metadata définie dans `layout.tsx` et par page (`mentions/page.tsx`)
- `lang="fr"` sur le `<html>`

### Styling

- **Tailwind CSS 4** avec `@import "tailwindcss"`

- Thème custom via `@theme inline` dans `globals.css` :
  - `--color-mue-green: #044105` (vert foncé principal)
  - `--color-mue-lime: #b7f700` (vert lime accent)
  - `--color-mue-mint: #edf4ed` (vert clair fond)
- Styles inline (`style={{}}`) pour les valeurs spécifiques au design (tailles, espacements Figma)
- Scroll smooth activé globalement

### Fonts

- **Satoshi** (Fontshare) : chargée via CDN dans `<head>`, utilisée comme police par défaut du `body`
- **Aukera** : police display pour titres, logo et marquee — 
(fichier `.woff2`/`.ttf` à ajouter et déclarer via `@font-face` dans `globals.css`)

### Animations

- **Framer Motion** : animations d'entrée au scroll 
    (`useInView`, `motion.div`)
- **CSS keyframes** : marquee défilant infini 
    (`marquee-scroll`)
- Transitions CSS via Tailwind 
    (`transition-colors`, `transition-opacity`)

### Images

- Assets statiques dans `public/`
- Photos équipe dans `public/image/`

### Alias d'import

`@/*` pointe vers la racine du projet (configuré dans `tsconfig.json`), ce qui permet d'écrire `import X from "@/components/X"`.

### TypeScript

- Mode strict activé
- Target ES2017, module ESNext avec résolution `bundler`

## Contact

contact@mue.agency.fr
