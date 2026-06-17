/**
 * ============================================================================
 *  THEME CONFIG  —  the single source of truth for the site's look & feel.
 * ============================================================================
 *
 *  Change colors, fonts, spacing and effect toggles HERE and the whole site
 *  updates. These values are emitted as CSS custom properties by
 *  `src/components/ThemeStyles.astro`, and consumed everywhere via `var(--...)`.
 *
 *  Want a different vibe? Try the alternate palettes at the bottom of this file.
 */

export interface ThemeColors {
  bg: string;          // page background (near-black)
  bgAlt: string;       // alternate background band
  surface: string;     // cards / panels
  surfaceAlt: string;  // hovered / elevated panels
  border: string;      // hairline borders
  text: string;        // primary text
  textMuted: string;   // secondary text
  primary: string;     // main accent (electric red)
  secondary: string;   // support accent (cyan)
  success: string;
  warning: string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: {
    sans: string;      // body text
    mono: string;      // headings / UI / code
  };
  /** Base unit (px) used to derive the spacing scale. */
  spacingUnit: number;
  /** Corner radius for panels, buttons, inputs. */
  radius: string;
  /** Max content width. */
  maxWidth: string;
  /** Toggle the medium-intensity cyberpunk effects. */
  effects: {
    scanlines: boolean;  // CRT scanline overlay
    glow: boolean;       // neon glow on accents
    glitch: boolean;     // glitch on hover / headings
    grid: boolean;       // faint background grid
  };
}

// ── ACTIVE THEME ────────────────────────────────────────────────────────────
//  Neon Noir (red): near-black base, electric red + cyan accents.
export const theme: Theme = {
  colors: {
    bg: '#08080c',
    bgAlt: '#0d0d14',
    surface: '#12121b',
    surfaceAlt: '#1a1a27',
    border: '#262635',
    text: '#e8e8f2',
    textMuted: '#8b8ba3',
    primary: '#ff2733',   // electric red
    secondary: '#1fe5ff', // cyan
    success: '#22ff9c',
    warning: '#ffc233',
  },
  fonts: {
    sans: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace",
  },
  spacingUnit: 8,
  radius: '4px',
  maxWidth: '1080px',
  effects: {
    scanlines: true,
    glow: true,
    glitch: true,
    grid: true,
  },
};

// ── ALTERNATE PALETTES (swap into `theme.colors` to retheme) ─────────────────
//
//  Matrix green:
//    bg:'#02060a', bgAlt:'#03100c', surface:'#06140e', surfaceAlt:'#0a1f16',
//    border:'#10362a', text:'#d6ffe6', textMuted:'#5fae84',
//    primary:'#00ff88', secondary:'#7dffb0', success:'#00ff88', warning:'#d0ff00'
//
//  Amber CRT:
//    bg:'#0c0700', bgAlt:'#140d02', surface:'#1a1105', surfaceAlt:'#241808',
//    border:'#3a2810', text:'#ffd9a0', textMuted:'#b08a55',
//    primary:'#ffb000', secondary:'#ff7b00', success:'#ffd000', warning:'#ff4400'
//
//  Neon noir (original pink):
//    primary:'#ff2a8d', secondary:'#00e5ff'
