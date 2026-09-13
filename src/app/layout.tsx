import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/dm-serif-display/400-italic.css';
import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/500.css';
import '@fontsource/instrument-sans/600.css';
import { BackdropConstellation } from '@/app/components/BackdropConstellation';
import { ButtonRipple } from '@/app/components/ButtonRipple';
import './globals.css';
import './buttons.css';
import './hero.css';

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
    'Software Engineer Melbourne',
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
    title: 'Bruce Zhu - Software Engineer',
    type: 'website',
    url: 'https://brucezhu.dev',
  },
  title: {
    default: 'Bruce Zhu - Software Engineer',
    template: '%s - Bruce Zhu',
  },
  twitter: {
    card: 'summary_large_image',
    description: siteDescription,
    images: [openGraphImage],
    title: 'Bruce Zhu - Software Engineer',
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
  jobTitle: 'Software Engineer',
  name: 'Bruce Zhu',
  sameAs: ['https://github.com/brucez001', 'https://www.linkedin.com/in/bruce-zhu-01/'],
  url: 'https://brucezhu.dev',
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  initialScale: 1,
  themeColor: '#0c0e12',
  width: 'device-width',
};

const shouldLoadVercelTelemetry = process.env.VERCEL === '1';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="dark" lang="en-AU">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        <BackdropConstellation />
        <ButtonRipple />
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
