# Spec — Redesign "Exuvie" · Mue Agency

**Date :** 2026-05-23
**Statut :** Approuvé

## Concept

Le site doit incarner physiquement la mue : inconfortable, fascinant, mémorable. Fini le glassmorphism générique. On passe à un design éditorial radical avec déchirures entre sections, grain SVG, typographie monumentale et blanc cassé comme nouvelle couleur dominante.

## Système de couleurs

| Rôle | Valeur |
|---|---|
| Blanc exuvie | `#F5F5EE` |
| Noir profond | `#0D0D0D` |
| Lime | `#C6FF00` |
| Grain | SVG `feTurbulence` filter en overlay |

Suppression : glassmorphism, blobs flous.

## Composants nouveaux

### `CustomCursor`
- Cercle organique ~40px, suit le curseur avec lerp
- Morphe en blob au survol d'éléments interactifs
- Désactivé sur mobile

### `TornDivider` (5 variantes)
- SVG clipPath avec path irrégulier simulant une déchirure de papier
- Chaque divider = SVG unique
- Micro-animation ±2px, 4s, ease-in-out infini
- Alterne blanc→noir et noir→blanc

### `GrainOverlay`
- SVG feTurbulence en position fixed, pointer-events none
- Opacity ~0.04, couvre toute la page

## Structure de page

1. **Hero** — fond blanc `#F5F5EE`
   - "MUE" en `22vw`, Syne Bold, noir
   - Ligne lime 1px horizontale traverse la page
   - Tagline micro en uppercase espacé
   - "La suite vous appartient." italic droite
   - Grain overlay

2. **Déchirure #1** blanc→noir

3. **Manifeste** — fond noir
   - Texte éditorial en scroll reveal ligne par ligne
   - Framer Motion whileInView

4. **Déchirure #2** noir→blanc

5. **Cycle / Services** — fond blanc
   - Layout vertical, plus de carousel
   - Numéro géant en bg (opacity 5%)
   - Ligne lime verticale à gauche (colonne vertébrale)
   - Scroll reveal titre par titre

6. **Déchirure #3** blanc→noir

7. **Produits** — fond noir
   - Bordures lime fines, pas de glass
   - Hover : fond lime / texte noir

8. **Déchirure #4** noir→blanc

9. **Équipe** — fond blanc
   - Photos N&B → couleur au hover (filter CSS)

10. **Déchirure #5** blanc→noir

11. **Contact** — fond noir
    - "Parlons." en `15vw`
    - Formulaire minimaliste

## Technique

- Framer Motion pour scroll reveals et animations
- SVG clipPath pour les déchirures
- CSS custom property pour le curseur
- `useRef` + `requestAnimationFrame` pour le lerp du curseur
- Suppression de `Blobs.tsx`
