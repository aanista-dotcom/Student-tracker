import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="site-footer">
      <div><p className="footer-name">{settings.site_title}</p><p className="muted">{settings.tagline}</p></div>
      <div className="footer-links"><Link href="/stories">Read the stories</Link><Link href="/about">A little about me</Link></div>
      <p className="copyright">Made slowly, with care · {new Date().getFullYear()}</p>
    </footer>
  );
}
