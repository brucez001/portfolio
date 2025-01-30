import {
  mobile,
  backend,
  creator,
  web,
  typescript,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  figma,
  docker,
  coinjar,
  itrazo,
  unimelb,
  aws,
  firebase,
  graphql,
  redis,
  ios,
  android,
  itrazo_adi,
  fc,
  cj_learn,
} from '/public/assets';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'experience',
    title: 'Experience',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Website SEO',
    icon: web,
  },
  {
    title: 'Content Management System',
    icon: mobile,
  },
  {
    title: 'Web App Development',
    icon: backend,
  },
  {
    title: 'Mobile App Development',
    icon: creator,
  },
];

const technologies = [
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'IOS',
    icon: ios,
  },
  {
    name: 'Android',
    icon: android,
  },
  {
    name: 'AWS',
    icon: aws,
  },
  {
    name: 'Firebase',
    icon: firebase,
  },

  {
    name: 'GrahQL',
    icon: graphql,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },

  {
    name: 'MongoDB',
    icon: mongodb,
  },
  {
    name: 'Redis',
    icon: redis,
  },
  {
    name: 'figma',
    icon: figma,
  },
  {
    name: 'docker',
    icon: docker,
  },
];

const experiences = [
  {
    title: 'Software Developer',
    company_name: 'CoinJar',
    icon: coinjar,
    iconBg: '#fff',
    date: 'May 2024 - Present',
    points: [
      'Developed Web3 products across iOS, Android, and web platforms',
      'Optimised website performance and enhanced SEO for better search engine visibility',
      'Managed CI/CD pipelines, conducted software testing, and implemented monitoring solutions',
    ],
  },
  {
    title: 'Software Developer',
    company_name: 'iTrazo Tracetech',
    icon: itrazo,
    iconBg: '#1F1F1F',
    date: 'May 2022 - May 2024',
    points: [
      'Implemented supply chain technology solutions for the transportation and agriculture sectors',
      'Developed products such as CRM, inventory management, order tracking systems, and e-commerce platforms',
      'Architected and developed user-friendly web application interfaces to enhance user experience',
    ],
  },
  {
    title: 'CS Student',
    company_name: 'University of Melbourne',
    icon: unimelb,
    iconBg: '#000F45',
    date: '2020 - 2022',
    points: [
      'Majored in Computer Science and Software Engineering',
      'Won multiple Hackathon coding competition awards',
      'Served as a committee member in multiple IT clubs and mentored first-year students',
    ],
  },
];

const testimonials = [
  {
    testimonial:
      'I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.',
    name: 'Sara Lee',
    designation: 'CFO',
    company: 'Acme Co',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: 'Chris Brown',
    designation: 'COO',
    company: 'DEF Corp',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: 'Lisa Wang',
    designation: 'CTO',
    company: '456 Enterprises',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
];

const projects = [
  {
    name: 'iTrazo ADI',
    description:
      'Supply chain management platform integrating advanced real-time asset tracking, inventory management, and CRM to optimise traceability and efficiency',
    tags: [
      {
        name: 'React.js',
        color: 'blue-text-gradient',
      },
      {
        name: 'AWS',
        color: 'green-text-gradient',
      },
      {
        name: 'Real-time & Map',
        color: 'pink-text-gradient',
      },
    ],
    image: itrazo_adi,
    imgAlignment: 'object-left',
    source_code_link: 'https://github.com/',
  },
  {
    name: 'Freight Cyber',
    description:
      'Freight and logistics management solution that allows businesses to manage drivers and subcontractors, optimise job routing and scheduling, and streamline business operations',
    tags: [
      {
        name: 'React.js',
        color: 'blue-text-gradient',
      },
      {
        name: 'AWS',
        color: 'green-text-gradient',
      },
      {
        name: 'Routing Optimisation',
        color: 'pink-text-gradient',
      },
    ],
    image: fc,
    imgAlignment: 'object-center',
    source_code_link: 'https://github.com/',
  },
  {
    name: 'Blog Website',
    description:
      'Article/blog website integrated with a Content Management System that allows admin users to customise contents and share to the public',
    tags: [
      {
        name: 'Next.js',
        color: 'blue-text-gradient',
      },
      {
        name: 'Strapi',
        color: 'green-text-gradient',
      },
      {
        name: 'SEO',
        color: 'pink-text-gradient',
      },
    ],
    image: cj_learn,
    imgAlignment: 'object-top',
    source_code_link: 'https://github.com/',
  },
];

export { services, technologies, experiences, testimonials, projects };
