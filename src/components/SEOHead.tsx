import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateMetaTags, SEOProps } from '../utils/seo';

interface SEOComponentProps {
  pageKey: string;
  customProps?: Partial<SEOProps>;
  children?: React.ReactNode;
}

export const SEOHead: React.FC<SEOComponentProps> = ({ 
  pageKey, 
  customProps, 
  children 
}) => {
  const metaTags = generateMetaTags(pageKey, customProps);

  return (
    <Helmet>
      <title>{metaTags.title}</title>
      
      {/* Meta tags */}
      {metaTags.meta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
      
      {/* Link tags */}
      {metaTags.link.map((link, index) => (
        <link 
          key={index} 
          {...link} 
          crossOrigin={link.crossOrigin as any}
        />
      ))}
      
      {/* Structured data scripts */}
      {metaTags.script.map((script, index) => (
        <script 
          key={index} 
          type={script.type}
          dangerouslySetInnerHTML={{ __html: script.innerHTML }}
        />
      ))}
      
      {/* Additional custom head elements */}
      {children}
    </Helmet>
  );
};

// Enhanced SEO wrapper with additional enterprise features
export const EnterpriseLayout: React.FC<{
  pageKey: string;
  customSEO?: Partial<SEOProps>;
  className?: string;
  children: React.ReactNode;
}> = ({ pageKey, customSEO, className = '', children }) => {
  return (
    <>
      <SEOHead pageKey={pageKey} customProps={customSEO} />
      
      <div className={`enterprise-layout ${className}`}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="skip-to-main-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Skip to main content
        </a>
        
        {/* Main content with proper semantic structure */}
        <main id="main-content" role="main">
          {children}
        </main>
        
        {/* Schema.org structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Mattix Brand",
              "url": "https://mattixbrand.com",
              "logo": "https://mattixbrand.com/mattix-logo-medium.png",
              "description": "Professional brand identity and logo design services",
              "foundingDate": "2024",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "contact@mattixbrand.com"
              },
              "sameAs": [
                "https://github.com/mattixbrand"
              ]
            })
          }}
        />
      </div>
    </>
  );
};

export default SEOHead;
