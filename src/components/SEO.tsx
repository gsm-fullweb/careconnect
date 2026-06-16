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
  image = 'https://careconnect.com.br/og-image.png',
  noindex = false,
  keywords,
}: SEOProps) => {

  const siteName = 'CareConnect';
  const defaultTitle = 'CareConnect - Cuidador de Idosos em Mogi das Cruzes | Home Care';
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const fullDescription = description || 'Encontre cuidadores de idosos qualificados em Mogi das Cruzes e região do Alto Tietê. Home care, acompanhamento hospitalar e cuidados especializados com matching inteligente por IA.';
  const url = `https://www.careconnect.com.br${canonical || ''}`;
  const defaultKeywords = 'cuidador de idosos mogi das cruzes, home care mogi das cruzes, cuidadora de idosos, agência de cuidadores, cuidados domiciliares, acompanhante hospitalar';

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
    </Helmet>
  );
};

export default SEO;
