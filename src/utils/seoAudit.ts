// SEO Audit Tool for Mattix Brand Logo
// Performs comprehensive SEO analysis and provides actionable insights

export interface SEOAuditResult {
  score: number;
  issues: SEOIssue[];
  recommendations: SEORecommendation[];
  passed: SEOCheck[];
  metadata: {
    timestamp: string;
    url: string;
    userAgent: string;
  };
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  category: 'meta' | 'content' | 'performance' | 'structure' | 'accessibility';
  message: string;
  element?: string;
  fix?: string;
  impact: 'high' | 'medium' | 'low';
}

export interface SEORecommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  category: string;
}

export interface SEOCheck {
  name: string;
  description: string;
  category: string;
}

/**
 * Performs a comprehensive SEO audit of the current page
 * @returns SEO audit results
 */
export function performSEOAudit(): SEOAuditResult {
  const issues: SEOIssue[] = [];
  const recommendations: SEORecommendation[] = [];
  const passed: SEOCheck[] = [];

  // Meta tags audit
  auditMetaTags(issues, passed);
  
  // Content audit
  auditContent(issues, passed, recommendations);
  
  // Performance audit
  auditPerformance(issues, passed, recommendations);
  
  // Structure audit
  auditStructure(issues, passed, recommendations);
  
  // Accessibility audit
  auditAccessibility(issues, passed, recommendations);

  // Calculate score
  const totalChecks = issues.length + passed.length;
  const errorWeight = 3;
  const warningWeight = 2;
  const infoWeight = 1;
  
  const deductions = issues.reduce((sum, issue) => {
    switch (issue.type) {
      case 'error': return sum + errorWeight;
      case 'warning': return sum + warningWeight;
      case 'info': return sum + infoWeight;
      default: return sum;
    }
  }, 0);

  const maxPossibleDeductions = totalChecks * errorWeight;
  const score = Math.max(0, Math.round(((maxPossibleDeductions - deductions) / maxPossibleDeductions) * 100));

  return {
    score,
    issues,
    recommendations,
    passed,
    metadata: {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }
  };
}

/**
 * Audits meta tags for SEO compliance
 */
function auditMetaTags(issues: SEOIssue[], passed: SEOCheck[]): void {
  // Title tag
  const titleElement = document.querySelector('title');
  if (!titleElement || !titleElement.textContent?.trim()) {
    issues.push({
      type: 'error',
      category: 'meta',
      message: 'Missing or empty title tag',
      element: 'title',
      fix: 'Add a descriptive title tag (50-60 characters)',
      impact: 'high'
    });
  } else {
    const titleLength = titleElement.textContent.length;
    if (titleLength > 60) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: `Title tag too long (${titleLength} characters)`,
        element: 'title',
        fix: 'Keep title between 50-60 characters',
        impact: 'medium'
      });
    } else if (titleLength < 30) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: `Title tag too short (${titleLength} characters)`,
        element: 'title',
        fix: 'Expand title to be more descriptive (30-60 characters)',
        impact: 'medium'
      });
    } else {
      passed.push({
        name: 'Title Tag Length',
        description: 'Title tag is appropriate length',
        category: 'meta'
      });
    }
  }

  // Meta description
  const descriptionMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  if (!descriptionMeta || !descriptionMeta.content?.trim()) {
    issues.push({
      type: 'error',
      category: 'meta',
      message: 'Missing or empty meta description',
      element: 'meta[name="description"]',
      fix: 'Add a meta description (150-160 characters)',
      impact: 'high'
    });
  } else {
    const descLength = descriptionMeta.content.length;
    if (descLength > 160) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: `Meta description too long (${descLength} characters)`,
        element: 'meta[name="description"]',
        fix: 'Keep meta description under 160 characters',
        impact: 'medium'
      });
    } else if (descLength < 120) {
      issues.push({
        type: 'info',
        category: 'meta',
        message: `Meta description could be longer (${descLength} characters)`,
        element: 'meta[name="description"]',
        fix: 'Expand description to 120-160 characters for better SERP presence',
        impact: 'low'
      });
    } else {
      passed.push({
        name: 'Meta Description',
        description: 'Meta description is appropriate length',
        category: 'meta'
      });
    }
  }

  // Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');

  if (!ogTitle || !ogDescription || !ogImage || !ogUrl) {
    issues.push({
      type: 'warning',
      category: 'meta',
      message: 'Incomplete Open Graph tags',
      fix: 'Add missing og:title, og:description, og:image, and og:url tags',
      impact: 'medium'
    });
  } else {
    passed.push({
      name: 'Open Graph Tags',
      description: 'Complete Open Graph meta tags present',
      category: 'meta'
    });
  }

  // Twitter Card tags
  const twitterCard = document.querySelector('meta[name="twitter:card"]');
  if (!twitterCard) {
    issues.push({
      type: 'info',
      category: 'meta',
      message: 'Missing Twitter Card tags',
      fix: 'Add Twitter Card meta tags for better social sharing',
      impact: 'low'
    });
  } else {
    passed.push({
      name: 'Twitter Cards',
      description: 'Twitter Card meta tags present',
      category: 'meta'
    });
  }

  // Viewport meta tag
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    issues.push({
      type: 'error',
      category: 'meta',
      message: 'Missing viewport meta tag',
      element: 'meta[name="viewport"]',
      fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      impact: 'high'
    });
  } else {
    passed.push({
      name: 'Viewport Meta Tag',
      description: 'Viewport meta tag is present',
      category: 'meta'
    });
  }
}

