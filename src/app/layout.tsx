import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/dm-serif-display/400-italic.css';
import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/500.css';
import '@fontsource/instrument-sans/600.css';
import './globals.css';

const siteDescription =
  'Bruce Zhu is a Melbourne software developer building fast, reliable web, mobile, Web3, and supply-chain products.';

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
    images: [
      {
        alt: 'Bruce Zhu portfolio',
        height: 630,
        url: '/assets/photo.png',
        width: 1200,
      },
    ],
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
    images: ['/assets/photo.png'],
    title: 'Bruce Zhu - Software Developer',
  },
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
    <html data-theme="dark" lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
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
