import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';

interface MarkdownRendererProps {
  markdown: string;
}

export function MarkdownRawText({ markdown }: MarkdownRendererProps) {
  return (
    <div className='prose prose-gray max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted'>
      {markdown}
    </div>
  );
}
