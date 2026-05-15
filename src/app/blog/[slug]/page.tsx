import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navigation } from '@/app/components/Navigation';
import { navLinks } from '@/app/data';
import { getBlogPost, getBlogPosts, renderMarkdown } from '../blog-content';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Blog',
    };
  }

  return {
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    description: post.summary,
    title: post.title,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navigation links={navLinks} />
      <main className="blog-shell blog-post-shell" id="main">
        <article className="blog-article">
          <Link className="blog-back-link" href="/blog">
            <ArrowLeft aria-hidden="true" />
            Back to blog
          </Link>
          <header className="blog-article-header">
            <div className="blog-card-meta">
              <span>{post.displayDate}</span>
              <span>{post.readingTime}</span>
            </div>
            <h1>{post.title}</h1>
            <p>{post.summary}</p>
            <div className="blog-tags" aria-label={`${post.title} tags`}>
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {post.coverImage ? (
              <div className="blog-cover">
                <Image alt={post.coverAlt} fill priority sizes="(max-width: 900px) 100vw, 860px" src={post.coverImage} />
              </div>
            ) : null}
          </header>
          <div className="blog-prose">{renderMarkdown(post.content)}</div>
        </article>
      </main>
    </>
  );
}
