import type { ReactNode } from "react";

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

export function linkifyText(text: string): ReactNode[] {
  const parts = text.split(URL_PATTERN);

  return parts.map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      const href = part.replace(/[.,;:!?)]+$/, "");
      const trailing = part.slice(href.length);
      return (
        <span key={`${index}-${href}`}>
          <a className="document-inline-link" href={href} target="_blank" rel="noreferrer">
            {href}
          </a>
          {trailing}
        </span>
      );
    }

    return <span key={`${index}-text`}>{part}</span>;
  });
}
