import { NextRequest } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "";
  if (!/^[0-9a-f-]{36}\/[a-z0-9._-]{1,160}$/i.test(path)) return new Response("Not found", { status: 404 });
  const supabase = await getServerSupabase();
  if (!supabase) return new Response("Not found", { status: 404 });

  // Check the public story row first; an author's session must not make a draft image public.
  const { data: story } = await supabase.from("stories").select("id")
    .eq("cover_path", path).lte("published_at", new Date().toISOString()).maybeSingle();
  if (!story) return new Response("Not found", { status: 404 });

  const { data, error } = await supabase.storage.from("story-covers").download(path);
  if (error || !data) return new Response("Not found", { status: 404 });
  const mime = data.type;
  if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(mime)) return new Response("Not found", { status: 404 });
  return new Response(data, {
    headers: {
      "Content-Type": mime,
      "Cache-Control": "public, max-age=300, s-maxage=300",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; sandbox",
    },
  });
}
