import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "../components/SEOHead";
import { ExportableLogo } from "../components/ExportableLogo";
import MattixLogo from "../components/MattixLogo";
import {
  RiBookLine,
  RiCodeLine,
  RiDownloadLine,
  RiHome3Line,
  RiEyeLine,
  RiSettingsLine,
  RiPaletteLine,
  RiImageLine,
  RiFileCopyLine,
  RiCheckLine,
} from "@remixicon/react";

const DocumentationPage: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    basicUsage: `import MattixLogo from './components/MattixLogo';

function App() {
  return (
    <div>
      <MattixLogo size={200} animated={true} />
    </div>
  );
}`,

    staticVersion: `import MattixLogo from './components/MattixLogo';

function App() {
  return (
    <div>
      <MattixLogo 
        size={150} 
        animated={false} 
        className="static-logo" 
      />
    </div>
  );
}`,

    exportableLogo: `import { ExportableLogo } from './components/ExportableLogo';

function App() {
  return (
    <div>
      <ExportableLogo 
        size={256}
        variant="mono"
        backgroundColor="white"
      />
    </div>
  );
}`,

    logoExporter: `import { LogoExporter } from './utils/logoExporter';

const exportLogo = async () => {
  const exporter = new LogoExporter();
  
  await exporter.downloadLogo({
    size: 512,
    format: 'png',
    backgroundColor: 'transparent',
    variant: 'default'
  });
  
  exporter.dispose();
};`,

    colorSystem: `// Primary Colors
const colors = {
  primary: '#007acc',
  secondary: '#00d4ff',
  accent: '#0066cc',
  
  // Gradients
  primaryGradient: 'linear-gradient(135deg, #007acc, #00d4ff)',
  backgroundGradient: 'linear-gradient(135deg, #667eea, #764ba2)',
  
  // Semantic Colors
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6'
};`,

    installation: `# Install dependencies
npm install react react-dom typescript

# Clone the MATTIX brand assets
git clone https://github.com/your-repo/mattix-brand-logo.git

# Install project dependencies
cd mattix-brand-logo
npm install

# Start development server
npm run dev`,
  };

  return (
    <>
      <SEOHead pageKey="docs" />
      <div className="docs-page">
      {/* Header */}
      <header className="docs-header">
        <div className="header-content">
          <Link to="/" className="back-link">
            <RiHome3Line size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="page-title">
            <RiBookLine size={40} />
            Documentation
          </h1>
          <p className="page-subtitle">
            Complete guide to using MATTIX brand components and assets
          </p>
        </div>
      </header>

      <div className="docs-container">
        {/* Quick Links */}
        <nav className="docs-nav">
          <div className="nav-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#getting-started">Getting Started</a>
              </li>
              <li>
                <a href="#components">Components</a>
              </li>
              <li>
                <a href="#logo-variants">Logo Variants</a>
              </li>
              <li>
                <a href="#color-system">Color System</a>
              </li>
              <li>
                <a href="#export-guide">Export Guide</a>
              </li>
              <li>
                <a href="#integration">Integration</a>
              </li>
            </ul>
          </div>
          <div className="nav-links">
            <Link to="/logo" className="nav-demo-link">
              <RiEyeLine size={16} />
              Live Demo
            </Link>
            <Link to="/generator" className="nav-demo-link">
              <RiImageLine size={16} />
              Logo Generator
            </Link>
            <Link to="/colors" className="nav-demo-link">
              <RiPaletteLine size={16} />
              Color System
            </Link>
          </div>
        </nav>

        {/* Content */}
        <main className="docs-content">
          {/* Getting Started */}
          <section id="getting-started" className="docs-section">
            <h2>
              <RiSettingsLine size={24} />
              Getting Started
            </h2>
            <p>
              MATTIX is a modern, animated brand identity system built with
              React and TypeScript. It features dynamic logo animations, a
              comprehensive color system, and tools for generating brand assets
              in multiple formats.
            </p>

            <div className="code-block">
              <div className="code-header">
                <span>Installation</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    copyToClipboard(codeExamples.installation, "installation")
                  }
                >
                  {copiedCode === "installation" ? (
                    <RiCheckLine size={16} />
                  ) : (
                    <RiFileCopyLine size={16} />
                  )}
                </button>
              </div>
              <pre>
                <code>{codeExamples.installation}</code>
              </pre>
            </div>
          </section>

          {/* Components */}
          <section id="components" className="docs-section">
            <h2>
              <RiCodeLine size={24} />
              Components
            </h2>

            <div className="component-showcase">
              <div className="showcase-item">
                <div className="showcase-preview">
                  <MattixLogo size={120} animated={true} />
                </div>
                <div className="showcase-info">
                  <h3>MattixLogo</h3>
                  <p>
                    The main animated logo component with morphing infinity
                    symbol.
                  </p>

                  <div className="props-table">
                    <h4>Props</h4>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <code>size</code>
                          </td>
                          <td>
                            <code>number</code>
                          </td>
                          <td>Logo size in pixels (default: 200)</td>
                        </tr>
                        <tr>
                          <td>
                            <code>animated</code>
                          </td>
                          <td>
                            <code>boolean</code>
                          </td>
                          <td>Enable/disable animations (default: true)</td>
                        </tr>
                        <tr>
                          <td>
                            <code>className</code>
                          </td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Additional CSS classes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="code-block">
                    <div className="code-header">
                      <span>Basic Usage</span>
                      <button
                        className="copy-btn"
                        onClick={() =>
                          copyToClipboard(codeExamples.basicUsage, "basic")
                        }
                      >
                        {copiedCode === "basic" ? (
                          <RiCheckLine size={16} />
                        ) : (
                          <RiFileCopyLine size={16} />
                        )}
                      </button>
                    </div>
                    <pre>
                      <code>{codeExamples.basicUsage}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="showcase-item">
                <div className="showcase-preview">
                  <ExportableLogo size={120} variant="static" />
                </div>
                <div className="showcase-info">
                  <h3>ExportableLogo</h3>
                  <p>
                    SVG-based logo optimized for exports and different variants.
                  </p>

                  <div className="props-table">
                    <h4>Props</h4>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <code>size</code>
                          </td>
                          <td>
                            <code>number</code>
                          </td>
                          <td>Logo size in pixels (default: 256)</td>
                        </tr>
                        <tr>
                          <td>
                            <code>variant</code>
                          </td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>'default' | 'static' | 'mono' | 'inverse'</td>
                        </tr>
                        <tr>
                          <td>
                            <code>backgroundColor</code>
                          </td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Background color (default: 'transparent')</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="code-block">
                    <div className="code-header">
                      <span>Exportable Logo</span>
                      <button
                        className="copy-btn"
                        onClick={() =>
                          copyToClipboard(
                            codeExamples.exportableLogo,
                            "exportable"
                          )
                        }
                      >
                        {copiedCode === "exportable" ? (
                          <RiCheckLine size={16} />
                        ) : (
                          <RiFileCopyLine size={16} />
                        )}
                      </button>
                    </div>
                    <pre>
                      <code>{codeExamples.exportableLogo}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Logo Variants */}
          <section id="logo-variants" className="docs-section">
            <h2>
              <RiImageLine size={24} />
              Logo Variants
            </h2>
            <p>
              MATTIX logos come in multiple variants for different use cases:
            </p>

            <div className="variants-grid">
              <div className="variant-card">
                <div className="variant-preview">
                  <ExportableLogo size={80} variant="default" />
                </div>
                <h4>Default</h4>
                <p>Full animated version with gradients and effects</p>
              </div>

              <div className="variant-card">
                <div className="variant-preview">
                  <ExportableLogo size={80} variant="static" />
                </div>
                <h4>Static</h4>
                <p>Non-animated version for print and static media</p>
              </div>

              <div className="variant-card">
                <div className="variant-preview">
                  <ExportableLogo size={80} variant="mono" />
                </div>
                <h4>Monochrome</h4>
                <p>Single color version for monochrome applications</p>
              </div>

              <div className="variant-card">
                <div
                  className="variant-preview"
                  style={{ backgroundColor: "#333" }}
                >
                  <ExportableLogo size={80} variant="inverse" />
                </div>
                <h4>Inverse</h4>
                <p>Light version for dark backgrounds</p>
              </div>
            </div>
          </section>

          {/* Color System */}
          <section id="color-system" className="docs-section">
            <h2>
              <RiPaletteLine size={24} />
              Color System
            </h2>
            <p>
              MATTIX uses a carefully crafted color palette based on blues and
              cyans, representing technology, trust, and innovation.
            </p>

            <div className="color-showcase">
              <div className="color-group">
                <h4>Primary Colors</h4>
                <div className="color-swatches">
                  <div className="color-swatch">
                    <div
                      className="swatch"
                      style={{ backgroundColor: "#007acc" }}
                    ></div>
                    <div className="swatch-info">
                      <span className="color-name">Primary Blue</span>
                      <span className="color-value">#007acc</span>
                    </div>
                  </div>
                  <div className="color-swatch">
                    <div
                      className="swatch"
                      style={{ backgroundColor: "#00d4ff" }}
                    ></div>
                    <div className="swatch-info">
                      <span className="color-name">Secondary Cyan</span>
                      <span className="color-value">#00d4ff</span>
                    </div>
                  </div>
                  <div className="color-swatch">
                    <div
                      className="swatch"
                      style={{ backgroundColor: "#0066cc" }}
                    ></div>
                    <div className="swatch-info">
                      <span className="color-name">Accent Blue</span>
                      <span className="color-value">#0066cc</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span>Color Variables</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    copyToClipboard(codeExamples.colorSystem, "colors")
                  }
                >
                  {copiedCode === "colors" ? (
                    <RiCheckLine size={16} />
                  ) : (
                    <RiFileCopyLine size={16} />
                  )}
                </button>
              </div>
              <pre>
                <code>{codeExamples.colorSystem}</code>
              </pre>
            </div>
          </section>

          {/* Export Guide */}
          <section id="export-guide" className="docs-section">
            <h2>
              <RiDownloadLine size={24} />
              Export Guide
            </h2>
            <p>
              Use the LogoExporter utility to generate logos in various formats
              and sizes programmatically or through the Logo Generator
              interface.
            </p>

            <div className="export-options">
              <div className="export-format">
                <h4>Supported Formats</h4>
                <ul>
                  <li>
                    <strong>PNG</strong> - Best for web and digital use with
                    transparency
                  </li>
                  <li>
                    <strong>SVG</strong> - Scalable vector format, perfect for
                    any size
                  </li>
                  <li>
                    <strong>ICO</strong> - Windows icon format (generated from
                    PNG)
                  </li>
                  <li>
                    <strong>PDF</strong> - Print-ready format (coming soon)
                  </li>
                </ul>
              </div>

              <div className="export-sizes">
                <h4>Recommended Sizes</h4>
                <ul>
                  <li>
                    <strong>App Icons:</strong> 1024px, 512px, 180px, 152px,
                    120px
                  </li>
                  <li>
                    <strong>Web Icons:</strong> 32px, 64px, 128px, 256px, 512px
                  </li>
                  <li>
                    <strong>Print:</strong> 300 DPI equivalent sizes
                  </li>
                  <li>
                    <strong>Social Media:</strong> Platform-specific dimensions
                  </li>
                </ul>
              </div>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span>Programmatic Export</span>
                <button
                  className="copy-btn"
                  onClick={() =>
                    copyToClipboard(codeExamples.logoExporter, "exporter")
                  }
                >
                  {copiedCode === "exporter" ? (
                    <RiCheckLine size={16} />
                  ) : (
                    <RiFileCopyLine size={16} />
                  )}
                </button>
              </div>
              <pre>
                <code>{codeExamples.logoExporter}</code>
              </pre>
            </div>
          </section>

          {/* Integration */}
          <section id="integration" className="docs-section">
            <h2>
              <RiCodeLine size={24} />
              Framework Integration
            </h2>
            <p>
              MATTIX components work seamlessly with popular React frameworks
              and can be easily integrated into existing projects.
            </p>

            <div className="integration-grid">
              <div className="integration-card">
                <h4>Next.js</h4>
                <p>
                  Works out of the box with Next.js App Router and Pages Router
                </p>
              </div>

              <div className="integration-card">
                <h4>Vite</h4>
                <p>Optimized for Vite's fast development and build process</p>
              </div>

              <div className="integration-card">
                <h4>Create React App</h4>
                <p>Compatible with standard CRA configurations</p>
              </div>

              <div className="integration-card">
                <h4>Remix</h4>
                <p>Server-side rendering compatible</p>
              </div>
            </div>

            <div className="best-practices">
              <h4>Best Practices</h4>
              <ul>
                <li>
                  Use the animated version sparingly to avoid performance issues
                </li>
                <li>
                  Prefer static versions for repeated instances (lists, grids)
                </li>
                <li>Always provide alt text for accessibility</li>
                <li>Test animations on low-powered devices</li>
                <li>Use appropriate sizes for different viewports</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
    </>
  );
};

export default DocumentationPage;
