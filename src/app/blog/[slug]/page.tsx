import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navigation } from '@/app/components/Navigation';
import { navLinks } from '@/app/data';
import { getBlogPost, getBlogPosts, getPostHeadings, renderMarkdown } from '../blog-content';
import { ReadingProgress } from './ReadingProgress';

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

  const allPosts = getBlogPosts();
  const currentIndex = allPosts.findIndex((entry) => entry.slug === post.slug);
  const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const olderPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const headings = getPostHeadings(post.content);

  return (
    <>
      <Navigation links={navLinks} />
      <ReadingProgress />
      <main className="blog-shell blog-post-shell" id="main">
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
          <p className="blog-article-summary">{post.summary}</p>
          <div className="blog-tags" aria-label={`${post.title} tags`}>
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {post.coverImage ? (
            <div className="blog-cover">
              <Image
                alt={post.coverAlt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 860px"
                src={post.coverImage}
              />
            </div>
          ) : null}
        </header>

        <div className="blog-article-layout">
          <article className="blog-article">
            <div className="blog-prose">{renderMarkdown(post.content)}</div>

            <footer className="blog-article-footer">
              <div className="blog-article-footer-tags">
                <span className="blog-article-footer-label">Filed under</span>
                <div className="blog-tags" aria-label={`${post.title} tags`}>
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <Link className="blog-article-footer-back" href="/blog">
                <ArrowLeft aria-hidden="true" />
                All posts
              </Link>
            </footer>

            {newerPost || olderPost ? (
              <nav className="blog-pager" aria-label="Other posts">
                {olderPost ? (
                  <Link className="blog-pager-link blog-pager-prev" href={`/blog/${olderPost.slug}`}>
                    <span className="blog-pager-label">
                      <ArrowLeft aria-hidden="true" /> Previous
                    </span>
                    <span className="blog-pager-title">{olderPost.title}</span>
                  </Link>
                ) : (
                  <span />
                )}
                {newerPost ? (
                  <Link className="blog-pager-link blog-pager-next" href={`/blog/${newerPost.slug}`}>
                    <span className="blog-pager-label">
                      Next <ArrowUpRight aria-hidden="true" />
                    </span>
                    <span className="blog-pager-title">{newerPost.title}</span>
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </article>

          {headings.length > 1 ? (
            <aside className="blog-toc" aria-label="Table of contents">
              <p className="blog-toc-title">In this post</p>
              <ol>
                {headings.map((heading) => (
                  <li className={`blog-toc-item blog-toc-h${heading.level}`} key={heading.id}>
                    <a href={`#${heading.id}`}>{heading.text}</a>
                  </li>
                ))}
              </ol>
            </aside>
          ) : null}
        </div>
      </main>
    </>
  );
}
