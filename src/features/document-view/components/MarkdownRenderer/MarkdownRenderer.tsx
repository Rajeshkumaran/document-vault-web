import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';

interface MarkdownRendererProps {
  markdown: string;
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  return (
    <div className='prose prose-gray max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted'>
      <ReactMarkdown
        remarkPlugins={[remarkFrontmatter, remarkGfm]}
        components={{
          // Custom styling for code blocks
          code: ({ className, children, ...props }) => {
            const isInline = !className?.includes('language-');

            if (isInline) {
              return (
                <code className='bg-muted px-1 py-0.5 rounded text-sm font-mono' {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // Custom styling for links
          a: ({ href, children, ...props }) => {
            console.log('Link clicked:', href);
            return (
              <a
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-orange-400 hover:text-orange-600/80 underline underline-offset-4'
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
