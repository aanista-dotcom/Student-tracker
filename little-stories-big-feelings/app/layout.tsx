import type { Metadata } from "next";
import "./globals.css";
import { getSiteSettings } from "@/lib/stories";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    metadataBase: new URL(siteUrl),
    title: { default: settings.site_title, template: `%s · ${settings.site_title}` },
    description: settings.tagline,
    openGraph: { type: "website", siteName: settings.site_title, title: settings.site_title, description: settings.tagline },
    twitter: { card: "summary_large_image", title: settings.site_title, description: settings.tagline },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en">
      <body><SiteHeader settings={settings} /><main>{children}</main><SiteFooter settings={settings} /></body>
    </html>
  );
}
