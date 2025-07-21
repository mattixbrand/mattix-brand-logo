// Google Tag Manager utility functions for React SPA
// Helps track page views and custom events in single-page applications

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Pushes a page view event to Google Tag Manager
 * @param url - The page URL (e.g., '/logo', '/generator')
 * @param title - The page title
 */
export const gtmPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_location: `https://brand.mattixs.com${url}`,
      page_path: url,
      page_title: title || document.title,
    });
  }
};

/**
 * Pushes a custom event to Google Tag Manager
 * @param eventName - Name of the event
 * @param parameters - Additional event parameters
 */
export const gtmEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }
};

/**
 * Track logo downloads for analytics
 * @param format - File format (png, svg, ico)
 * @param size - Logo size
 * @param variant - Logo variant (default, mono, etc.)
 */
export const trackLogoDownload = (format: string, size: number, variant: string) => {
  gtmEvent('logo_download', {
    file_format: format,
    logo_size: size,
    logo_variant: variant,
    category: 'engagement',
  });
};

/**
 * Track color system interactions
 * @param action - Action type (copy_color, view_framework)
 * @param colorName - Color name or framework name
 */
export const trackColorInteraction = (action: string, colorName?: string) => {
  gtmEvent('color_interaction', {
    interaction_type: action,
    color_name: colorName,
    category: 'engagement',
  });
};

/**
 * Track navigation events
 * @param destination - Where the user is going
 * @param source - Where they came from (optional)
 */
export const trackNavigation = (destination: string, source?: string) => {
  gtmEvent('navigation', {
    destination_page: destination,
    source_page: source,
    category: 'navigation',
  });
};

/**
 * Track logo generator usage
 * @param action - Action type (generate, customize, export)
 * @param details - Additional details about the action
 */
export const trackGeneratorUsage = (action: string, details: Record<string, any> = {}) => {
  gtmEvent('generator_usage', {
    generator_action: action,
    ...details,
    category: 'tool_usage',
  });
};

/**
 * Initialize GTM page view tracking for React Router
 * Call this in your main App component or router setup
 */
export const initializeGTM = () => {
  // Initialize dataLayer if it doesn't exist
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    
    // Track initial page view
    gtmPageView(window.location.pathname, document.title);
  }
};
