// SEO utilities for Mattix Brand Logo - Enterprise-grade SEO implementation

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  canonical?: string;
  schema?: object;
}

export const defaultSEO: SEOProps = {
  siteName: 'Mattix Brand Logo',
  author: 'Mattix Brand Team',
  type: 'website',
  image: '/mattix-logo-medium.png',
  keywords: [
    'mattix brand',
    'logo design',
    'brand identity',
    'vector logo',
    'scalable graphics',
    'brand assets',
    'logo generator',
    'brand guidelines',
    'corporate identity',
    'design system'
  ]
};

// Page-specific SEO configurations
export const pageSEO: Record<string, SEOProps> = {
  home: {
    title: 'Mattix Brand Logo - Professional Brand Identity & Logo Design',
    description: 'Discover Mattix Brand\'s professional logo design and brand identity system. High-quality scalable vector graphics, brand guidelines, and design resources for enterprise use.',
    keywords: [
      'mattix brand logo',
      'professional logo design',
      'brand identity system',
      'corporate branding',
      'scalable vector graphics',
      'brand assets download'
    ],
    url: '/',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Mattix Brand',
      url: 'https://brand.mattixs.com',
      logo: 'https://brand.mattixs.com/mattix-logo-medium.png',
      description: 'Professional brand identity and logo design services',
      sameAs: [
        'https://github.com/mattixbrand',
        'https://twitter.com/mattixbrand'
      ]
    }
  },
  
  logo: {
    title: 'Mattix Logo Showcase - High-Quality Brand Assets',
    description: 'Explore the Mattix brand logo in various formats and styles. Download scalable SVG, PNG files, and view our complete brand asset collection.',
    keywords: [
      'mattix logo',
      'brand logo showcase',
      'logo variations',
      'scalable logo',
      'svg logo',
      'png logo',
      'brand assets'
    ],
    url: '/logo',
    section: 'Brand Assets'
  },
  
  generator: {
    title: 'Interactive Logo Generator - Mattix Brand Tools',
    description: 'Create custom variations of the Mattix logo with our interactive generator. Adjust colors, sizes, and formats for your specific needs.',
    keywords: [
      'logo generator',
      'interactive logo tool',
      'custom logo variations',
      'brand customization',
      'logo maker',
      'brand tool'
    ],
    url: '/generator',
    section: 'Tools'
  },
  
  colors: {
    title: 'Mattix Brand Color System - Design Guidelines',
    description: 'Official color palette and guidelines for the Mattix brand. Includes primary colors, accent colors, and usage guidelines for consistent branding.',
    keywords: [
      'brand colors',
      'color system',
      'design guidelines',
      'brand palette',
      'hex colors',
      'color codes'
    ],
    url: '/colors',
    section: 'Design System'
  },
  
  docs: {
    title: 'Brand Documentation - Mattix Usage Guidelines',
    description: 'Complete documentation for using Mattix brand assets. Technical specifications, usage guidelines, and best practices for brand implementation.',
    keywords: [
      'brand documentation',
      'usage guidelines',
      'brand standards',
      'technical specs',
      'brand manual',
      'implementation guide'
    ],
    url: '/docs',
    section: 'Documentation'
  },
  
  about: {
    title: 'About Mattix Brand - Our Story and Vision',
    description: 'Learn about Mattix Brand\'s mission, vision, and the story behind our brand identity. Discover our commitment to excellence in design and branding.',
    keywords: [
      'about mattix',
      'brand story',
      'company mission',
      'brand vision',
      'design philosophy',
      'brand values'
    ],
    url: '/about',
    section: 'About'
  },
  
  brandGuidelines: {
    title: 'Brand Guidelines - Mattix Visual Identity Standards',
    description: 'Comprehensive brand guidelines for Mattix. Logo usage, typography, color specifications, and visual identity standards for consistent brand application.',
    keywords: [
      'brand guidelines',
      'visual identity',
      'logo usage rules',
      'typography guidelines',
      'brand standards',
      'identity manual'
    ],
    url: '/brand-guidelines',
    section: 'Guidelines'
  },
  
  download: {
    title: 'Download Brand Assets - Mattix Logo & Resources',
    description: 'Download official Mattix brand assets including logos, icons, color palettes, and brand guidelines. Available in multiple formats for various use cases.',
    keywords: [
      'download brand assets',
      'logo download',
      'brand resources',
      'svg download',
      'png download',
      'brand kit'
    ],
    url: '/download',
    section: 'Downloads'
  }
};

