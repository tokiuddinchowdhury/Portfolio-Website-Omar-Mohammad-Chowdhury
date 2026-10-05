/**
 * data/blog.js
 * Blog article data — currently empty (Coming Soon state).
 *
 * TO ADD A FUTURE ARTICLE:
 * Add an object to the BLOG_POSTS array following the structure below.
 * The blog.js renderer will automatically display it.
 *
 * Field reference:
 *   id          — unique number
 *   slug        — URL-safe string (used in filename: /{slug}.html)
 *   title       — article title
 *   category    — e.g. 'Frontend', 'AI', 'Learning'
 *   date        — ISO date string: '2026-01-15'
 *   readingTime — estimated reading time in minutes
 *   excerpt     — 1-2 sentence summary shown on the blog index
 *   coverImage  — path to cover image: '{slug}.webp'
 *   tags        — array of strings
 *   content     — HTML string OR path to a separate .html partial
 */

const BLOG_POSTS = [
  // No articles yet — add future posts here.
  // Example structure (commented out):
  //
  // {
  //   id: 1,
  //   slug: 'how-i-built-artholingo',
  //   title: 'How I Built ArthoLingo — OCR & Bengali Translation in the Browser',
  //   category: 'Projects',
  //   date: '2026-02-01',
  //   readingTime: 7,
  //   excerpt: 'A walkthrough of how I designed and built ArthoLingo using only vanilla JS, the browser\'s OCR capabilities, and a translation workflow.',
  //   coverImage: 'artholingo-post.webp',
  //   tags: ['JavaScript', 'OCR', 'Bengali', 'Browser APIs'],
  // },
];

const BLOG_CATEGORIES = [
  'All',
  'Frontend',
  'Full Stack',
  'AI',
  'Projects',
  'Learning',
  'Tools',
];

// Export for use in JS modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BLOG_POSTS, BLOG_CATEGORIES };
}