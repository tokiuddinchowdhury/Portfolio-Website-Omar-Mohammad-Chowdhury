/**
 * data/projects.js
 * Project data — edit this file to update project information.
 * GitHub links are left empty until real repository URLs are supplied.
 */

const PROJECTS_DATA = [
  {
    id: 1,
    slug: 'artholingo',
    name: 'ArthoLingo',
    tagline: 'OCR & Bengali Translation Web App',
    description:
      'ArthoLingo is a browser-based tool that extracts text from images using OCR and translates it into Bengali. Built to help students and readers digitize printed or handwritten text with ease.',
    purpose:
      'Many students and readers encounter printed or handwritten content they need digitized and translated quickly. ArthoLingo was built to solve this by combining image processing, OCR text extraction, and a Bengali translation workflow entirely within the browser — no account or server required.',
    features: [
      'Image upload and camera scanning',
      'OCR text extraction from images',
      'Supports JPG, PNG, WEBP, HEIC formats',
      'Auto contrast, blur detection & brightness adjustment',
      'Image rotation and contrast controls',
      'Bengali translation workflow',
      'Extracted text copy to clipboard',
      'Vocabulary generation from extracted text',
      'CSV vocabulary export',
      'PDF export of translations',
      'Handwriting-style PDF generation',
      'Scan history tracking',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl:   'https://artholingo.vercel.app/',
    githubUrl: 'https://github.com/omar-cse-dev/ArthoLingo',
    image:     'artholingo.webp',
    category:  'Web App',
    highlights: [
      'Built entirely with vanilla HTML, CSS, and JavaScript — no frameworks or build tools.',
      'All image processing runs client-side, keeping user data private.',
      'The handwriting-style PDF feature required careful font and layout engineering.',
      'Scan history is persisted locally so users can revisit previous extractions.',
    ],
  },
  {
    id: 2,
    slug: 'baksutra',
    name: 'BakSutra',
    tagline: 'Voice Typing & Live Transcription Tool',
    description:
      'BakSutra is a smart voice typing web application supporting both Bengali and English. It transcribes speech in real time, supports AI checking, and handles a range of smart voice commands including punctuation.',
    purpose:
      'Typing in Bengali on standard keyboards can be cumbersome. BakSutra was built to make Bengali voice typing as natural and productive as possible — with live transcription, translation support, and AI-powered text checking all accessible from one interface.',
    features: [
      'Live speech transcription in real time',
      'Bengali voice typing support',
      'English voice typing support',
      'Live translation workflow',
      'Auto-save functionality',
      'Copy, Read, Save and Clear controls',
      'AI Check for text review',
      'Smart voice commands for hands-free control',
      'Bengali punctuation voice commands',
      'English punctuation voice commands',
      'New line and paragraph voice commands',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl:   'https://baksutra.netlify.app/',
    githubUrl: 'https://github.com/omar-cse-dev/BakSutra',
    image:     'baksutra.webp',
    category:  'Web App',
    highlights: [
      'Uses the Web Speech API for real-time transcription without server dependency.',
      'Bengali punctuation and voice command parsing required careful language-specific logic.',
      'The AI Check feature integrates an external API for text quality review.',
      'Designed for usability with minimal clicks — most actions are voice-controllable.',
    ],
  },
  {
    id: 3,
    slug: 'qrify',
    name: 'QRify',
    tagline: 'Full-Featured QR Code Generator & Scanner',
    description:
      'QRify is a comprehensive browser-based QR code platform. It supports generating, customizing, scanning, and bulk-processing QR codes — all locally, with no account or server upload required.',
    purpose:
      'Most QR tools online are either limited in customization or require account creation and cloud uploads. QRify was built as a privacy-first, local-first alternative that covers everything from single custom QR generation to bulk CSV/Excel import and ZIP export.',
    features: [
      'QR code generation for links, profiles, Wi-Fi, contacts, payments, events, and geo coordinates',
      'Live preview as you type',
      'Custom colors and gradient styling',
      'Eye and dot/pixel shape customization',
      'Error correction level controls',
      'Logo upload and embedding',
      'PNG, JPG and SVG export',
      'QR scanner via camera (front/back switching)',
      'Torch/flashlight support where available',
      'Image-based QR decoding (upload to scan)',
      'Local scan history and analytics',
      'CSV and Excel import for bulk QR generation',
      'Bulk ZIP export',
      'Browser-side processing — no server uploads',
      'LocalStorage-based history — no account needed',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl:   'https://qrifybd.netlify.app/',
    githubUrl: 'https://github.com/omar-cse-dev/QRify',
    image:     'qrify.webp',
    category:  'Web App',
    highlights: [
      'The local-first, no-account architecture was a deliberate privacy decision.',
      'Bulk QR generation from CSV/Excel required client-side spreadsheet parsing.',
      'The ZIP export bundles all generated QR images for easy download.',
      'All scanning uses the device camera API with no external streaming.',
    ],
  },
];

// Export for use in JS modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS_DATA };
}