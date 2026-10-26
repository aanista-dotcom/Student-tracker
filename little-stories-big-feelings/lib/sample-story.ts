import type { Story } from "@/lib/types";

export const SAMPLE_STORY: Story = {
  id: "1d55441c-1694-4aed-9dc7-918955010001",
  slug: "the-blue-cup-on-the-windowsill",
  title: "The blue cup on the windowsill",
  excerpt:
    "A little story about a chipped cup, a slow morning, and learning to let the day arrive at its own pace.",
  category: "Small moments",
  tags: ["morning", "home", "sample"],
  cover_path: null,
  cover_url: null,
  story_date: "2026-10-25",
  published_at: "2026-10-25T08:00:00.000Z",
  is_sample: true,
  content: {
    type: "doc",
    content: [
      { type: "paragraph", content: [{ type: "text", text: "The blue cup has a small chip near its handle. I know exactly where it is because my thumb finds it every morning, before I have properly woken up." }] },
      { type: "paragraph", content: [{ type: "text", text: "Today I set it on the windowsill while the kettle boiled. Outside, the street was still deciding what sort of day it wanted to be. A bicycle went past without hurry. Someone upstairs opened a window. The light rested on the rooftops like a hand." }] },
      { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "A small pause" }] },
      { type: "paragraph", content: [{ type: "text", text: "I had been trying to get ahead of the morning: answering messages in my head, rehearsing conversations, counting the things that needed doing. Then the tea cooled just enough to drink, and I remembered there was only this cup, this window, this breath." }] },
      { type: "paragraph", content: [{ type: "text", text: "Nothing important changed. The list was still there. But for a minute I let the day come to me instead of running out to meet it." }] },
      { type: "blockquote", content: [{ type: "paragraph", content: [{ type: "text", text: "Maybe a gentler beginning is still a beginning." }] }] },
      { type: "paragraph", content: [{ type: "text", text: "I picked up the cup, careful of the chip, and carried it with me. The morning had arrived. That was enough." }] },
    ],
  },
};