/**
 * Audits content for SEO best practices
 */
function auditContent(issues: SEOIssue[], passed: SEOCheck[], recommendations: SEORecommendation[]): void {
  // Heading structure
  const h1Elements = document.querySelectorAll('h1');
  if (h1Elements.length === 0) {
    issues.push({
      type: 'error',
      category: 'content',
      message: 'Missing H1 tag',
      element: 'h1',
      fix: 'Add one H1 tag per page with primary keyword',
      impact: 'high'
    });
  } else if (h1Elements.length > 1) {
    issues.push({
      type: 'warning',
      category: 'content',
      message: `Multiple H1 tags found (${h1Elements.length})`,
      element: 'h1',
      fix: 'Use only one H1 tag per page',
      impact: 'medium'
    });
  } else {
    passed.push({
      name: 'H1 Structure',
      description: 'Proper H1 tag usage',
      category: 'content'
    });
  }

  // Alt text for images
  const images = document.querySelectorAll('img');
  let imagesWithoutAlt = 0;
  images.forEach(img => {
    if (!img.alt?.trim()) {
      imagesWithoutAlt++;
    }
  });

  if (imagesWithoutAlt > 0) {
    issues.push({
      type: 'warning',
      category: 'accessibility',
      message: `${imagesWithoutAlt} images missing alt text`,
      element: 'img',
      fix: 'Add descriptive alt text to all images',
      impact: 'medium'
    });
  } else if (images.length > 0) {
    passed.push({
      name: 'Image Alt Text',
      description: 'All images have alt text',
      category: 'accessibility'
    });
  }

  // Content length
  const bodyText = document.body.textContent || '';
  const wordCount = bodyText.trim().split(/\s+/).length;
  
  if (wordCount < 300) {
    recommendations.push({
      title: 'Increase Content Length',
      description: `Page has only ${wordCount} words. Consider adding more valuable content.`,
      priority: 'medium',
      effort: 'medium',
      category: 'content'
    });
  } else {
    passed.push({
      name: 'Content Length',
      description: `Adequate content length (${wordCount} words)`,
      category: 'content'
    });
  }

  // Internal links
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href*="mattixbrand.com"]');
  if (internalLinks.length < 3) {
    recommendations.push({
      title: 'Add More Internal Links',
      description: 'Improve internal linking structure for better SEO and user navigation.',
      priority: 'low',
      effort: 'low',
      category: 'content'
    });
  } else {
    passed.push({
      name: 'Internal Linking',
      description: `Good internal linking (${internalLinks.length} internal links)`,
      category: 'content'
    });
  }
}

/**
 * Audits performance factors affecting SEO
 */
