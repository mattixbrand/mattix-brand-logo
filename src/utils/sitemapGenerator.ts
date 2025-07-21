// Dynamic Sitemap Generator for Mattix Brand Logo
// Generates sitemap.xml based on current routes and content

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Define all site routes with their SEO metadata
const siteRoutes: SitemapURL[] = [
  {
    loc: '/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    loc: '/logo',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    loc: '/generator',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    loc: '/docs',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    loc: '/colors',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: '/brand-guidelines',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: '/about',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    loc: '/download',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.6
  }
];

/**
 * Generates XML sitemap content
 * @param baseUrl - The base URL of the website
 * @param routes - Array of routes with metadata
 * @returns XML sitemap string
 */
export function generateSitemap(baseUrl: string = 'https://brand.mattixs.com', routes: SitemapURL[] = siteRoutes): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${routes.map(route => `  <url>
    <loc>${baseUrl}${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n\n')}

</urlset>`;

  return xml;
}

/**
 * Updates the sitemap file with current date
 * @param baseUrl - The base URL of the website
 */
export function updateSitemap(baseUrl: string = 'https://brand.mattixs.com'): void {
  const updatedRoutes = siteRoutes.map(route => ({
    ...route,
    lastmod: new Date().toISOString().split('T')[0]
  }));

  const sitemapContent = generateSitemap(baseUrl, updatedRoutes);
  
  console.log('Updated sitemap content:');
  console.log(sitemapContent);
  
  // In a real implementation, you would write this to the public/sitemap.xml file
  // For now, we'll just log it to the console
}

/**
 * Validates sitemap URLs
 * @param routes - Routes to validate
 * @returns Validation results
 */
export function validateSitemap(routes: SitemapURL[] = siteRoutes): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  routes.forEach((route, index) => {
    // Check for required fields
    if (!route.loc) {
      errors.push(`Route ${index}: Missing 'loc' field`);
    }

    if (!route.lastmod) {
      errors.push(`Route ${index}: Missing 'lastmod' field`);
    }

    // Check priority range
    if (route.priority < 0 || route.priority > 1) {
      errors.push(`Route ${index}: Priority must be between 0.0 and 1.0`);
    }

    // Check for duplicate URLs
    const duplicates = routes.filter(r => r.loc === route.loc);
    if (duplicates.length > 1) {
      warnings.push(`Route ${index}: Duplicate URL found: ${route.loc}`);
    }

    // Validate changefreq values
    const validChangefreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
    if (!validChangefreqs.includes(route.changefreq)) {
      errors.push(`Route ${index}: Invalid changefreq value: ${route.changefreq}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Gets SEO recommendations based on sitemap analysis
 * @param routes - Routes to analyze
 * @returns SEO recommendations
 */
export function getSEORecommendations(routes: SitemapURL[] = siteRoutes): string[] {
  const recommendations: string[] = [];

  // Check priority distribution
  const highPriorityRoutes = routes.filter(r => r.priority >= 0.8);
  if (highPriorityRoutes.length > 3) {
    recommendations.push('Consider reducing the number of high-priority pages (≥0.8) to focus SEO weight on the most important pages.');
  }

  // Check for very low priorities
  const lowPriorityRoutes = routes.filter(r => r.priority < 0.3);
  if (lowPriorityRoutes.length > 0) {
    recommendations.push('Consider whether very low priority pages (<0.3) should be included in the sitemap at all.');
  }

  // Check update frequencies
  const frequentUpdates = routes.filter(r => ['always', 'hourly', 'daily'].includes(r.changefreq));
  if (frequentUpdates.length > 2) {
    recommendations.push('Ensure pages marked for frequent updates actually change that often, or search engines may ignore the frequency hints.');
  }

  // Check for outdated lastmod dates
  const today = new Date();
  const outdated = routes.filter(route => {
    const lastModDate = new Date(route.lastmod);
    const daysDiff = (today.getTime() - lastModDate.getTime()) / (1000 * 3600 * 24);
    return daysDiff > 30 && ['weekly', 'daily'].includes(route.changefreq);
  });

  if (outdated.length > 0) {
    recommendations.push('Some pages marked for frequent updates have old lastmod dates. Consider updating them or changing their changefreq.');
  }

  return recommendations;
}

/**
 * Generates a comprehensive SEO report
 * @param baseUrl - The base URL of the website
 * @returns SEO report
 */
export function generateSEOReport(baseUrl: string = 'https://brand.mattixs.com'): {
  sitemap: string;
  validation: ReturnType<typeof validateSitemap>;
  recommendations: string[];
  stats: {
    totalPages: number;
    highPriorityPages: number;
    avgPriority: number;
    updateFrequencyBreakdown: Record<string, number>;
  };
} {
  const validation = validateSitemap(siteRoutes);
  const recommendations = getSEORecommendations(siteRoutes);
  
  const stats = {
    totalPages: siteRoutes.length,
    highPriorityPages: siteRoutes.filter(r => r.priority >= 0.8).length,
    avgPriority: siteRoutes.reduce((sum, r) => sum + r.priority, 0) / siteRoutes.length,
    updateFrequencyBreakdown: siteRoutes.reduce((acc, r) => {
      acc[r.changefreq] = (acc[r.changefreq] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  return {
    sitemap: generateSitemap(baseUrl, siteRoutes),
    validation,
    recommendations,
    stats
  };
}

// Export utilities for use in development
export const sitemapUtils = {
  generateSitemap,
  updateSitemap,
  validateSitemap,
  getSEORecommendations,
  generateSEOReport,
  routes: siteRoutes
};

// Auto-run in development
if (process.env.NODE_ENV === 'development') {
  console.log('🗺️  Sitemap Generator loaded');
  console.log('Available commands:');
  console.log('- sitemapUtils.generateSEOReport()');
  console.log('- sitemapUtils.updateSitemap()');
  console.log('- sitemapUtils.validateSitemap()');
  
  // Make available globally for development
  (window as any).sitemapUtils = sitemapUtils;
}
