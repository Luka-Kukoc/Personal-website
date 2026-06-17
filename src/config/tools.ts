/**
 * Registry of interactive tools shown on /tools.
 *
 * To add a tool:
 *   1. Create a page at `src/pages/tools/<your-slug>.astro`.
 *   2. Add an entry here with a matching `href`.
 * The hub page renders cards from this list automatically.
 */
export interface Tool {
  title: string;
  slug: string;        // used for href: /tools/<slug>
  description: string;
  tag: string;         // short category label
  status?: 'live' | 'wip';
}

export const tools: Tool[] = [
  {
    title: 'Password Generator',
    slug: 'password-generator',
    description:
      'Generate strong, customizable passwords with live entropy estimation. Runs entirely in your browser.',
    tag: 'security',
    status: 'live',
  },
  // Add your own tools below, e.g.:
  // { title: 'Color Picker', slug: 'color-picker', description: '…', tag: 'design', status: 'wip' },
];
