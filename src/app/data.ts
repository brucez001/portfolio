export type NavLink = {
  href: string;
  label: string;
};

export type Experience = {
  company: string;
  date: string;
  description: string;
  role: string;
};

export type Project = {
  description: string;
  imageAlt: string;
  imagePosition?: 'center' | 'top left' | 'top right';
  imageSrc: string;
  link?: string;
  name: string;
  tags: string[];
};

export const navLinks: NavLink[] = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export const socialLinks = [
  {
    href: 'https://github.com/brucez001',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/bruce-zhu-01/',
    label: 'LinkedIn',
  },
] as const;

export const highlights = [
  { label: 'Building', value: 'Web & mobile' },
  { label: 'Designing', value: 'Systems & interfaces' },
  { label: 'Exploring', value: 'AI & agents' },
] as const;

export const skills = [
  'Cross-platform',
  'Design Systems',
  'Cloud',
  'SEO',
  'E-commerce',
  'Supply Chain',
  'Crypto',
  'Trading',
] as const;

export const services = [
  {
    title: 'Web Apps',
    description: 'Scalable interfaces with modern React architecture, secure authentication, and reliable performance.',
  },
  {
    title: 'Mobile Apps',
    description: 'Cross-platform product experiences for iOS and Android with native-feeling UI and smooth performance.',
  },
  {
    title: 'Custom Websites',
    description: 'Fast, beautiful and crawlable marketing and content sites with strong SEO foundations.',
  },
] as const;

export const experiences: Experience[] = [
  {
    company: 'CoinJar',
    date: '2024 - Present',
    description:
      'Developing financial products across iOS, Android, and web. Optimising site performance and SEO.',
    role: 'Software Engineer',
  },
  {
    company: 'iTrazo Tracetech',
    date: '2022 - 2024',
    description:
      'Built supply-chain technology for transport and agriculture, including CRM, inventory management, order tracking, and e-commerce systems.',
    role: 'Software Engineer',
  },
  {
    company: 'University of Melbourne',
    date: '2022',
    description:
      'Majored in Computer Science and Software Engineering, won hackathon awards, and mentored first-year students through IT club work.',
    role: 'CS Graduate',
  },
];

export const projects: Project[] = [
  {
    description:
      'Online storefront for a home bakery with product browsing, ordering, and secure checkout. Built for fast loads and strong SEO.',
    imageAlt: 'Jinni Bakehouse online bakery storefront homepage',
    imageSrc: '/assets/projects/jinni/jinni_home.png',
    link: 'https://jinnibakehouse.com',
    name: 'Jinni Bakehouse',
    tags: ['Next.js', 'Tailwind', 'E-commerce', 'SEO'],
  },
  {
    description:
      'Internal operations console for managing products, orders, customers, and promotions, with real-time updates and role-based access.',
    imageAlt: 'E-commerce admin console showing the orders management view',
    imagePosition: 'top left',
    imageSrc: '/assets/projects/jinni/jinni_admin.png',
    name: 'E-commerce Admin Console',
    tags: ['Vite', 'PostgreSQL', 'TanStack'],
  },
  {
    description:
      'Native, local-only slide-over web panel and notepad for macOS, keeping favourite sites and Markdown notes one hover or hotkey away.',
    imageAlt: 'Ledge slide-over panel showing favourite websites and local notes on macOS',
    imagePosition: 'top right',
    imageSrc: '/assets/projects/ledge/ledge-panel.webp',
    link: 'https://github.com/brucez001/ledge',
    name: 'Ledge',
    tags: ['Open-source', 'macOS', 'SwiftUI'],
  },
  {
    description:
      'CMS-integrated article platform for publishing and managing content with performance and SEO as core product requirements.',
    imageAlt: 'CoinJar On/Offchain newsletter and article listing page',
    imageSrc: '/assets/projects/coinjar/cj_onoffchain.png',
    name: 'Blog Website',
    tags: ['Next.js', 'Strapi', 'CMS', 'SEO'],
  },
];
