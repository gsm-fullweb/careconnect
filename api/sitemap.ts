const SITE_URL = "https://www.careconnect.com.br";
const SUPABASE_URL = "https://dyxkbbojlyppizsgjjxx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5eGtiYm9qbHlwcGl6c2dqanh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzQ2NjAsImV4cCI6MjA2MzY1MDY2MH0.47pGkZXkqZoAsjVHhwSQPLEcGY99hoiDO-6LdCG-4K4";

const STATIC_URLS = [
  "/",
  "/about",
  "/services",
  "/plans",
  "/contact",
  "/blog",
  "/cuidador-idosos-mogi-das-cruzes",
  "/pre-cadastro",
  "/cadastrar-cuidador",
  "/cuidare-mogi-das-cruzes",
  "/acuidar-mogi-das-cruzes-cuidadores-de-idosos",
  "/home-angels-mogi-das-cruzes",
  "/qual-o-valor-da-diaria-do-cuidador-de-idoso",
  "/quanto-e-12-horas-de-uma-cuidadora",
  "/qual-valor-cobrar-para-cuidar-de-um-idoso",
  "/como-contratar-cuidador-sem-vinculo-empregaticio",
  "/duvidas-frequentes-cuidador-de-idosos",
  "/home-care-mogi-das-cruzes-trabalhe-conosco",
  "/casa-de-repouso-mogi-das-cruzes-trabalhe-conosco",
  "/vagas-de-cuidadora-de-idosos-particular",
  "/avaliacoes-sobre-cuidare-mogi-das-cruzes",
  "/cuidador-mogi-das-cruzes",
];

type BlogPost = {
  id: string;
  slug: string | null;
  created_at: string | null;
  updated_at: string | null;
};

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const toDate = (value?: string | null) => {
  const parsed = value ? new Date(value) : new Date();
  return Number.isNaN(parsed.getTime())
    ? new Date().toISOString().slice(0, 10)
    : parsed.toISOString().slice(0, 10);
};

export default async function handler(_request: unknown, response: any) {
  try {
    const postsResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=id,slug,created_at,updated_at&published=eq.true&order=created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );

    if (!postsResponse.ok) {
      throw new Error(`Supabase returned HTTP ${postsResponse.status}`);
    }

    const posts = (await postsResponse.json()) as BlogPost[];
    const STATIC_LASTMOD = "2024-07-13"; // Changed from dynamic today to fix SEO issue #7

    const urls = [
      ...STATIC_URLS.map((path) => ({
        loc: `${SITE_URL}${path}`,
        lastmod: STATIC_LASTMOD,
      })),
      ...posts.map((post) => ({
        loc: `${SITE_URL}/blog/${post.slug || post.id}`,
        lastmod: toDate(post.updated_at || post.created_at),
      })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod }) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

    response.setHeader("Content-Type", "application/xml; charset=utf-8");
    response.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400",
    );
    response.status(200).send(xml);
  } catch (error) {
    console.error("Could not generate sitemap:", error);
    response
      .status(503)
      .setHeader("Content-Type", "text/plain; charset=utf-8")
      .send("Sitemap temporarily unavailable");
  }
}
