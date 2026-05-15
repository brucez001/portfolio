import fs from 'node:fs';
import path from 'node:path';
import type { ReactNode } from 'react';

const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');

export type BlogPost = {
  content: string;
  coverAlt: string;
  coverImage: string;
  date: string;
  displayDate: string;
  readingTime: string;
  slug: string;
  status: string;
  summary: string;
  tags: string[];
  title: string;
};

type Frontmatter = {
  coverAlt: string;
  coverImage: string;
  date: string;
  slug: string;
  status: string;
  summary: string;
  tags: string[];
  title: string;
};

type MarkdownBlock =
  | { level: 1 | 2 | 3; text: string; type: 'heading' }
  | { items: string[]; ordered: boolean; type: 'list' }
  | { text: string; type: 'paragraph' }
  | { text: string; type: 'quote' };

function parseFrontmatter(markdown: string): { content: string; frontmatter: Frontmatter } {
  const [, rawFrontmatter = '', rawContent = markdown] = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];
  const lines = rawFrontmatter.split('\n');
  const values: Record<string, string | string[]> = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const keyValueMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!keyValueMatch) continue;

    const [, key, rawValue] = keyValueMatch;
    if (rawValue === '') {
      const items: string[] = [];
      while (lines[index + 1]?.startsWith('  - ')) {
        index += 1;
        items.push(lines[index].replace(/^  - /, '').trim());
      }
      values[key] = items;
      continue;
    }

    values[key] = rawValue.replace(/^"|"$/g, '');
  }

  return {
    content: rawContent.trim(),
    frontmatter: {
      coverAlt: String(values.coverAlt ?? ''),
      coverImage: String(values.coverImage ?? ''),
      date: String(values.date ?? ''),
      slug: String(values.slug ?? ''),
      status: String(values.status ?? 'draft'),
      summary: String(values.summary ?? ''),
      tags: Array.isArray(values.tags) ? values.tags : [],
      title: String(values.title ?? 'Untitled'),
    },
  };
}

function estimateReadingTime(content: string): string {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function formatDate(date: string): string {
  const parsedDate = new Date(`${date}T00:00:00Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
}

function parseMarkdownBlocks(content: string): MarkdownBlock[] {
  const lines = content.split('\n');
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (line === '') {
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        level: headingMatch[1].length as 1 | 2 | 3,
        text: headingMatch[2],
        type: 'heading',
      });
      index += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (lines[index]?.trim().startsWith('> ')) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push({ text: quoteLines.join(' '), type: 'quote' });
      continue;
    }

    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (lines[index]?.trim().startsWith('- ')) {
        items.push(lines[index].trim().replace(/^-\s+/, ''));
        index += 1;
      }
      blocks.push({ items, ordered: false, type: 'list' });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (/^\d+\.\s+/.test(lines[index]?.trim() ?? '')) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ''));
        index += 1;
      }
      blocks.push({ items, ordered: true, type: 'list' });
      continue;
    }

    const paragraphLines: string[] = [];
    while (lines[index]?.trim() && !/^(#{1,3})\s+/.test(lines[index].trim()) && !lines[index].trim().startsWith('> ') && !lines[index].trim().startsWith('- ') && !/^\d+\.\s+/.test(lines[index].trim())) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ text: paragraphLines.join(' '), type: 'paragraph' });
  }

  return blocks;
}

function renderInlineText(text: string): ReactNode {
  const urlRegex = /(https:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) => {
    if (!part.startsWith('https://')) {
      return part;
    }

    return (
      <a href={part} key={`${part}-${index}`} rel="noopener noreferrer" target="_blank">
        {part}
      </a>
    );
  });
}

export function getBlogPosts(): BlogPost[] {
  const filenames = fs.readdirSync(postsDirectory).filter((filename) => filename.endsWith('.md'));

  return filenames
    .map((filename) => {
      const markdown = fs.readFileSync(path.join(postsDirectory, filename), 'utf8');
      const { content, frontmatter } = parseFrontmatter(markdown);

      return {
        content,
        coverAlt: frontmatter.coverAlt,
        coverImage: frontmatter.coverImage,
        date: frontmatter.date,
        displayDate: formatDate(frontmatter.date),
        readingTime: estimateReadingTime(content),
        slug: frontmatter.slug,
        status: frontmatter.status,
        summary: frontmatter.summary,
        tags: frontmatter.tags,
        title: frontmatter.title,
      };
    })
    .sort((firstPost, secondPost) => secondPost.date.localeCompare(firstPost.date));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}

export function renderMarkdown(content: string): ReactNode {
  return parseMarkdownBlocks(content).map((block, index) => {
    const key = `${block.type}-${index}`;

    if (block.type === 'heading') {
      if (block.level === 1) return null;
      if (block.level === 2) return <h2 key={key}>{renderInlineText(block.text)}</h2>;
      return <h3 key={key}>{renderInlineText(block.text)}</h3>;
    }

    if (block.type === 'quote') {
      return <blockquote key={key}>{renderInlineText(block.text)}</blockquote>;
    }

    if (block.type === 'list') {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag key={key}>
          {block.items.map((item) => (
            <li key={item}>{renderInlineText(item)}</li>
          ))}
        </ListTag>
      );
    }

    return <p key={key}>{renderInlineText(block.text)}</p>;
  });
}
