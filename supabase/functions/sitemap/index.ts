import { createClient } from "npm:@supabase/supabase-js@2";

const SITE_URL = "https://careconnect.com.br";

const STATIC_PAGES = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/blog", priority: "0.9", changefreq: "daily" },
  { url: "/plans", priority: "0.8", changefreq: "monthly" },
  { url: "/about", priority: "0.7", changefreq: "monthly" },
  { url: "/contact", priority: "0.7", changefreq: "monthly" },
  { url: "/services", priority: "0.8", changefreq: "monthly" },
  { url: "/cuidador-idosos-mogi-das-cruzes", priority: "0.9", changefreq: "monthly" },
  { url: "/pre-cadastro", priority: "0.6", changefreq: "monthly" },
];


Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, id, created_at, updated_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const today = new Date().toISOString().split("T")[0];

  const staticUrls = STATIC_PAGES.map(
    (page) => `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join("");

  const postUrls = (posts ?? []).map((post) => {
    const slug = post.slug || post.id;
    const lastmod = (post.updated_at || post.created_at || today).split("T")[0];
    return `
  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${postUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
});
