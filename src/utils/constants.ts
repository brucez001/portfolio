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
    id: 'work',
    title: 'Work',
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
    title: 'React.js Developer',
    company_name: 'Starbucks',
    icon: starbucks,
    iconBg: '#383E56',
    date: 'March 2020 - April 2021',
    points: [
      'Developed Web3 products across iOS, Android, and web platforms',
      'Optimised website performance and enhanced SEO for better search engine visibility',
      'Managed CI/CD pipelines, conducted software testing, and implemented monitoring solutions',
    ],
  },
  {
    title: 'React Native Developer',
    company_name: 'Tesla',
    icon: tesla,
    iconBg: '#E6DEDD',
    date: 'Jan 2021 - Feb 2022',
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
  // {
  //   title: 'Full stack Developer',
  //   company_name: 'Meta',
  //   icon: meta,
  //   iconBg: '#E6DEDD',
  //   date: 'Jan 2023 - Present',
  //   points: [
  //     'Developing and maintaining web applications using React.js and other related technologies.',
  //     'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
  //     'Implementing responsive design and ensuring cross-browser compatibility.',
  //     'Participating in code reviews and providing constructive feedback to other developers.',
  //   ],
  // },
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
      'Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
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
      'Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'restapi',
        color: 'green-text-gradient',
      },
      {
        name: 'scss',
        color: 'pink-text-gradient',
      },
    ],
    image: fc,
    imgAlignment: 'object-center',
    source_code_link: 'https://github.com/',
  },
  {
    name: 'Article Website',
    description:
      'A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: cj_learn,
    imgAlignment: 'object-top',
    source_code_link: 'https://github.com/',
  },
];

export { services, technologies, experiences, testimonials, projects };
