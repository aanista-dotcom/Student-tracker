import Link from "next/link";
import { ArrowDown, ArrowRight, Feather, Heart, Sparkles } from "lucide-react";
import { getPublishedStories, getSiteSettings } from "@/lib/stories";
import { StoryCard } from "@/components/story-card";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, stories] = await Promise.all([getSiteSettings(), getPublishedStories(4)]);
  const [featured, ...rest] = stories;
  return (
    <>
      <section className="home-hero page-wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> NOTES FROM A LIFE IN PROGRESS</div>
          <h1>Some days are<br /><em>small enough</em><br />to hold.</h1>
          <p className="hero-intro">{settings.introduction}</p>
          <div className="hero-actions"><Link className="button button-dark" href="/stories">Wander through the stories <ArrowRight size={16} /></Link><span className="hero-note"><Heart size={14} /> Written with a soft heart</span></div>
        </div>
        <div className="hero-illustration" aria-label="An abstract quiet afternoon illustration" role="img">
          <div className="sun-disc" /><div className="hill hill-back" /><div className="hill hill-front" />
          <div className="window-frame"><div className="window-cross-v" /><div className="window-cross-h" /><div className="window-light" /></div>
          <div className="plant"><span className="plant-stem" /><i /><i /><i /><i /><i /></div>
          <span className="hero-quote">“Stay for a<br />little while.”</span>
          <span className="hero-illustration-caption"><Sparkles size={13} /> a place to pause</span>
        </div>
        <a className="scroll-cue" href="#latest"><ArrowDown size={14} /> A little further down</a>
      </section>

      <section className="welcome-strip">
        <div className="welcome-inner"><span className="welcome-icon"><Feather size={20} /></span><p>{settings.tagline}</p><span className="welcome-flower">✳</span></div>
      </section>

      <section className="latest-section page-wrap" id="latest">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> THE LATEST</div><h2>Fresh from the <em>page.</em></h2></div><Link className="text-link" href="/stories">All stories <ArrowRight size={15} /></Link></div>
        {featured ? <div className="featured-layout"><StoryCard story={featured} featured /><div className="recent-stack">{rest.map((story, index) => <article className="recent-item" key={story.id}><span className="recent-index">0{index + 2}</span><div><span className="card-meta">{story.category} · {story.story_date}</span><h3><Link href={`/stories/${story.slug}`}>{story.title}</Link></h3><p>{story.excerpt}</p></div><Link className="round-arrow" href={`/stories/${story.slug}`} aria-label={`Read ${story.title}`}><ArrowRight size={16} /></Link></article>)}<div className="more-note">One story at a time. No rush. <span>♡</span></div></div></div> : <div className="empty-state"><span className="tiny-flower">✳</span><h2>The page is still unfolding.</h2><p>Come back soon for the first little story.</p></div>}
      </section>

      <section className="invitation"><div className="invitation-inner"><span className="tiny-flower">✳</span><p>There is room here for</p><h2>the things you almost<br /><em>forgot to notice.</em></h2><Link className="button button-outline" href="/about">A little about this place <ArrowRight size={15} /></Link></div></section>
    </>
  );
}
