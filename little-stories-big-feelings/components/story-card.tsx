/* This site serves private images through its own authorization-checking route. */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import type { Story } from "@/lib/types";

export function formatStoryDate(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric", ...options }).format(new Date(`${date.slice(0, 10)}T12:00:00`));
}

export function StoryCard({ story, featured = false }: { story: Story; featured?: boolean }) {
  return (
    <article className={`story-card ${featured ? "story-card-featured" : ""}`}>
      <Link className="story-card-link" href={`/stories/${story.slug}`}>
        <div className={`story-art ${featured ? "story-art-large" : ""}`}>
          {story.cover_url ? <img src={story.cover_url} alt="" /> : <span className="story-art-orbit" aria-hidden="true" />}
          <span className="art-caption">A moment kept</span>
        </div>
        <div className="card-meta"><span>{story.category || "Journal"}</span><span className="meta-dot">·</span><time dateTime={story.story_date}>{formatStoryDate(story.story_date, { year: undefined })}</time></div>
        {story.is_sample && <span className="sample-label">Sample story</span>}
        <h3>{story.title}</h3>
        <p className="card-excerpt">{story.excerpt}</p>
        <span className="read-link">Read the story <ArrowUpRight size={15} /></span>
      </Link>
    </article>
  );
}

export function ReadingTime({ text }: { text: string }) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return <span className="reading-time"><Clock3 size={14} /> {Math.max(1, Math.ceil(words / 210))} min read</span>;
}
