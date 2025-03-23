"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { styled } from '@mui/material/styles';

interface MDXRendererProps {
  content: string;
  className?: string;
}

const MarkdownContainer = styled('div')(({ theme }) => ({
  width: '100%',

  '& h1': {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    marginTop: '1.5rem',
  },
  '& h2': {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    marginTop: '1.25rem',
  },
  '& h3': {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    marginTop: '1rem',
  },
  '& p': {
    marginBottom: '1rem',
    lineHeight: '1.7',
  },
  '& ul, & ol': {
    marginLeft: '2rem',
    marginBottom: '1rem',
  },
  '& li': {
    marginBottom: '0.5rem',
  },
  '& blockquote': {
    borderLeft: `4px solid ${theme.palette.grey[300]}`,
    paddingLeft: '1rem',
    fontStyle: 'italic',
    margin: '1rem 0',
  },
  '& img': {
    display: 'block',
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
    margin: '1rem 0',
    border: `1px solid ${theme.figma.neutral[80]}`,
  },
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  '& hr': {
    border: 0,
    height: '1px',
    backgroundColor: theme.palette.divider,
    margin: '2rem 0',
  },
  '& code': {
    backgroundColor: theme.palette.grey[100],
    padding: '0.2rem 0.4rem',
    borderRadius: '4px',
    fontFamily: 'monospace',
  },
  '& pre': {
    backgroundColor: theme.palette.grey[100],
    padding: '1rem',
    borderRadius: '8px',
    overflowX: 'auto',
    marginBottom: '1rem',
    '& code': {
      backgroundColor: 'transparent',
      padding: 0,
    },
  },
}));

const MDXRenderer: React.FC<MDXRendererProps> = ({ content, className }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Process content to handle newlines
  const processedContent = content.replace(/\n/g, '  \n');

  // 在伺服器端渲染時不顯示內容，避免 hydration 錯誤
  if (!mounted) {
    return <div className={className}></div>;
  }

  const MarkdownComponents = {
    // 自定義圖片渲染，使用 Next.js 的 Image 元件 (可選)
    img: ({ node, ...props }) => {
      const { src, alt, width, height } = props;
      // 使用 next/image 時如果是外部圖片，需要在 next.config.js 配置 domains
      // 這裡提供一個簡單版本，實際使用可能需要調整
      if (src && src.startsWith('http')) {
        return (
          <Image
            src={src}
            alt={alt || ''}
            width={width || 656} // Provide a default width if not specified
            height={height || 359} // Provide a default height if not specified
          />
        );
      }
      return (
        <Image
          src={props.src || ''}
          alt={props.alt || ''}
          width={props.width || 656}
          height={props.height || 359}
        />
      );
    },
    // 可以根據需要添加更多自定義元件
  };

  return (
    <MarkdownContainer className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // 支援 GitHub Flavored Markdown
        rehypePlugins={[rehypeRaw]} // 支援 HTML 標籤
        components={MarkdownComponents}
      >
        {processedContent}
      </ReactMarkdown>
    </MarkdownContainer>
  );
};

export default MDXRenderer;