import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog collection. Add a new post by dropping a Markdown file into
 * `src/content/blog/`. Frontmatter fields below are required/optional as typed.
 *
 * Images:
 *  - Cover image: put the file next to the .md (e.g. ./my-cover.jpg) and set
 *    `cover: ./my-cover.jpg` in frontmatter — it's type-checked & optimized.
 *  - In-body images: use normal Markdown `![alt](./image.jpg)` with a path
 *    relative to the .md file; Astro optimizes them automatically.
 *  - Or drop images in `public/` and reference them with an absolute `/path`.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
