import type { Metadata } from "next";
import { Heart, Sparkles } from "lucide-react";
import { getSiteSettings } from "@/lib/stories";

export const metadata: Metadata = { title: "About this little place", description: "A note from the person behind the stories." };

export default async function AboutPage() {
  const settings = await getSiteSettings();
  return <section className="page-wrap about-page"><div className="about-doodle"><span className="about-sun" /><span className="about-flower">✳</span><span className="about-spark"><Sparkles size={19} /></span></div><div className="eyebrow"><span className="eyebrow-line" /> A NOTE FROM ME</div><h1>A little about<br /><em>this place.</em></h1><div className="about-copy"><p className="about-lede">{settings.introduction}</p>{settings.about.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p className="about-signoff">Thank you for being here <Heart size={15} /></p></div><span className="about-caption">a home for little things</span></section>;
}
