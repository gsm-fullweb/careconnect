import { Helmet } from 'react-helmet-async';

interface SchemaOrgProps {
  schema: Record<string, any>;
}

// JSON-LD schema component for structured data
const SchemaOrg = ({ schema }: SchemaOrgProps) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema, null, 2)}
      </script>
    </Helmet>
  );
};

// Article schema for blog posts
export const ArticleSchema = (props: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": props.title,
    "description": props.description,
    "image": props.image || "https://www.careconnect.com.br/og-image.png",
    "datePublished": props.datePublished,
    "dateModified": props.dateModified || props.datePublished,
    "author": {
      "@type": "Organization",
      "name": "CareConnect"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CareConnect",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.careconnect.com.br/images/logo-careconnect.png"
      }
    },
    "url": `https://www.careconnect.com.br${props.url}`
  };

  return <SchemaOrg schema={schema} />;
};

// LocalBusiness schema for location-based pages
export const LocalBusinessSchema = (props: {
  name: string;
  description: string;
  city: string;
  state?: string;
  phone: string;
  email: string;
  url: string;
  image?: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": props.name,
    "description": props.description,
    "image": props.image || "https://www.careconnect.com.br/images/logo-careconnect.png",
    "telephone": props.phone,
    "email": props.email,
    "url": `https://www.careconnect.com.br${props.url}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": props.city,
      "addressRegion": props.state || "SP",
      "addressCountry": "BR"
    },
    "areaServed": props.city
  };

  return <SchemaOrg schema={schema} />;
};

// BreadcrumbList schema for navigation
export const BreadcrumbSchema = (props: {
  items: Array<{ name: string; url: string }>;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": props.items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.careconnect.com.br${item.url}`
    }))
  };

  return <SchemaOrg schema={schema} />;
};

export default SchemaOrg;
