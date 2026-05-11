import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: 'monthly',
      lastModified: new Date('2026-05-11'),
      priority: 1,
      url: 'https://brucezhu.dev',
    },
  ];
}
