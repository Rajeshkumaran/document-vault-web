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
          // Custom styling for tables
          table: ({ children, ...props }) => (
            <div className='overflow-x-auto my-6'>
              <table
                className='min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg'
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className='bg-gray-50' {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className='bg-white divide-y divide-gray-200' {...props}>
              {children}
            </tbody>
          ),
          tr: ({ children, ...props }) => (
            <tr className='hover:bg-gray-50' {...props}>
              {children}
            </tr>
          ),
          th: ({ children, ...props }) => (
            <th
              className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200'
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className='px-4 py-3 text-sm text-gray-900 border-b border-gray-200' {...props}>
              {children}
            </td>
          ),
          // Custom styling for unordered lists
          ul: ({ children, ...props }) => (
            <ul className='space-y-2 my-4 ml-6 list-disc marker:text-gray-400' {...props}>
              {children}
            </ul>
          ),
          // Custom styling for ordered lists
          ol: ({ children, ...props }) => (
            <ol className='space-y-2 my-4 ml-6 list-decimal marker:text-gray-400' {...props}>
              {children}
            </ol>
          ),
          // Custom styling for list items
          li: ({ children, ...props }) => (
            <li className='text-gray-700 leading-relaxed pl-2' {...props}>
              {children}
            </li>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
