import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
  noindex?: boolean;
}

const SEO = ({ 
  title, 
  description, 
  canonical, 
  type = 'website', 
  image = 'https://careconnect.com.br/og-image.png',
  noindex = false
}: SEOProps) => {

  const siteName = 'CareConnect';
  const fullTitle = title ? `${title} | ${siteName}` : 'CareConnect - Agência de Cuidadores de Idosos';
  const fullDescription = description || 'CareConnect oferece serviços profissionais de cuidadores de idosos. Conectamos cuidadores qualificados com famílias que precisam de assistência.';
  const url = `https://careconnect.com.br${canonical || ''}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}


      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
