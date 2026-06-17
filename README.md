# Personal Website

Cyberpunk-styled personal site built with [Astro](https://astro.build) — home, blog
(Markdown-driven), interactive tools, and an about page.

## Commands

| Command           | Action                                      |
| ----------------- | ------------------------------------------- |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start dev server at `http://localhost:4321` |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview the production build locally        |

## Theming — one place to change everything

All colors, fonts, spacing and effect toggles live in
[`src/config/theme.ts`](src/config/theme.ts). Edit that one object and the whole
site updates — nothing else hardcodes a color. Alternate palettes (matrix green,
amber CRT, neon pink) are included as commented presets at the bottom of the file.

Medium-intensity effects (scanlines, background grid, neon glow, glitch text) are
individual booleans under `theme.effects` — flip any to `false` to disable.

## Writing blog posts

Add a Markdown file to `src/content/blog/`. The filename is the URL slug. Required
frontmatter:

```yaml
---
title: "Your title"
description: "One-line summary."
pubDate: 2026-06-17
tags: ["tag-a", "tag-b"]   # optional, powers the tag filter
cover: ./cover.svg          # optional cover image (relative path)
draft: false                # optional; true hides it from the site
---
```

### Images

- **Beside the post** (optimized): `![alt](./image.jpg)` with a path relative to
  the `.md` file. Works for the `cover:` field too.
- **From `public/`** (untouched): `![alt](/images/photo.jpg)`.

## Adding tools (React / TSX)

Tools are **React components**. Astro's router only serves `.astro`/`.md` files,
so each tool gets a tiny `.astro` route wrapper that mounts the React island — but
all the actual code lives in `.tsx`.

1. Write the tool as a React component in `src/components/tools/<Name>.tsx`
   (styles go in a co-located `<Name>.module.css`).
2. Add a thin route at `src/pages/tools/<slug>.astro`:

   ```astro
   ---
   import BaseLayout from '../../layouts/BaseLayout.astro';
   import MyTool from '../../components/tools/MyTool.tsx';
   ---
   <BaseLayout title="My Tool" description="...">
     <MyTool client:load />
   </BaseLayout>
   ```

3. Register it in [`src/config/tools.ts`](src/config/tools.ts) so it appears on
   the `/tools` hub.

`client:load` hydrates the component in the browser (use for interactive tools).
Omit the directive for a static, zero-JS component (that's how the hub itself,
`ToolsIndex.tsx`, is rendered). See `PasswordGenerator.tsx` for a full worked
example (Web Crypto + live entropy meter). React is wired up via `@astrojs/react`
in `astro.config.mjs`.

## Structure

```
src/
  config/            theme.ts · site.ts · tools.ts   ← edit these
  components/        Nav · Footer · GlitchText · PostCard · ThemeStyles
    tools/           React tools: PasswordGenerator.tsx · ToolsIndex.tsx (+ .module.css)
  layouts/           BaseLayout · BlogPost
  content/           blog/ (Markdown posts + images)
  pages/             index · about · blog/ · tools/ · 404 (tools/* = thin React route wrappers)
  styles/            global.css
```
