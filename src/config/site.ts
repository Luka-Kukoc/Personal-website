/**
 * Site-wide content config: name, nav links, socials, bio.
 * Keep textual/brand details here so pages stay structural.
 */

export const site = {
  title: 'LUKA KUKOC',
  tagline: 'Developer // builder // signal in the noise',
  description:
    'Personal site, blog and a small collection of interactive web tools.',
  author: 'Luka Kukoc',
  email: 'kukoc.luka@gmail.com',

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Tools', href: '/tools' },
    { label: 'About', href: '/about' },
  ],

  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'X', href: 'https://x.com/' },
    { label: 'Email', href: 'mailto:kukoc.luka@gmail.com' },
  ],
};
