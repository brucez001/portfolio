import './globals.css';
import type { Metadata } from 'next';
import { photo } from '/public/assets';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Bruce Zhu | Portfolio',
  description:
    "Hi 👋, welcome to Bruce's portfolio. I'm a full-stack software developer specialising in modern web technologies.",
  keywords: [
    'Bruce Zhu',
    'Full-Stack Developer',
    'React.js',
    'Web Development',
    'Mobile Development',
    'Freelancer',
  ],
  openGraph: {
    title: 'Bruce Zhu | Portfolio',
    description:
      "Hi 👋, welcome to Bruce's portfolio. I'm a full-stack software developer specialising in modern web technologies.",
    url: 'https://brucezhu.dev/',
    images: [
      {
        url: photo.src,
        width: 1200,
        height: 630,
        alt: 'Bruce Zhu Portfolio',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
