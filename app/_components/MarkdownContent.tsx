"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

export default function MarkdownContent({
  content,
  className,
}: MarkdownContentProps) {
  return (
    <div className={className} style={{ color: "var(--text-secondary)" }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
