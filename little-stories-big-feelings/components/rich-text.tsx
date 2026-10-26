import type { ReactNode } from "react";
import type { RichTextNode, StoryContent } from "@/lib/types";

function renderText(node: RichTextNode, key: string): ReactNode {
  let result: ReactNode = node.text ?? "";
  for (const [index, mark] of (node.marks ?? []).entries()) {
    if (mark.type === "bold") result = <strong key={`${key}-b${index}`}>{result}</strong>;
    else if (mark.type === "italic") result = <em key={`${key}-i${index}`}>{result}</em>;
    else if (mark.type === "strike") result = <s key={`${key}-s${index}`}>{result}</s>;
    else if (mark.type === "code") result = <code key={`${key}-c${index}`}>{result}</code>;
    else if (mark.type === "link") {
      const href = typeof mark.attrs?.href === "string" ? mark.attrs.href : "";
      if (/^(https?:|mailto:|\/(?!\/))/.test(href)) {
        result = <a href={href} key={`${key}-a${index}`} rel={href.startsWith("http") ? "noreferrer" : undefined}>{result}</a>;
      }
    }
  }
  return result;
}

function renderNode(node: RichTextNode, key: string): ReactNode {
  if (node.type === "text") return renderText(node, key);
  const children = (node.content ?? []).map((child, index) => renderNode(child, `${key}-${index}`));
  switch (node.type) {
    case "paragraph": return <p key={key}>{children}</p>;
    case "heading": return Number(node.attrs?.level) === 3 ? <h3 key={key}>{children}</h3> : <h2 key={key}>{children}</h2>;
    case "blockquote": return <blockquote key={key}>{children}</blockquote>;
    case "bulletList": return <ul key={key}>{children}</ul>;
    case "orderedList": return <ol key={key}>{children}</ol>;
    case "listItem": return <li key={key}>{children}</li>;
    case "hardBreak": return <br key={key} />;
    case "horizontalRule": return <hr key={key} />;
    default: return null;
  }
}

export function RichText({ content }: { content: StoryContent }) {
  return <div className="story-body">{(content.content ?? []).map((node, index) => renderNode(node, String(index)))}</div>;
}
