import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/app/components/Navigation';
import { navLinks } from '@/app/data';
import { getBlogPosts } from './blog-content';

export const metadata: Metadata = {
  alternates: {
    canonical: '/blog',
  },
  description: 'Small blog posts and project stories from Bruce Zhu.',
  title: 'Blog',
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <>
      <Navigation links={navLinks} />
      <main className="blog-shell" id="main">
        <section className="blog-index-hero">
          <p className="section-label">Blog</p>
          <h1>My blocks.</h1>
          <p>
            A few short stories behind the things I build: tiny automations, workflow experiments, and practical
            ideas that made life slightly easier and fun.
          </p>
        </section>

        <section className="blog-list" aria-label="Blog posts">
          {posts.map((post) => (
            <Link className="blog-card" href={`/blog/${post.slug}`} key={post.slug}>
              {post.coverImage ? (
                <div className="blog-card-cover">
                  <Image alt={post.coverAlt} fill sizes="(max-width: 768px) 100vw, 360px" src={post.coverImage} />
                </div>
              ) : null}
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span>{post.displayDate}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
                <div className="blog-tags" aria-label={`${post.title} tags`}>
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
