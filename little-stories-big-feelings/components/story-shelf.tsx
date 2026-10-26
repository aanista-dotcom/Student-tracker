"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Story } from "@/lib/types";
import { StoryCard } from "@/components/story-card";

export function StoryShelf({ stories }: { stories: Story[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All stories");
  const categories = useMemo(() => ["All stories", ...new Set(stories.map((story) => story.category).filter(Boolean))], [stories]);
  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return stories.filter((story) => {
      const matchesCategory = category === "All stories" || story.category === category;
      const matchesSearch = !normalized || [story.title, story.excerpt, story.category, ...story.tags].join(" ").toLowerCase().includes(normalized);
      return matchesCategory && matchesSearch;
    });
  }, [stories, query, category]);

  return (
    <>
      <div className="shelf-controls">
        <label className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a story or feeling…" aria-label="Search stories" /></label>
        <div className="category-row" aria-label="Story categories"><SlidersHorizontal size={15} />{categories.map((item) => <button key={item} className={`category-chip ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
      </div>
      {visible.length ? <div className="story-grid">{visible.map((story) => <StoryCard key={story.id} story={story} />)}</div> : <div className="empty-state"><span className="tiny-flower">✳</span><h2>Nothing here just yet.</h2><p>Try another word, or come back when there’s a new story.</p></div>}
    </>
  );
}
