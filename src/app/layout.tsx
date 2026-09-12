import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/dm-serif-display/400-italic.css';
import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/500.css';
import '@fontsource/instrument-sans/600.css';
import { BackdropConstellation } from '@/app/components/BackdropConstellation';
import './globals.css';

const siteDescription =
  'Building at the edge of curiosity, design, and software systems.';

const openGraphImage = {
  alt: 'Bruce Zhu portfolio',
  height: 630,
  url: '/og-image.png',
  width: 1200,
};

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Bruce Zhu' }],
  description: siteDescription,
  keywords: [
    'Bruce Zhu',
    'Software Developer Melbourne',
    'Next.js Developer',
    'React Developer',
    'Web3 Developer',
    'React Native Developer',
    'Full-stack Developer',
  ],
  metadataBase: new URL('https://brucezhu.dev'),
  openGraph: {
    description: siteDescription,
    images: [openGraphImage],
    locale: 'en_AU',
    siteName: 'Bruce Zhu',
    title: 'Bruce Zhu - Software Developer',
    type: 'website',
    url: 'https://brucezhu.dev',
  },
  title: {
    default: 'Bruce Zhu - Software Developer',
    template: '%s - Bruce Zhu',
  },
  twitter: {
    card: 'summary_large_image',
    description: siteDescription,
    images: [openGraphImage],
    title: 'Bruce Zhu - Software Developer',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AU',
    addressLocality: 'Melbourne',
  },
  image: 'https://brucezhu.dev/assets/photo.png',
  jobTitle: 'Software Developer',
  name: 'Bruce Zhu',
  sameAs: ['https://github.com/Bruce-zzhu', 'https://www.linkedin.com/in/bruce-zhu-01/'],
  url: 'https://brucezhu.dev',
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  initialScale: 1,
  themeColor: [
    { color: '#0c0e12', media: '(prefers-color-scheme: dark)' },
    { color: '#f8f7f4', media: '(prefers-color-scheme: light)' },
  ],
  width: 'device-width',
};

const themeScript = `
(() => {
  try {
    const saved = localStorage.getItem('theme');
    document.documentElement.dataset.theme = saved === 'light' ? 'light' : 'dark';
  } catch {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

const shouldLoadVercelTelemetry = process.env.VERCEL === '1';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="dark" lang="en-AU" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        <BackdropConstellation />
        {children}
        {shouldLoadVercelTelemetry ? (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        ) : null}
      </body>
    </html>
  );
}
