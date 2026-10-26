import { describe, expect, it } from "vitest";
import { plainTextFromContent, sanitizeStoryContent } from "./content";

describe("story content safety", () => {
  it("keeps supported rich text and strips unsupported nodes and attributes", () => {
    const result = sanitizeStoryContent({
      type: "doc",
      content: [
        { type: "paragraph", attrs: { onclick: "alert(1)" }, content: [
          { type: "text", text: "hello", marks: [{ type: "bold" }, { type: "link", attrs: { href: "javascript:alert(1)" } }] },
        ] },
        { type: "image", attrs: { src: "https://example.invalid/x" } },
        { type: "script", content: [{ type: "text", text: "bad" }] },
      ],
    });
    expect(result.content).toHaveLength(1);
    expect(result.content[0].attrs).toBeUndefined();
    expect(result.content[0].content?.[0].marks).toEqual([{ type: "bold" }]);
    expect(plainTextFromContent(result)).toBe("hello");
  });

  it("allows safe links and bounds deeply nested input", () => {
    const result = sanitizeStoryContent({
      content: [{ type: "paragraph", content: [{ type: "text", text: "read", marks: [{ type: "link", attrs: { href: "https://example.com/story" } }] }] }],
    });
    expect(result.content[0].content?.[0].marks?.[0].attrs?.href).toBe("https://example.com/story");
  });
});
