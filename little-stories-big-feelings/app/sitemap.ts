import type { MetadataRoute } from "next";
import { getPublishedStories } from "@/lib/stories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const stories = await getPublishedStories(1000);
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/stories`, changeFrequency: "daily", priority: .9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: .5 },
    ...stories.map((story) => ({ url: `${siteUrl}/stories/${story.slug}`, lastModified: new Date(story.published_at), changeFrequency: "monthly" as const, priority: .7 })),
  ];
}
