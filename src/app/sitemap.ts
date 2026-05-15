import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/app/blog/blog-content';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getBlogPosts().map((post) => ({
    changeFrequency: 'monthly' as const,
    lastModified: new Date(),
    priority: 0.6,
    url: `https://brucezhu.dev/blog/${post.slug}`,
  }));

  return [
    {
      changeFrequency: 'monthly',
      lastModified: new Date(),
      priority: 1,
      url: 'https://brucezhu.dev',
    },
    {
      changeFrequency: 'monthly',
      lastModified: new Date(),
      priority: 0.7,
      url: 'https://brucezhu.dev/blog',
    },
    ...blogPosts,
  ];
}
