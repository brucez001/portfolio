export type NavLink = {
  href: string;
  label: string;
};

export type Experience = {
  company: string;
  date: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
  role: string;
};

export type Project = {
  description: string;
  imageAlt: string;
  imageSrc: string;
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
    href: 'https://github.com/Bruce-zzhu',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/bruce-zhu-01/',
    label: 'LinkedIn',
  },
] as const;

export const highlights = [
  { label: 'Based in', value: 'Melbourne' },
  { label: 'Focus', value: 'Web, mobile, Web3' },
  { label: 'Current', value: 'CoinJar' },
] as const;

export const skills = [
  'React / Next.js',
  'TypeScript',
  'Node.js',
  'React Native',
  'AWS',
  'SEO',
  'CI/CD',
  'Web3',
  'Product UX',
  'Monitoring',
] as const;

export const services = [
  {
    title: 'Web Apps',
    description: 'Scalable interfaces with modern React architecture, clean state boundaries, and reliable performance.',
  },
  {
    title: 'Mobile',
    description: 'Cross-platform product experiences for iOS and Android using React Native.',
  },
  {
    title: 'Custom Websites',
    description: 'Fast, crawlable marketing and content sites with strong SEO foundations.',
  },
] as const;

export const experiences: Experience[] = [
  {
    company: 'CoinJar',
    date: 'May 2024 - Present',
    description:
      'Developing Web3 products across iOS, Android, and web. Optimising site performance and SEO, maintaining CI/CD pipelines, and improving monitoring workflows.',
    imageAlt: 'CoinJar Learn project screenshot',
    imageSrc: '/assets/projects/coinjar/cj_learn.png',
    role: 'Software Developer',
  },
  {
    company: 'iTrazo Tracetech',
    date: 'May 2022 - May 2024',
    description:
      'Built supply-chain technology for transport and agriculture, including CRM, inventory management, order tracking, and e-commerce systems.',
    imageAlt: 'iTrazo ADI supply chain platform screenshot',
    imageSrc: '/assets/projects/itrazo/itrazo_adi.png',
    role: 'Software Developer',
  },
  {
    company: 'University of Melbourne',
    date: '2020 - 2022',
    description:
      'Majored in Computer Science and Software Engineering, won hackathon awards, and mentored first-year students through IT club work.',
    imageAlt: 'University of Melbourne company mark',
    imageSrc: '/assets/company/unimelb.png',
    role: 'Computer Science Student',
  },
];

export const projects: Project[] = [
  {
    description:
      'Supply chain management platform with real-time asset tracking, inventory management, and integrated CRM for end-to-end traceability.',
    imageAlt: 'iTrazo ADI dashboard showing asset tracking and operations data',
    imageSrc: '/assets/projects/itrazo/itrazo_adi.png',
    name: 'iTrazo ADI',
    tags: ['React', 'AWS', 'Real-time', 'Maps'],
  },
  {
    description:
      'Logistics management solution for driver coordination, job routing, and streamlined business operations.',
    imageAlt: 'Freight Cyber logistics login and routing interface',
    imageSrc: '/assets/projects/fc/fc_login.png',
    name: 'Freight Cyber',
    tags: ['React', 'AWS', 'Routing'],
  },
  {
    description:
      'CMS-integrated article platform for publishing and managing content with performance and SEO as core product requirements.',
    imageAlt: 'CoinJar Learn content website screenshot',
    imageSrc: '/assets/projects/coinjar/cj_learn.png',
    name: 'Blog Website',
    tags: ['Next.js', 'Strapi', 'SEO'],
  },
];