// Generate comprehensive meta tags
export const generateMetaTags = (pageKey: string, customProps?: Partial<SEOProps>) => {
  const pageMeta = pageSEO[pageKey] || {};
  const seoProps = { ...defaultSEO, ...pageMeta, ...customProps };
  
  const baseUrl = 'https://brand.mattixs.com';
  const fullUrl = `${baseUrl}${seoProps.url || ''}`;
  
  return {
    title: seoProps.title,
    meta: [
      // Basic meta tags
      { name: 'description', content: seoProps.description || '' },
      { name: 'keywords', content: seoProps.keywords?.join(', ') || '' },
      { name: 'author', content: seoProps.author || '' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'robots', content: seoProps.noIndex ? 'noindex, nofollow' : 'index, follow' },
      { name: 'theme-color', content: '#4FACFE' },
      { name: 'msapplication-TileColor', content: '#4FACFE' },
      
      // Open Graph tags
      { property: 'og:title', content: seoProps.title || '' },
      { property: 'og:description', content: seoProps.description || '' },
      { property: 'og:type', content: seoProps.type || 'website' },
      { property: 'og:url', content: fullUrl },
      { property: 'og:image', content: `${baseUrl}${seoProps.image || '/mattix-logo-medium.png'}` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: `${seoProps.title || 'Mattix Brand'} - Mattix Brand` },
      { property: 'og:site_name', content: seoProps.siteName || 'Mattix Brand' },
      { property: 'og:locale', content: 'en_US' },
      
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoProps.title || '' },
      { name: 'twitter:description', content: seoProps.description || '' },
      { name: 'twitter:image', content: `${baseUrl}${seoProps.image || '/mattix-logo-medium.png'}` },
      { name: 'twitter:image:alt', content: `${seoProps.title || 'Mattix Brand'} - Mattix Brand` },
      { name: 'twitter:site', content: '@mattixbrand' },
      { name: 'twitter:creator', content: '@mattixbrand' },
      
      // Additional SEO meta tags
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'Mattix Brand' },
      
      // Article-specific tags (if applicable)
      ...(seoProps.publishedTime ? [{ property: 'article:published_time', content: seoProps.publishedTime }] : []),
      ...(seoProps.modifiedTime ? [{ property: 'article:modified_time', content: seoProps.modifiedTime }] : []),
      ...(seoProps.section ? [{ property: 'article:section', content: seoProps.section }] : []),
      ...(seoProps.tags ? seoProps.tags.map(tag => ({ property: 'article:tag', content: tag })) : []),
    ],
    link: [
      // Canonical URL
      { rel: 'canonical', href: seoProps.canonical || fullUrl },
      
      // Preconnect to external domains for performance
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      
      // Favicon and app icons
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/svg+xml', href: '/mattix-logo-small.svg' },
      { rel: 'apple-touch-icon', href: '/mattix-icons-small.ico' },
      
      // Manifest
      { rel: 'manifest', href: '/site.webmanifest' },
      
      // Sitemap
      { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' },
    ],
    script: seoProps.schema ? [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(seoProps.schema)
      }
    ] : []
  };
};

// Export utility functions
export const updatePageMeta = (pageKey: string, customProps?: Partial<SEOProps>) => {
  return generateMetaTags(pageKey, customProps);
};

export const getStructuredData = (type: 'Organization' | 'WebSite' | 'WebPage', data: any) => {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };
  
  return JSON.stringify(baseStructuredData);
};
