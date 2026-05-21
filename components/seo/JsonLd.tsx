interface OrganizationJsonLdProps {
  url: string;
}

export function OrganizationJsonLd({ url }: OrganizationJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Stellux",
    url,
    logo: `${url}/images/Hero.png`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "English",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface WebsiteJsonLdProps {
  url: string;
}

export function WebsiteJsonLd({ url }: WebsiteJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Stellux",
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface ProductJsonLdProps {
  name: string;
  description: string;
  image?: string;
  price: string;
  currency: string;
  availability: boolean;
  url: string;
  sku?: string;
  brand?: string;
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency,
  availability,
  url,
  sku,
  brand = "Stellux",
}: ProductJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: currency,
      price,
      availability: availability
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Stellux",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
