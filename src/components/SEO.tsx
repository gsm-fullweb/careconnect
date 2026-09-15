import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
  noindex?: boolean;
  keywords?: string;
}

// ✅ Function: SEO
// 📌 Description: Reusable SEO head component with Open Graph, Twitter Cards, and meta tags
// 📥 Parameters: SEOProps - title, description, canonical, type, image, noindex, keywords
// 📤 Returns: JSX.Element — Helmet component with meta tags
const SEO = ({ 
  title, 
  description, 
  canonical, 
  type = 'website', 
  image = 'https://www.careconnect.com.br/og-image.png',
  noindex = false,
  keywords,
}: SEOProps) => {

  const siteName = 'CareConnect';
  const defaultTitle = 'CareConnect — Cuidador de Idosos em SP e Alto Tietê | Home Care';
  
  // Smart title formatting: don't append siteName if title already contains it or is too long (> 55 chars)
  const fullTitle = title 
    ? (title.includes(siteName) || title.length > 55 ? title : `${title} | ${siteName}`)
    : defaultTitle;
  const fullDescription = description || 'Cuidadores de idosos qualificados em São Paulo, Mogi das Cruzes, Guarulhos e região. Home care para Alzheimer e Parkinson, acompanhamento hospitalar e paliativos. Matching por IA.';
  const url = `https://www.careconnect.com.br${canonical || ''}`;
  const defaultKeywords = 'cuidador de idosos, home care, cuidador de idosos sp, cuidador de idosos mogi das cruzes, cuidadora de idosos, Alzheimer, Parkinson, acompanhante hospitalar';

  const breadcrumbSchema = canonical && canonical !== '/' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.careconnect.com.br/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title ? title.replace(' | CareConnect', '') : siteName,
        "item": url
      }
    ]
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta name="keywords" content={keywords || defaultKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />

      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
