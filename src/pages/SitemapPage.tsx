import React, { useState, useEffect } from 'react';
import { trackNavigation } from '../utils/gtm';
import '../styles/sitemap-page.css';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

interface ExampleSitemap {
  name: string;
  url: string;
  description: string;
  icon: string;
}

const SitemapPage: React.FC = () => {
  const [sitemap, setSitemap] = useState<SitemapEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'current' | 'examples'>('current');

  // Example sitemaps from well-known websites
  const exampleSitemaps: ExampleSitemap[] = [
    {
      name: 'Apple',
      url: 'https://www.apple.com/sitemap.xml',
      description: 'Apple\'s comprehensive sitemap covering products, support, and corporate pages',
      icon: '🍎'
    },
    {
      name: 'Google',
      url: 'https://www.google.com/sitemap.xml',
      description: 'Google\'s main sitemap index',
      icon: '🔍'
    },
    {
      name: 'Microsoft',
      url: 'https://www.microsoft.com/sitemap.xml',
      description: 'Microsoft\'s product and service sitemap',
      icon: '🪟'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/sitemap.xml',
      description: 'GitHub\'s platform sitemap',
      icon: '📱'
    },
    {
      name: 'Stack Overflow',
      url: 'https://stackoverflow.com/sitemap.xml',
      description: 'Stack Overflow\'s Q&A sitemap index',
      icon: '📚'
    }
  ];

  useEffect(() => {
    // Track page view
    trackNavigation('/sitemap', window.location.pathname);

    // Load and parse the sitemap
    loadSitemap();
  }, []);

  const loadSitemap = async () => {
    try {
      const response = await fetch('/sitemap.xml');
      const xmlText = await response.text();
      
      // Parse XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      // Extract URL entries
      const urls = Array.from(xmlDoc.querySelectorAll('url')).map(url => ({
        loc: url.querySelector('loc')?.textContent || '',
        lastmod: url.querySelector('lastmod')?.textContent || '',
        changefreq: url.querySelector('changefreq')?.textContent || '',
        priority: url.querySelector('priority')?.textContent || ''
      }));
      
      setSitemap(urls);
    } catch (error) {
      console.error('Error loading sitemap:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getPriorityColor = (priority: string) => {
    const val = parseFloat(priority);
    if (val >= 0.8) return 'priority-high';
    if (val >= 0.6) return 'priority-medium';
    if (val >= 0.4) return 'priority-normal';
    return 'priority-low';
  };

  const getChangefreqIcon = (changefreq: string) => {
    switch (changefreq) {
      case 'always': return '🔄';
      case 'hourly': return '⏰';
      case 'daily': return '📅';
      case 'weekly': return '📆';
      case 'monthly': return '🗓️';
      case 'yearly': return '📋';
      case 'never': return '📌';
      default: return '❓';
    }
  };

  return (
    <div className="sitemap-page">
      <div className="sitemap-container">
        {/* Header */}
        <div className="sitemap-header">
          <div className="sitemap-icon">
            <span>🗺️</span>
          </div>
          <h1 className="sitemap-title">
            Sitemap Explorer
          </h1>
          <p className="sitemap-subtitle">
            Navigate our digital ecosystem and discover how industry leaders structure their web architecture
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="sitemap-tabs">
          <div className="sitemap-tabs-container">
            <button
              onClick={() => setActiveTab('current')}
              className={`sitemap-tab ${activeTab === 'current' ? 'active' : ''}`}
            >
              Our Sitemap
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={`sitemap-tab ${activeTab === 'examples' ? 'active' : ''}`}
            >
              Example Sitemaps
            </button>
          </div>
        </div>

        <div className="sitemap-content">
          {/* Current Sitemap Tab */}
          {activeTab === 'current' && (
            <div className="sitemap-table-container">
              <div className="sitemap-table-header">
                <div className="sitemap-table-header-content">
                  <div>
                    <h2 className="sitemap-table-title">Mattix Brand Sitemap</h2>
                    <div className="sitemap-table-stats">
                      <span className="sitemap-pages-badge">
                        <span className="sitemap-status-dot"></span>
                        {sitemap.length} pages
                      </span>
                      <span style={{ color: '#64748b' }}>•</span>
                      <span style={{ color: '#64748b' }}>Last updated: {formatDate(new Date().toISOString())}</span>
                    </div>
                  </div>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sitemap-xml-button"
                  >
                    📄 View XML
                  </a>
                </div>
              </div>

              <div className="sitemap-table-body">
                {loading ? (
                  <div className="sitemap-loading">
                    <div className="sitemap-loading-spinner">
                      <div className="sitemap-loading-ring"></div>
                      <div className="sitemap-loading-ring"></div>
                      <div className="sitemap-loading-ring"></div>
                    </div>
                    <p className="sitemap-loading-text">Loading sitemap...</p>
                  </div>
                ) : (
                  <div className="sitemap-table-wrapper">
                    <table className="sitemap-table">
                      <thead>
                        <tr>
                          <th>Page</th>
                          <th>Last Modified</th>
                          <th>Update Frequency</th>
                          <th>Priority</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sitemap.map((entry, index) => (
                          <tr key={index}>
                            <td>
                              <a
                                href={entry.loc}
                                className="sitemap-page-link"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span>
                                  {entry.loc.replace('https://brand.mattixs.com', '') || '/'}
                                </span>
                                <span className="arrow">→</span>
                              </a>
                            </td>
                            <td className="sitemap-date">
                              {formatDate(entry.lastmod)}
                            </td>
                            <td>
                              <div className="sitemap-frequency">
                                <span className="sitemap-frequency-icon">{getChangefreqIcon(entry.changefreq)}</span>
                                <span className="sitemap-frequency-text">{entry.changefreq}</span>
                              </div>
                            </td>
                            <td>
                              <span className={`sitemap-priority-badge ${getPriorityColor(entry.priority)}`}>
                                {entry.priority}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Example Sitemaps Tab */}
          {activeTab === 'examples' && (
            <div className="examples-section">
              <div className="examples-header">
                <h2 className="examples-title">
                  ✨ Learn from the Best
                </h2>
                <p className="examples-subtitle">
                  Discover how industry leaders architect their digital presence and organize thousands of pages
                </p>
              </div>

              <div className="examples-grid">
                {exampleSitemaps.map((example, index) => (
                  <div key={index} className="example-card">
                    <div className="example-card-glow"></div>
                    <div className="example-card-content">
                      <div className="example-card-border"></div>
                      
                      <div className="example-card-body">
                        <div className="example-card-header">
                          <div className="example-card-icon">
                            {example.icon}
                          </div>
                          <h3 className="example-card-name">{example.name}</h3>
                        </div>
                        
                        <p className="example-card-description">
                          {example.description}
                        </p>
                        
                        <div className="example-card-actions">
                          <a
                            href={example.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="example-card-button"
                          >
                            Explore Sitemap
                          </a>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(example.url);
                              // Could add a toast notification here
                            }}
                            className="example-copy-button"
                            title="Copy URL"
                          >
                            📋
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SEO Tips */}
              <div className="seo-tips">
                <div className="seo-tips-background"></div>
                <div className="seo-tips-content">
                  <div className="seo-tips-header">
                    <div className="seo-tips-icon">💡</div>
                    <h3 className="seo-tips-title">Sitemap Best Practices</h3>
                  </div>
                  <div className="seo-tips-grid">
                    <div className="seo-tip-section">
                      <h4 className="seo-tip-title">
                        <div className="seo-tip-indicator"></div>
                        Priority Guidelines
                      </h4>
                      <div className="seo-tip-list">
                        <div className="seo-tip-item">
                          <div className="seo-tip-dot" style={{ backgroundColor: '#10b981' }}></div>
                          <span className="seo-tip-text"><strong>1.0:</strong> Homepage and most important pages</span>
                        </div>
                        <div className="seo-tip-item">
                          <div className="seo-tip-dot" style={{ backgroundColor: '#3b82f6' }}></div>
                          <span className="seo-tip-text"><strong>0.8-0.9:</strong> Key product/service pages</span>
                        </div>
                        <div className="seo-tip-item">
                          <div className="seo-tip-dot" style={{ backgroundColor: '#eab308' }}></div>
                          <span className="seo-tip-text"><strong>0.6-0.7:</strong> Secondary content pages</span>
                        </div>
                        <div className="seo-tip-item">
                          <div className="seo-tip-dot" style={{ backgroundColor: '#9ca3af' }}></div>
                          <span className="seo-tip-text"><strong>0.3-0.5:</strong> Archive or less important pages</span>
                        </div>
                      </div>
                    </div>
                    <div className="seo-tip-section">
                      <h4 className="seo-tip-title">
                        <div className="seo-tip-indicator" style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)' }}></div>
                        Update Frequency
                      </h4>
                      <div className="seo-tip-list">
                        <div className="seo-tip-item">
                          <span style={{ fontSize: '1.1rem' }}>🔄</span>
                          <span className="seo-tip-text"><strong>Daily/Weekly:</strong> Blog posts, news</span>
                        </div>
                        <div className="seo-tip-item">
                          <span style={{ fontSize: '1.1rem' }}>📅</span>
                          <span className="seo-tip-text"><strong>Monthly:</strong> Product pages, documentation</span>
                        </div>
                        <div className="seo-tip-item">
                          <span style={{ fontSize: '1.1rem' }}>📋</span>
                          <span className="seo-tip-text"><strong>Yearly:</strong> About, contact, static pages</span>
                        </div>
                        <div className="seo-tip-item">
                          <span style={{ fontSize: '1.1rem' }}>📌</span>
                          <span className="seo-tip-text"><strong>Never:</strong> Archived content</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
