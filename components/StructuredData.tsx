import { siteConfig } from "@/data/site";
import { siteUrl } from "@/data/site-url";

export function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.businessName,
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: `+${siteConfig.phoneRaw}`,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
      }}
    />
  );
}
