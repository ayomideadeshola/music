---
name: Aura
colors:
  surface: '#121317'
  surface-dim: '#121317'
  surface-bright: '#38393d'
  surface-container-lowest: '#0d0e12'
  surface-container-low: '#1a1b20'
  surface-container: '#1f1f24'
  surface-container-high: '#292a2e'
  surface-container-highest: '#343439'
  on-surface: '#e3e2e7'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e3e2e7'
  inverse-on-surface: '#2f3035'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#cebdff'
  on-secondary: '#381385'
  secondary-container: '#4f319c'
  on-secondary-container: '#bea8ff'
  tertiary: '#ffb869'
  on-tertiary: '#482900'
  tertiary-container: '#ca801e'
  on-tertiary-container: '#3f2300'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#e8ddff'
  secondary-fixed-dim: '#cebdff'
  on-secondary-fixed: '#21005e'
  on-secondary-fixed-variant: '#4f319c'
  tertiary-fixed: '#ffdcbb'
  tertiary-fixed-dim: '#ffb869'
  on-tertiary-fixed: '#2c1700'
  on-tertiary-fixed-variant: '#673d00'
  background: '#121317'
  on-background: '#e3e2e7'
  surface-variant: '#343439'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.04em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is centered on a premium, immersive music-listening experience. It targets a sophisticated audience that values sonic clarity and visual minimalism. The brand personality is "Atmospheric, Precise, and Quietly Confident." 

The design style utilizes a **Modern Minimalist** approach with a focus on **Tonal Layering**. By avoiding pure black in favor of deep, ink-like navies and charcoals, the UI creates a sense of infinite depth without the harshness of high-contrast OLED black. Visual interest is driven by content (album art) and high-energy accents of electric violet, ensuring the interface recedes to let the artistry of the music take center stage.

## Colors
This design system is strictly optimized for dark environments to mimic a studio or lounge atmosphere. 

- **Primary Accent**: Electric Violet (#8B5CF6) is reserved for the most critical interactions: play states, progress tracking, and active navigation nodes.
- **Tonal Hierarchy**: Depth is communicated through value shifts rather than borders. The base background (#0D0E12) serves as the foundation, while surfaces (#16171D) and elevated layers (#24252D) indicate interactive regions and modals.
- **Typography Tinting**: Text colors are stepped to create a clear information hierarchy, moving from pure white for titles to a muted zinc for metadata and timestamps.

## Typography
The system uses **Geist** for its technical precision and clean, monolinear construction, which complements the "developer-grade" quality of the audio engine.

A high-contrast scale is employed between display titles and body text to create editorial impact. Headlines use tight letter-spacing and heavy weights to anchor sections, while body text and labels use generous line heights to ensure legibility in low-light environments. For mobile, display sizes are aggressively reduced to ensure long track and album titles do not wrap awkwardly.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a specific focus on horizontal rhythm. On desktop, a 12-column grid is used with wide 24px gutters to allow the album artwork "breathing room."

- **Horizontal Scrolling**: Mobile layouts rely heavily on edge-to-edge horizontal carousels for browsing categories, utilizing the `margin-mobile` as the initial offset.
- **Vertical Rhythm**: Spacing is strictly mathematical, built on a 4px base unit. Components typically use `md` (16px) or `lg` (24px) padding to maintain the "generous whitespace" brand pillar.
- **The Player Bar**: A persistent 80px bottom-docked container serves as the global anchor across all device types.

## Elevation & Depth
Elevation is conveyed through **Tonal Layers** and **Subtle Layered Shadows**. 

Instead of traditional drop shadows which can appear muddy on dark backgrounds, this design system uses "Inner Glows" and very faint, large-radius black shadows (opacity 40%) to lift elements. 
- **Level 0 (Base)**: #0D0E12 (Background).
- **Level 1 (Cards)**: #16171D with a 1px solid stroke of #2A2B32.
- **Level 2 (Overlays/Modals)**: #24252D with a 24px blur shadow. 

Borders are used sparingly, primarily as a 1px definition line for input fields or to separate the persistent navigation sidebar from the main content feed.

## Shapes
The shape language is controlled and systematic. A "Rounded" logic is applied but varies by component scale:
- **Major Containers (Cards, Modals)**: 12px corner radius to provide a friendly, modern frame for artwork.
- **Interactive Elements (Buttons, Inputs)**: 8px corner radius for a tighter, more functional appearance.
- **Album Art**: Strictly 8px to ensure the focus remains on the art itself while softening the grid.
- **Play/Pause Controls**: Circular (fully rounded) to denote their primary status and tactile nature.

## Components
- **Buttons**: Primary buttons use the Electric Violet (#8B5CF6) fill with white text. Secondary buttons are ghost-style with a #2A2B32 border.
- **Progress Bars**: The track progress bar is a 4px tall track. The elapsed portion is Electric Violet, while the remaining portion is #2A2B32. On hover, a small circular handle appears.
- **Cards**: Music cards (Albums/Playlists) feature no visible border. The image is the primary focus, with the title in `body-md` white and the artist in `text-secondary`.
- **Inputs**: Search bars use the `surface-elevated` color with a 1px border. The text is `text-secondary`, shifting to `text-primary` on focus with an Electric Violet glow.
- **Chips**: Used for genre tags. They feature a #16171D background with a #2A2B32 border and `label-sm` typography.
- **Lists**: Tracklists use a subtle hover state (#16171D) that spans the full width of the container, with the active track highlighted in Electric Violet.