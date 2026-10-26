import Link from "next/link";
import { BookOpenText, Menu } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label={`${settings.site_title} home`}>
          <span className="brand-mark"><BookOpenText size={19} strokeWidth={1.6} /></span>
          <span>{settings.site_title}</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/stories">Stories</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link className="write-link" href="/author">A quiet corner <span aria-hidden="true">↗</span></Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><Menu size={22} /></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/stories">Stories</Link><Link href="/about">About</Link><Link href="/author">Author sign in</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