function auditPerformance(issues: SEOIssue[], passed: SEOCheck[], recommendations: SEORecommendation[]): void {
  // Page load performance (if available)
  if ('performance' in window && window.performance.timing) {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    
    if (loadTime > 3000) {
      issues.push({
        type: 'warning',
        category: 'performance',
        message: `Slow page load time (${loadTime}ms)`,
        fix: 'Optimize images, minify CSS/JS, use CDN',
        impact: 'high'
      });
    } else if (loadTime > 1500) {
      recommendations.push({
        title: 'Optimize Page Speed',
        description: `Page loads in ${loadTime}ms. Target under 1.5 seconds.`,
        priority: 'medium',
        effort: 'medium',
        category: 'performance'
      });
    } else {
      passed.push({
        name: 'Page Load Speed',
        description: `Fast page load (${loadTime}ms)`,
        category: 'performance'
      });
    }
  }

  // GPU acceleration check
  const gpuElements = document.querySelectorAll('.gpu-accelerated, [style*="transform3d"], [style*="translateZ"]');
  if (gpuElements.length > 0) {
    passed.push({
      name: 'GPU Acceleration',
      description: 'GPU-accelerated elements detected for better performance',
      category: 'performance'
    });
  }

  // Large images
  const largeImages = document.querySelectorAll('img[src*=".jpg"], img[src*=".png"], img[src*=".jpeg"]');
  if (largeImages.length > 10) {
    recommendations.push({
      title: 'Optimize Images',
      description: 'Consider lazy loading or WebP format for better performance.',
      priority: 'medium',
      effort: 'medium',
      category: 'performance'
    });
  }
}

/**
 * Audits page structure for SEO
 */
function auditStructure(issues: SEOIssue[], passed: SEOCheck[], recommendations: SEORecommendation[]): void {
  // Semantic HTML
  const semanticElements = document.querySelectorAll('main, header, footer, article, section, nav, aside');
  if (semanticElements.length < 2) {
    issues.push({
      type: 'warning',
      category: 'structure',
      message: 'Limited semantic HTML structure',
      fix: 'Use semantic HTML5 elements (main, header, footer, section, etc.)',
      impact: 'medium'
    });
  } else {
    passed.push({
      name: 'Semantic HTML',
      description: 'Good use of semantic HTML elements',
      category: 'structure'
    });
  }

  // Canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    issues.push({
      type: 'warning',
      category: 'meta',
      message: 'Missing canonical URL',
      element: 'link[rel="canonical"]',
      fix: 'Add canonical URL to prevent duplicate content issues',
      impact: 'medium'
    });
  } else {
    passed.push({
      name: 'Canonical URL',
      description: 'Canonical URL is present',
      category: 'meta'
    });
  }

  // Structured data
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  if (structuredData.length === 0) {
    recommendations.push({
      title: 'Add Structured Data',
      description: 'Implement JSON-LD structured data for rich snippets.',
      priority: 'medium',
      effort: 'medium',
      category: 'structure'
    });
  } else {
    passed.push({
      name: 'Structured Data',
      description: `Structured data present (${structuredData.length} scripts)`,
      category: 'structure'
    });
  }
}

/**
 * Audits accessibility factors that affect SEO
 */
function auditAccessibility(_issues: SEOIssue[], passed: SEOCheck[], recommendations: SEORecommendation[]): void {
  // Skip to main content link
  const skipLink = document.querySelector('a[href="#main-content"], a[href="#main"]');
  if (!skipLink) {
    recommendations.push({
      title: 'Add Skip Navigation Link',
      description: 'Improve accessibility with a skip-to-main-content link.',
      priority: 'low',
      effort: 'low',
      category: 'accessibility'
    });
  } else {
    passed.push({
      name: 'Skip Navigation',
      description: 'Skip to main content link present',
      category: 'accessibility'
    });
  }

  // Focus management
  const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
  const visibleFocusable = Array.from(focusableElements).filter(el => {
    const style = window.getComputedStyle(el as Element);
    return style.display !== 'none' && style.visibility !== 'hidden';
  });

  if (visibleFocusable.length > 0) {
    passed.push({
      name: 'Focusable Elements',
      description: `${visibleFocusable.length} focusable elements for keyboard navigation`,
      category: 'accessibility'
    });
  }

  // ARIA labels
  const ariaElements = document.querySelectorAll('[aria-label], [aria-labelledby], [role]');
  if (ariaElements.length > 0) {
    passed.push({
      name: 'ARIA Attributes',
      description: `${ariaElements.length} elements with ARIA attributes`,
      category: 'accessibility'
    });
  }
}

