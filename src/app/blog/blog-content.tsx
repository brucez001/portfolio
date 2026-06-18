import fs from 'node:fs';
import path from 'node:path';
import type { ReactNode } from 'react';
import { Info, Lightbulb, OctagonAlert, TriangleAlert } from 'lucide-react';
import Image from 'next/image';

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

export type HeadingEntry = {
  id: string;
  level: 2 | 3;
  text: string;
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

type CalloutVariant = 'important' | 'note' | 'tip' | 'warning';

type MarkdownBlock =
  | { language: string; text: string; type: 'code' }
  | { level: 1 | 2 | 3; text: string; type: 'heading' }
  | { items: string[]; ordered: boolean; type: 'list' }
  | { alt: string; src: string; type: 'image' }
  | { text: string; type: 'paragraph' }
  | { text: string; type: 'quote' }
  | { lines: string[]; title: string; type: 'callout'; variant: CalloutVariant }
  | { type: 'divider' };

const calloutKeywords: Record<string, CalloutVariant> = {
  CAUTION: 'warning',
  IMPORTANT: 'important',
  NOTE: 'note',
  TIP: 'tip',
  WARNING: 'warning',
};

const calloutDefaults: Record<CalloutVariant, string> = {
  important: 'Important',
  note: 'Note',
  tip: 'Tip',
  warning: 'Warning',
};

const calloutIcons: Record<CalloutVariant, typeof Info> = {
  important: OctagonAlert,
  note: Info,
  tip: Lightbulb,
  warning: TriangleAlert,
};

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

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function parseMarkdownBlocks(content: string): MarkdownBlock[] {
  const lines = content.split('\n');
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (line === '') {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const language = line.replace(/^```/, '').trim();
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push({ language, text: codeLines.join('\n'), type: 'code' });
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line)) {
      blocks.push({ type: 'divider' });
      index += 1;
      continue;
    }

    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      blocks.push({ alt: imageMatch[1], src: imageMatch[2], type: 'image' });
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

    if (line.startsWith('>')) {
      const quoteLines: string[] = [];
      while (lines[index]?.trim().startsWith('>')) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''));
        index += 1;
      }

      const firstLine = quoteLines[0] ?? '';
      const calloutMatch = firstLine.match(/^\[!([A-Z]+)\]\s*(.*)$/);
      if (calloutMatch && calloutKeywords[calloutMatch[1]]) {
        const variant = calloutKeywords[calloutMatch[1]];
        const explicitTitle = calloutMatch[2].trim();
        const bodyLines = quoteLines.slice(1);
        const paragraphs: string[] = [];
        let buffer: string[] = [];
        for (const bodyLine of bodyLines) {
          if (bodyLine.trim() === '') {
            if (buffer.length) {
              paragraphs.push(buffer.join(' '));
              buffer = [];
            }
            continue;
          }
          buffer.push(bodyLine);
        }
        if (buffer.length) paragraphs.push(buffer.join(' '));

        blocks.push({
          lines: paragraphs,
          title: explicitTitle || calloutDefaults[variant],
          type: 'callout',
          variant,
        });
        continue;
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
    while (
      lines[index]?.trim() &&
      !/^(#{1,3})\s+/.test(lines[index].trim()) &&
      !lines[index].trim().startsWith('>') &&
      !lines[index].trim().startsWith('- ') &&
      !/^\d+\.\s+/.test(lines[index].trim()) &&
      !lines[index].trim().startsWith('```') &&
      !/^(-{3,}|\*{3,})$/.test(lines[index].trim()) &&
      !/^!\[([^\]]*)\]\(([^)]+)\)$/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ text: paragraphLines.join(' '), type: 'paragraph' });
  }

  return blocks;
}

type InlineToken =
  | { href: string; text: string; type: 'link' }
  | { text: string; type: 'bold' }
  | { text: string; type: 'code' }
  | { text: string; type: 'italic' }
  | { text: string; type: 'text' };

function tokenizeInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let cursor = 0;

  const patterns: Array<{ make: (match: RegExpExecArray) => InlineToken; regex: RegExp }> = [
    {
      make: (match) => ({ text: match[1], type: 'code' }),
      regex: /`([^`]+)`/y,
    },
    {
      make: (match) => ({ href: match[2], text: match[1], type: 'link' }),
      regex: /\[([^\]]+)\]\(([^)]+)\)/y,
    },
    {
      make: (match) => ({ href: match[1], text: match[1], type: 'link' }),
      regex: /(https?:\/\/[^\s)<>]+)/y,
    },
    {
      make: (match) => ({ text: match[1], type: 'bold' }),
      regex: /\*\*([^*]+)\*\*/y,
    },
    {
      make: (match) => ({ text: match[1], type: 'italic' }),
      regex: /\*([^*\n]+)\*/y,
    },
    {
      make: (match) => ({ text: match[1], type: 'italic' }),
      regex: /_([^_\n]+)_/y,
    },
  ];

  while (cursor < text.length) {
    let earliest: { length: number; start: number; token: InlineToken } | null = null;

    for (const { make, regex } of patterns) {
      regex.lastIndex = 0;
      const searchRegex = new RegExp(regex.source, regex.flags.replace('y', 'g'));
      searchRegex.lastIndex = cursor;
      const match = searchRegex.exec(text);
      if (!match) continue;
      if (earliest === null || match.index < earliest.start) {
        earliest = { length: match[0].length, start: match.index, token: make(match) };
      }
    }

    if (earliest === null) {
      tokens.push({ text: text.slice(cursor), type: 'text' });
      break;
    }

    if (earliest.start > cursor) {
      tokens.push({ text: text.slice(cursor, earliest.start), type: 'text' });
    }
    tokens.push(earliest.token);
    cursor = earliest.start + earliest.length;
  }

  return tokens;
}

function renderInlineText(text: string, keyPrefix = 'inline'): ReactNode {
  const tokens = tokenizeInline(text);

  return tokens.map((token, index) => {
    const key = `${keyPrefix}-${index}`;

    if (token.type === 'text') return token.text;
    if (token.type === 'bold') return <strong key={key}>{token.text}</strong>;
    if (token.type === 'italic') return <em key={key}>{token.text}</em>;
    if (token.type === 'code') return <code key={key}>{token.text}</code>;
    if (token.type === 'link') {
      const isExternal = /^https?:\/\//.test(token.href);
      return (
        <a
          href={token.href}
          key={key}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          target={isExternal ? '_blank' : undefined}
        >
          {token.text}
        </a>
      );
    }
    return null;
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

export function getPostHeadings(content: string): HeadingEntry[] {
  const headings: HeadingEntry[] = [];
  const seen = new Map<string, number>();

  for (const block of parseMarkdownBlocks(content)) {
    if (block.type !== 'heading') continue;
    if (block.level === 1) continue;

    const baseId = slugifyHeading(block.text) || 'section';
    const count = seen.get(baseId) ?? 0;
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
    seen.set(baseId, count + 1);

    headings.push({ id, level: block.level, text: block.text });
  }

  return headings;
}

export function renderMarkdown(content: string): ReactNode {
  const blocks = parseMarkdownBlocks(content);
  const seenHeadingIds = new Map<string, number>();

  return blocks.map((block, index) => {
    const key = `${block.type}-${index}`;

    if (block.type === 'heading') {
      if (block.level === 1) return null;

      const baseId = slugifyHeading(block.text) || 'section';
      const count = seenHeadingIds.get(baseId) ?? 0;
      const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
      seenHeadingIds.set(baseId, count + 1);

      const inner = (
        <>
          <a aria-hidden="true" className="blog-prose-anchor" href={`#${id}`} tabIndex={-1}>
            #
          </a>
          {renderInlineText(block.text, key)}
        </>
      );

      if (block.level === 2) {
        return (
          <h2 className="blog-prose-h2" id={id} key={key}>
            {inner}
          </h2>
        );
      }
      return (
        <h3 className="blog-prose-h3" id={id} key={key}>
          {inner}
        </h3>
      );
    }

    if (block.type === 'divider') {
      return <hr className="blog-prose-divider" key={key} />;
    }

    if (block.type === 'image') {
      return (
        <figure className="blog-prose-figure" key={key}>
          <Image
            alt={block.alt}
            className="blog-prose-image"
            height={1080}
            sizes="(max-width: 900px) 100vw, 720px"
            src={block.src}
            width={1920}
          />
          {block.alt ? <figcaption>{block.alt}</figcaption> : null}
        </figure>
      );
    }

    if (block.type === 'quote') {
      return (
        <blockquote className="blog-prose-quote" key={key}>
          <p>{renderInlineText(block.text, key)}</p>
        </blockquote>
      );
    }

    if (block.type === 'callout') {
      const Icon = calloutIcons[block.variant];
      return (
        <aside
          className={`blog-prose-callout blog-prose-callout-${block.variant}`}
          key={key}
          role="note"
        >
          <div className="blog-prose-callout-head">
            <Icon aria-hidden="true" className="blog-prose-callout-icon" />
            <span className="blog-prose-callout-title">{block.title}</span>
          </div>
          <div className="blog-prose-callout-body">
            {block.lines.map((paragraph, paragraphIndex) => (
              <p key={`${key}-p-${paragraphIndex}`}>
                {renderInlineText(paragraph, `${key}-p-${paragraphIndex}`)}
              </p>
            ))}
          </div>
        </aside>
      );
    }

    if (block.type === 'code') {
      return (
        <pre className="blog-prose-code" data-language={block.language || undefined} key={key}>
          <code>{block.text}</code>
        </pre>
      );
    }

    if (block.type === 'list') {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag className={block.ordered ? 'blog-prose-ol' : 'blog-prose-ul'} key={key}>
          {block.items.map((item, itemIndex) => (
            <li key={`${key}-li-${itemIndex}`}>{renderInlineText(item, `${key}-li-${itemIndex}`)}</li>
          ))}
        </ListTag>
      );
    }

    return (
      <p key={key}>
        {renderInlineText(block.text, key)}
      </p>
    );
  });
}
