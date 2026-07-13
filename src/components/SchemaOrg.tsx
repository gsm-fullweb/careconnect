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

// HomeHealthCareService schema for location-based pages (Local SEO)
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
  // Ensure E.164 format for phone (rough fallback if it doesn't have country code)
  const formattedPhone = props.phone.startsWith("+") ? props.phone : `+55${props.phone.replace(/\D/g, "")}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeHealthCareService",
    "name": props.name,
    "description": props.description,
    "image": props.image || "https://www.careconnect.com.br/og-image.png",
    "telephone": formattedPhone,
    "email": props.email,
    "url": `https://www.careconnect.com.br${props.url}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": props.city,
      "addressRegion": props.state || "SP",
      "postalCode": "08710-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.5225,
      "longitude": -46.1882
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "16:00"
      }
    ],
    "priceRange": "$$",
    "areaServed": [
      { "@type": "City", "name": "Mogi das Cruzes" },
      { "@type": "City", "name": "Suzano" },
      { "@type": "City", "name": "Arujá" },
      { "@type": "City", "name": "Guararema" },
      { "@type": "City", "name": "Biritiba Mirim" },
      { "@type": "City", "name": "Salesópolis" },
      { "@type": "City", "name": "Poá" },
      { "@type": "City", "name": "Ferraz de Vasconcelos" },
      { "@type": "City", "name": "Itaquaquecetuba" }
    ]
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

// FAQ schema for answering common questions
export const FAQSchema = (props: {
  questions: Array<{ question: string; answer: string }>;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": props.questions.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return <SchemaOrg schema={schema} />;
};

export default SchemaOrg;