/**
 * Generates an SEO report as HTML
 */
export function generateSEOReportHTML(auditResult: SEOAuditResult): string {
  const { score, issues, recommendations, passed } = auditResult;
  
  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#22c55e';
    if (score >= 70) return '#eab308';
    return '#ef4444';
  };

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'high': return '#ef4444';
      case 'medium': return '#eab308';
      case 'low': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: #fff; color: #333;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1f2937; margin-bottom: 10px;">SEO Audit Report</h1>
        <div style="font-size: 48px; font-weight: bold; color: ${getScoreColor(score)}; margin-bottom: 10px;">${score}/100</div>
        <p style="color: #6b7280; margin: 0;">Generated on ${new Date(auditResult.metadata.timestamp).toLocaleString()}</p>
      </div>

      ${issues.length > 0 ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #ef4444; border-bottom: 2px solid #ef4444; padding-bottom: 5px;">Issues Found (${issues.length})</h2>
        ${issues.map(issue => `
          <div style="background: #fef2f2; border-left: 4px solid ${getImpactColor(issue.impact)}; padding: 15px; margin-bottom: 10px; border-radius: 0 4px 4px 0;">
            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 5px;">
              <span style="background: ${getImpactColor(issue.impact)}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; text-transform: uppercase; font-weight: bold;">${issue.impact}</span>
              <span style="background: #ddd; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-left: 10px;">${issue.category}</span>
            </div>
            <strong style="color: #1f2937;">${issue.message}</strong>
            ${issue.fix ? `<p style="margin: 5px 0 0 0; color: #059669; font-size: 14px;"><strong>Fix:</strong> ${issue.fix}</p>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${recommendations.length > 0 ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #eab308; border-bottom: 2px solid #eab308; padding-bottom: 5px;">Recommendations (${recommendations.length})</h2>
        ${recommendations.map(rec => `
          <div style="background: #fffbeb; border-left: 4px solid #eab308; padding: 15px; margin-bottom: 10px; border-radius: 0 4px 4px 0;">
            <strong style="color: #1f2937;">${rec.title}</strong>
            <p style="margin: 5px 0; color: #374151;">${rec.description}</p>
            <div style="font-size: 12px;">
              <span style="background: #eab308; color: white; padding: 2px 8px; border-radius: 12px; margin-right: 5px;">Priority: ${rec.priority}</span>
              <span style="background: #ddd; padding: 2px 8px; border-radius: 12px;">Effort: ${rec.effort}</span>
            </div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      <div style="margin-bottom: 30px;">
        <h2 style="color: #22c55e; border-bottom: 2px solid #22c55e; padding-bottom: 5px;">Passed Checks (${passed.length})</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
          ${passed.map(check => `
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px; border-radius: 4px; text-align: center;">
              <div style="color: #22c55e; font-size: 20px; margin-bottom: 5px;">✓</div>
              <strong style="color: #1f2937; font-size: 14px;">${check.name}</strong>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; text-align: center;">
        <h3 style="color: #1f2937; margin-top: 0;">Next Steps</h3>
        <p style="color: #6b7280; margin-bottom: 15px;">Focus on fixing high-impact issues first, then implement the recommended improvements.</p>
        <p style="color: #6b7280; font-size: 12px; margin: 0;">Report URL: ${auditResult.metadata.url}</p>
      </div>
    </div>
  `;
}

// Export the audit utilities
export const seoAudit = {
  performSEOAudit,
  generateSEOReportHTML,
  runQuickAudit: () => {
    const result = performSEOAudit();
    console.log('🔍 SEO Audit Results:', result);
    console.log(`📊 Score: ${result.score}/100`);
    console.log(`❌ Issues: ${result.issues.length}`);
    console.log(`💡 Recommendations: ${result.recommendations.length}`);
    console.log(`✅ Passed: ${result.passed.length}`);
    return result;
  }
};

// Make available globally in development
if (process.env.NODE_ENV === 'development') {
  (window as any).seoAudit = seoAudit;
  console.log('🔍 SEO Audit Tool loaded');
  console.log('Available commands:');
  console.log('- seoAudit.performSEOAudit()');
  console.log('- seoAudit.runQuickAudit()');
  console.log('- seoAudit.generateSEOReportHTML(auditResult)');
}
