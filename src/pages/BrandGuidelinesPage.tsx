import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "../components/SEOHead";
import MattixLogo from "../components/MattixLogo";
import {
  RiRuler2Line,
  RiPaletteLine,
  RiLayoutLine,
  RiCheckLine,
  RiCloseLine,
  RiDownloadLine,
  RiEyeLine,
  RiInformationLine,
} from "@remixicon/react";

const BrandGuidelinesPage: React.FC = () => {
  const [selectedColorFormat, setSelectedColorFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');

  const brandColors = {
    primary: {
      name: 'Mattix Blue',
      hex: '#4FACFE',
      rgb: 'rgb(79, 172, 254)',
      hsl: 'hsl(207, 98%, 65%)',
      description: 'Primary brand color for main elements and CTAs'
    },
    secondary: {
      name: 'Deep Blue',
      hex: '#00F2FE',
      rgb: 'rgb(0, 242, 254)',
      hsl: 'hsl(183, 100%, 50%)',
      description: 'Secondary accent color for gradients and highlights'
    },
    dark: {
      name: 'Mattix Dark',
      hex: '#0a0a0a',
      rgb: 'rgb(10, 10, 10)',
      hsl: 'hsl(0, 0%, 4%)',
      description: 'Primary dark color for backgrounds and text'
    },
    light: {
      name: 'Pure White',
      hex: '#ffffff',
      rgb: 'rgb(255, 255, 255)',
      hsl: 'hsl(0, 0%, 100%)',
      description: 'Light color for contrast and clean backgrounds'
    }
  };

  const logoSizes = [
    { name: 'Extra Small', size: 32, usage: 'Favicons, small icons' },
    { name: 'Small', size: 64, usage: 'Navigation, mobile headers' },
    { name: 'Medium', size: 128, usage: 'Standard web usage' },
    { name: 'Large', size: 256, usage: 'Hero sections, main displays' },
    { name: 'Extra Large', size: 400, usage: 'Print materials, presentations' }
  ];

  return (
    <>
      <SEOHead pageKey="brandGuidelines" />
      <div className="brand-guidelines-page gpu-accelerated">
        {/* Header */}
        <header className="guidelines-header">
          <div className="container">
            <MattixLogo size={100} animated={true} />
            <h1>Brand Guidelines</h1>
            <p className="header-subtitle">
              Visual identity standards and usage guidelines for the Mattix brand
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="guidelines-main">
          {/* Logo Usage Section */}
          <section className="guideline-section logo-section">
            <div className="container">
              <div className="section-header">
                <RiLayoutLine className="section-icon" />
                <h2>Logo Usage</h2>
                <p>Our logo is the cornerstone of our brand identity. Use it correctly to maintain brand consistency.</p>
              </div>

              {/* Logo Variations */}
              <div className="subsection">
                <h3>Logo Variations</h3>
                <div className="logo-variations">
                  <div className="logo-variant">
                    <div className="variant-display">
                      <MattixLogo size={120} />
                    </div>
                    <div className="variant-info">
                      <h4>Primary Logo</h4>
                      <p>Use this version whenever possible. Minimum size: 32px</p>
                    </div>
                  </div>
                  <div className="logo-variant">
                    <div className="variant-display dark-bg">
                      <MattixLogo size={120} />
                    </div>
                    <div className="variant-info">
                      <h4>On Dark Backgrounds</h4>
                      <p>Primary logo works well on dark backgrounds</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear Space */}
              <div className="subsection">
                <h3>Clear Space & Sizing</h3>
                <div className="sizing-grid">
                  {logoSizes.map((size, index) => (
                    <div key={index} className="size-example">
                      <div className="size-display">
                        <MattixLogo size={Math.min(size.size, 120)} />
                      </div>
                      <div className="size-info">
                        <strong>{size.name}</strong>
                        <span>{size.size}px</span>
                        <small>{size.usage}</small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="sizing-note">
                  <RiInformationLine className="note-icon" />
                  <p>Always maintain a clear space around the logo equal to half the logo's height.</p>
                </div>
              </div>

              {/* Do's and Don'ts */}
              <div className="subsection">
                <h3>Do's and Don'ts</h3>
                <div className="dos-donts-grid">
                  <div className="do-dont-item do">
                    <div className="item-display">
                      <MattixLogo size={80} />
                      <RiCheckLine className="status-icon" />
                    </div>
                    <p><strong>DO:</strong> Use the logo at appropriate sizes</p>
                  </div>
                  <div className="do-dont-item do">
                    <div className="item-display">
                      <MattixLogo size={80} />
                      <RiCheckLine className="status-icon" />
                    </div>
                    <p><strong>DO:</strong> Maintain proper clear space</p>
                  </div>
                  <div className="do-dont-item dont">
                    <div className="item-display distorted">
                      <div style={{ transform: 'scaleX(1.5)' }}>
                        <MattixLogo size={80} />
                      </div>
                      <RiCloseLine className="status-icon" />
                    </div>
                    <p><strong>DON'T:</strong> Stretch or distort the logo</p>
                  </div>
                  <div className="do-dont-item dont">
                    <div className="item-display">
                      <MattixLogo size={20} />
                      <RiCloseLine className="status-icon" />
                    </div>
                    <p><strong>DON'T:</strong> Use the logo smaller than 32px</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Color Palette Section */}
          <section className="guideline-section color-section">
            <div className="container">
              <div className="section-header">
                <RiPaletteLine className="section-icon" />
                <h2>Color Palette</h2>
                <p>Our carefully selected colors ensure brand consistency across all touchpoints.</p>
              </div>

              <div className="color-format-selector">
                <button 
                  className={selectedColorFormat === 'hex' ? 'active' : ''}
                  onClick={() => setSelectedColorFormat('hex')}
                >
                  HEX
                </button>
                <button 
                  className={selectedColorFormat === 'rgb' ? 'active' : ''}
                  onClick={() => setSelectedColorFormat('rgb')}
                >
                  RGB
                </button>
                <button 
                  className={selectedColorFormat === 'hsl' ? 'active' : ''}
                  onClick={() => setSelectedColorFormat('hsl')}
                >
                  HSL
                </button>
              </div>

              <div className="color-palette">
                {Object.entries(brandColors).map(([key, color]) => (
                  <div key={key} className="color-card">
                    <div 
                      className="color-swatch" 
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <div className="color-info">
                      <h4>{color.name}</h4>
                      <code className="color-value">
                        {color[selectedColorFormat]}
                      </code>
                      <p>{color.description}</p>
                      <button className="copy-color-btn">
                        <RiEyeLine className="btn-icon" />
                        Copy {selectedColorFormat.toUpperCase()}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Typography Section */}
          <section className="guideline-section typography-section">
            <div className="container">
              <div className="section-header">
                <RiLayoutLine className="section-icon" />
                <h2>Typography</h2>
                <p>Consistent typography reinforces our brand voice and improves readability.</p>
              </div>

              <div className="typography-examples">
                <div className="typo-example">
                  <h1 className="typo-sample">Mattix Brand Heading</h1>
                  <div className="typo-info">
                    <strong>Primary Headings</strong>
                    <p>Font: System UI, -apple-system, sans-serif</p>
                    <p>Weight: 600-700</p>
                    <p>Usage: Main titles, hero text</p>
                  </div>
                </div>
                <div className="typo-example">
                  <h3 className="typo-sample">Section Subheading</h3>
                  <div className="typo-info">
                    <strong>Subheadings</strong>
                    <p>Weight: 500-600</p>
                    <p>Usage: Section titles, card headers</p>
                  </div>
                </div>
                <div className="typo-example">
                  <p className="typo-sample">
                    This is body text that provides information and context. 
                    It should be highly readable and accessible.
                  </p>
                  <div className="typo-info">
                    <strong>Body Text</strong>
                    <p>Weight: 400</p>
                    <p>Line height: 1.6</p>
                    <p>Usage: Descriptions, content</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Measurements Section */}
          <section className="guideline-section measurements-section">
            <div className="container">
              <div className="section-header">
                <RiRuler2Line className="section-icon" />
                <h2>Measurements & Spacing</h2>
                <p>Consistent spacing creates visual harmony and improves user experience.</p>
              </div>

              <div className="spacing-guide">
                <div className="spacing-example">
                  <h4>Standard Spacing Scale</h4>
                  <div className="spacing-scale">
                    <div className="spacing-item">
                      <div className="spacing-bar" style={{width: '8px'}}></div>
                      <span>8px - Micro</span>
                    </div>
                    <div className="spacing-item">
                      <div className="spacing-bar" style={{width: '16px'}}></div>
                      <span>16px - Small</span>
                    </div>
                    <div className="spacing-item">
                      <div className="spacing-bar" style={{width: '24px'}}></div>
                      <span>24px - Medium</span>
                    </div>
                    <div className="spacing-item">
                      <div className="spacing-bar" style={{width: '32px'}}></div>
                      <span>32px - Large</span>
                    </div>
                    <div className="spacing-item">
                      <div className="spacing-bar" style={{width: '48px'}}></div>
                      <span>48px - Extra Large</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Download Section */}
          <section className="guideline-section download-section">
            <div className="container">
              <div className="section-header">
                <RiDownloadLine className="section-icon" />
                <h2>Download Assets</h2>
                <p>Get all the brand assets you need for your projects.</p>
              </div>

              <div className="download-grid">
                <div className="download-card">
                  <h4>Complete Brand Kit</h4>
                  <p>Logo files, color palettes, and brand guidelines</p>
                  <Link to="/download" className="btn btn-primary">
                    <RiDownloadLine className="btn-icon" />
                    Download Kit
                  </Link>
                </div>
                <div className="download-card">
                  <h4>Logo Generator</h4>
                  <p>Create custom logo variations for your needs</p>
                  <Link to="/generator" className="btn btn-secondary">
                    Try Generator
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="guidelines-footer">
          <div className="container">
            <p>For questions about brand usage, please contact us at <a href="mailto:brand@mattixbrand.com">brand@mattixbrand.com</a></p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default BrandGuidelinesPage;
