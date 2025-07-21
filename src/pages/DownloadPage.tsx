import React, { useState } from "react";
import { SEOHead } from "../components/SEOHead";
import MattixLogo from "../components/MattixLogo";
import {
  RiDownloadLine,
  RiFileZipLine,
  RiImage2Line,
  RiCodeLine,
  RiPaletteLine,
  RiCheckLine,
  RiSparklingLine,
} from "@remixicon/react";

const DownloadPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'logos' | 'assets' | 'code'>('all');

  const downloadCategories = [
    { id: 'all', label: 'All Assets', icon: RiFileZipLine },
    { id: 'logos', label: 'Logo Files', icon: RiImage2Line },
    { id: 'assets', label: 'Brand Assets', icon: RiPaletteLine },
    { id: 'code', label: 'Code Examples', icon: RiCodeLine },
  ];

  const downloadItems = [
    {
      category: 'logos',
      name: 'Mattix Logo - Complete Set',
      description: 'SVG, PNG, and ICO formats in multiple sizes',
      size: '2.4 MB',
      formats: ['SVG', 'PNG', 'ICO'],
      preview: <MattixLogo size={60} />,
      downloadAction: () => {
        // Download complete logo set
        console.log('Downloading complete logo set');
      }
    },
    {
      category: 'logos',
      name: 'Mattix Logo - SVG Only',
      description: 'Scalable vector format for web and print',
      size: '12 KB',
      formats: ['SVG'],
      preview: <MattixLogo size={60} />,
      downloadAction: () => {
        // Download SVG only
        const svg = document.querySelector('.mattix-logo svg');
        if (svg) {
          const svgData = new XMLSerializer().serializeToString(svg);
          const blob = new Blob([svgData], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'mattix-logo.svg';
          link.click();
        }
      }
    },
    {
      category: 'assets',
      name: 'Brand Color Palette',
      description: 'Complete color specifications and swatches',
      size: '856 KB',
      formats: ['ASE', 'ACO', 'CSS'],
      preview: (
        <div className="color-preview">
          <div className="color-dot" style={{backgroundColor: '#4FACFE'}}></div>
          <div className="color-dot" style={{backgroundColor: '#00F2FE'}}></div>
          <div className="color-dot" style={{backgroundColor: '#0a0a0a'}}></div>
        </div>
      ),
      downloadAction: () => {
        console.log('Downloading color palette');
      }
    },
    {
      category: 'assets',
      name: 'Brand Guidelines PDF',
      description: 'Complete brand usage guidelines and standards',
      size: '3.2 MB',
      formats: ['PDF'],
      preview: <RiPaletteLine size={60} />,
      downloadAction: () => {
        console.log('Downloading brand guidelines');
      }
    },
    {
      category: 'code',
      name: 'React Logo Component',
      description: 'Ready-to-use React component with TypeScript',
      size: '15 KB',
      formats: ['TSX', 'JSX'],
      preview: <RiCodeLine size={60} />,
      downloadAction: () => {
        console.log('Downloading React component');
      }
    },
    {
      category: 'code',
      name: 'CSS Animations',
      description: 'GPU-accelerated CSS animations and transitions',
      size: '8 KB',
      formats: ['CSS'],
      preview: <RiSparklingLine size={60} />,
      downloadAction: () => {
        console.log('Downloading CSS animations');
      }
    },
    {
      category: 'all',
      name: 'Complete Brand Kit',
      description: 'Everything you need - logos, assets, guidelines, and code',
      size: '12.8 MB',
      formats: ['ZIP'],
      preview: <RiFileZipLine size={60} />,
      downloadAction: () => {
        console.log('Downloading complete brand kit');
      }
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? downloadItems 
    : downloadItems.filter(item => item.category === selectedCategory || item.category === 'all');

  return (
    <>
      <SEOHead pageKey="download" />
      <div className="download-page gpu-accelerated">
        {/* Header */}
        <header className="download-header">
          <div className="container">
            <MattixLogo size={100} animated={true} />
            <h1>Download Brand Assets</h1>
            <p className="header-subtitle">
              Get official Mattix brand assets for your projects. All files are optimized and ready to use.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="download-main">
          {/* Quick Download Section */}
          <section className="quick-download-section">
            <div className="container">
              <div className="quick-download-card">
                <div className="card-content">
                  <div className="card-icon">
                    <RiFileZipLine size={48} />
                  </div>
                  <div className="card-info">
                    <h3>Complete Brand Kit</h3>
                    <p>Get everything in one download - perfect for agencies and design teams</p>
                    <ul className="kit-includes">
                      <li><RiCheckLine className="check-icon" /> Logo files (SVG, PNG, ICO)</li>
                      <li><RiCheckLine className="check-icon" /> Color palettes and guidelines</li>
                      <li><RiCheckLine className="check-icon" /> React components and CSS</li>
                      <li><RiCheckLine className="check-icon" /> Brand usage documentation</li>
                    </ul>
                  </div>
                  <div className="card-action">
                    <button className="btn btn-primary btn-large">
                      <RiDownloadLine className="btn-icon" />
                      Download Complete Kit
                    </button>
                    <span className="file-size">12.8 MB ZIP</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Category Filters */}
          <section className="downloads-section">
            <div className="container">
              <div className="section-header">
                <h2>Browse by Category</h2>
                <p>Choose what you need for your specific project requirements</p>
              </div>

              <div className="category-filters">
                {downloadCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category.id as any)}
                    >
                      <Icon className="filter-icon" />
                      {category.label}
                    </button>
                  );
                })}
              </div>

              {/* Download Items Grid */}
              <div className="download-items-grid">
                {filteredItems.map((item, index) => (
                  <div key={index} className="download-item">
                    <div className="item-preview">
                      {item.preview}
                    </div>
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      <div className="item-details">
                        <span className="file-size">{item.size}</span>
                        <div className="file-formats">
                          {item.formats.map((format, fIndex) => (
                            <span key={fIndex} className="format-tag">{format}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="item-action">
                      <button 
                        className="btn btn-secondary"
                        onClick={item.downloadAction}
                      >
                        <RiDownloadLine className="btn-icon" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive Logo Generator */}
          <section className="generator-section">
            <div className="container">
              <div className="section-header">
                <h2>Need Something Custom?</h2>
                <p>Use our interactive logo generator to create variations</p>
              </div>
              
              <div className="generator-preview">
                <div className="preview-logo">
                  <MattixLogo size={150} animated={true} />
                </div>
                <div className="generator-info">
                  <h3>Interactive Logo Generator</h3>
                  <p>
                    Create custom logo variations with different sizes, colors, and formats. 
                    Perfect for specific use cases and brand applications.
                  </p>
                  <div className="generator-features">
                    <div className="feature">
                      <RiPaletteLine className="feature-icon" />
                      <span>Custom Colors</span>
                    </div>
                    <div className="feature">
                      <RiImage2Line className="feature-icon" />
                      <span>Multiple Formats</span>
                    </div>
                    <div className="feature">
                      <RiSparklingLine className="feature-icon" />
                      <span>Live Preview</span>
                    </div>
                  </div>
                  <a href="/generator" className="btn btn-primary">
                    Try Logo Generator
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="usage-section">
            <div className="container">
              <div className="usage-card">
                <h3>Usage Guidelines</h3>
                <div className="guidelines-content">
                  <div className="guideline">
                    <RiCheckLine className="guideline-icon success" />
                    <div>
                      <strong>Commercial Use:</strong> Free for commercial projects and client work
                    </div>
                  </div>
                  <div className="guideline">
                    <RiCheckLine className="guideline-icon success" />
                    <div>
                      <strong>Modification:</strong> You may modify colors and sizes as needed
                    </div>
                  </div>
                  <div className="guideline">
                    <RiCheckLine className="guideline-icon success" />
                    <div>
                      <strong>Attribution:</strong> Attribution appreciated but not required
                    </div>
                  </div>
                  <div className="guideline">
                    <span className="guideline-icon info">i</span>
                    <div>
                      <strong>Questions:</strong> Contact us at <a href="mailto:brand@mattixbrand.com">brand@mattixbrand.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="download-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-logo">
                <MattixLogo size={60} />
                <span>Mattix Brand</span>
              </div>
              <div className="footer-links">
                <a href="/brand-guidelines">Brand Guidelines</a>
                <a href="/docs">Documentation</a>
                <a href="/about">About</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default DownloadPage;
