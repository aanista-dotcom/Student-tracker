import type { StoryContent, RichTextNode } from "@/lib/types";

const allowedMarks = new Set(["bold", "italic", "strike", "code", "link"]);
const allowedBlocks = new Set([
  "paragraph", "heading", "blockquote", "bulletList", "orderedList", "listItem",
  "horizontalRule", "hardBreak",
]);

function safeLink(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  try {
    const parsed = new URL(raw);
    if (["https:", "http:", "mailto:"].includes(parsed.protocol)) return raw;
  } catch {
    if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  }
  return null;
}

export function sanitizeStoryContent(input: unknown): StoryContent {
  const root = input && typeof input === "object" ? input as RichTextNode : {};
  let remainingText = 20_000;
  const cleanNode = (node: RichTextNode, depth = 0): RichTextNode | null => {
    if (depth > 24 || typeof node.type !== "string") return null;
    if (node.type === "text") {
      if (typeof node.text !== "string") return null;
      const text = node.text.slice(0, remainingText);
      remainingText -= text.length;
      const marks = (Array.isArray(node.marks) ? node.marks : []).flatMap((mark) => {
        if (!mark || !allowedMarks.has(String(mark.type))) return [];
        if (mark.type === "link") {
          const href = safeLink(mark.attrs?.href);
          return href ? [{ type: "link", attrs: { href } }] : [];
        }
        return [{ type: mark.type }];
      });
      return { type: "text", text, ...(marks.length ? { marks } : {}) };
    }
    if (node.type === "image") return null;
    if (!allowedBlocks.has(node.type)) return null;
    const attrs: Record<string, unknown> = {};
    if (node.type === "heading") {
      const level = Number(node.attrs?.level);
      attrs.level = [2, 3].includes(level) ? level : 2;
    }
    const content = (Array.isArray(node.content) ? node.content : [])
      .slice(0, 800)
      .flatMap((child) => {
        const result = cleanNode(child, depth + 1);
        return result ? [result] : [];
      });
    return { type: node.type, ...(Object.keys(attrs).length ? { attrs } : {}), ...(content.length ? { content } : {}) };
  };

  const content = (Array.isArray(root.content) ? root.content : [])
    .slice(0, 1_000)
    .flatMap((node) => {
      const result = cleanNode(node);
      return result ? [result] : [];
    });
  return { type: "doc", content };
}

export function plainTextFromContent(content: StoryContent): string {
  const read = (node: RichTextNode): string =>
    `${node.text ?? ""}${(node.content ?? []).map(read).join(" ")}`;
  return content.content.map(read).join(" ").replace(/\s+/g, " ").trim();
}
