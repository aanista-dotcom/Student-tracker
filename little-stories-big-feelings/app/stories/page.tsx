import type { Metadata } from "next";
import { getPublishedStories } from "@/lib/stories";
import { StoryShelf } from "@/components/story-shelf";

export const metadata: Metadata = { title: "All stories", description: "Every little story, collected in one place." };
export const dynamic = "force-dynamic";

export default async function StoriesPage() {
  const stories = await getPublishedStories(250);
  return <section className="page-wrap interior-page"><div className="eyebrow"><span className="eyebrow-line" /> A GROWING COLLECTION</div><div className="interior-heading"><h1>All the <em>stories.</em></h1><p>A shelf of small moments, passing thoughts, and feelings that wanted somewhere to land.</p></div><StoryShelf stories={stories} /></section>;
}
