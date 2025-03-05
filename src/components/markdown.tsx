import ReactMarkdown from 'react-markdown';

interface MarkdownProps {
  content: string;
}

function Markdown({ content }: MarkdownProps) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
}

export { Markdown };
