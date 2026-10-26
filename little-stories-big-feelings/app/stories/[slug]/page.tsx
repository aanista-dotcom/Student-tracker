/* Public cover images pass through the route that checks publication access. */
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPublishedStory } from "@/lib/stories";
import { RichText } from "@/components/rich-text";
import { formatStoryDate, ReadingTime } from "@/components/story-card";
import { ShareButton } from "@/components/share-button";
import { plainTextFromContent } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getPublishedStory(slug);
  if (!story) return { title: "Story not found" };
  return {
    title: story.title,
    description: story.excerpt,
    alternates: { canonical: `/stories/${story.slug}` },
    openGraph: { type: "article", title: story.title, description: story.excerpt, publishedTime: story.published_at, images: story.cover_url ? [{ url: story.cover_url }] : undefined },
    twitter: { card: story.cover_url ? "summary_large_image" : "summary", title: story.title, description: story.excerpt, images: story.cover_url ? [story.cover_url] : undefined },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = await getPublishedStory(slug);
  if (!story) notFound();
  const text = plainTextFromContent(story.content);
  return <article className="story-page page-wrap">
    <Link className="back-link" href="/stories"><ArrowLeft size={15} /> All stories</Link>
    <div className="story-heading"><div className="eyebrow"><span className="eyebrow-line" /> {story.category || "A LITTLE STORY"}</div><h1>{story.title}</h1><p className="story-deck">{story.excerpt}</p><div className="story-byline"><span>By the author</span><i /> <time dateTime={story.story_date}>{formatStoryDate(story.story_date)}</time><i /> <ReadingTime text={text} /></div>{story.is_sample && <span className="sample-label">Sample story · replace this with your own</span>}</div>
    {story.cover_url ? <div className="story-cover"><img src={story.cover_url} alt={`Cover for ${story.title}`} /></div> : <div className="story-cover story-cover-art"><span className="cover-sun" /><span className="cover-vase" /><span className="cover-leaf leaf-one" /><span className="cover-leaf leaf-two" /><span className="cover-caption">A page from an ordinary day</span></div>}
    <RichText content={story.content} />
    <div className="story-end"><span>✳</span><p>Thank you for sitting with this story.</p><ShareButton /></div>
  </article>;
}
