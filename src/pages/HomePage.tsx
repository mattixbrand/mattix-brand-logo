import React from "react";
import { Link } from "react-router-dom";
import MattixLogo from "../components/MattixLogo";
import { ExportableLogo } from "../components/ExportableLogo";
import { SEOHead } from "../components/SEOHead";
import {
  RiSparklingLine,
  RiSpeedLine,
  RiToolsLine,
  RiSmartphoneLine,
  RiFocusLine,
  RiPaletteLine,
  RiRocketLine,
} from "@remixicon/react";

const HomePage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <SEOHead pageKey="home" />
      <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-logo">
            <MattixLogo
              animated={true}
              size={350}
              className="hero-mattix-logo"
            />
          </div>

          <h1 className="hero-title">MATTIX</h1>

          <p className="hero-subtitle">
            Revolutionary Brand Identity & Loading Components
          </p>

          <p className="hero-description">
            Experience the next generation of animated brand logos with our
            innovative infinity-snake morphing technology. Perfect for modern
            web applications, mobile apps, and digital experiences.
          </p>

          <div className="hero-actions">
            <Link to="/logo" className="cta-button primary">
              Explore Logo Studio
            </Link>
            <Link to="/colors" className="cta-button secondary">
              Color System
            </Link>
            <a
              href="https://github.com/mattixbrand"
              className="cta-button secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose MATTIX?</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <RiSparklingLine size={32} />
              </div>
              <h3>Animated Brand Identity</h3>
              <p>
                Dynamic logo animations that transform your brand presence with
                smooth infinity-snake morphing effects.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <RiSpeedLine size={32} />
              </div>
              <h3>High Performance</h3>
              <p>
                Optimized SVG animations with CSS3 transitions for smooth 60fps
                performance across all devices.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <RiToolsLine size={32} />
              </div>
              <h3>Easy Integration</h3>
              <p>
                Ready-to-use React components with TypeScript support. Copy,
                paste, and customize in minutes.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <RiSmartphoneLine size={32} />
              </div>
              <h3>Responsive Design</h3>
              <p>
                Perfectly scales across all screen sizes from mobile to desktop
                with adaptive sizing and effects.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <RiFocusLine size={32} />
              </div>
              <h3>Customizable</h3>
              <p>
                Flexible size, color, and animation parameters. Fits seamlessly
                into any design system.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <RiPaletteLine size={32} />
              </div>
              <h3>Logo Generator</h3>
              <p>
                Generate high-quality logos in multiple formats and sizes for
                apps, web, and brand assets.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <RiRocketLine size={32} />
              </div>
              <h3>Modern Tech Stack</h3>
              <p>
                Built with React 19, TypeScript, and cutting-edge web animation
                techniques for the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section">
        <div className="container">
          <h2 className="section-title">See It In Action</h2>

          <div className="demo-grid">
            <div className="demo-card">
              <div className="demo-preview">
                <MattixLogo animated={true} size={200} className="demo-logo" />
              </div>
              <h3>Full Animated Logo</h3>
              <p>
                Watch the infinity symbol transform into the iconic MATTIX "M"
                shape with smooth animations
              </p>
            </div>

            <div className="demo-card">
              <div className="demo-preview static-preview">
                <MattixLogo animated={false} size={200} className="demo-logo" />
              </div>
              <h3>Static Version</h3>
              <p>Clean, professional static logos for print and static media</p>
            </div>

            <div className="demo-card">
              <div className="demo-preview">
                <ExportableLogo
                  size={180}
                  variant="default"
                  logoType="symbol"
                  className="demo-logo"
                />
              </div>
              <h3>Generate MATTIX logos Live Preview</h3>
              <p>
                Export all vector types: PNG, SVG, ICO - Professional logo
                generation for all your projects
              </p>
              <Link to="/generator" className="demo-card-link">
                Try Generator →
              </Link>
            </div>

            <div className="demo-card">
              <div className="demo-preview">
                <ExportableLogo
                  size={180}
                  variant="default"
                  logoType="text"
                  textVariant="∞ATTIX"
                  className="demo-logo"
                />
              </div>
              <h3>∞ATTIX Variant</h3>
              <p>Creative text variation with infinity symbol integration</p>
            </div>
          </div>

          <div className="demo-actions">
            <Link to="/logo" className="demo-link">
              Try Interactive Demo →
            </Link>
            <Link to="/generator" className="demo-link">
              Generate Logos →
            </Link>
            <Link to="/colors" className="demo-link">
              View Color System →
            </Link>
            <Link to="/docs" className="demo-link">
              Read Documentation →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Brand?</h2>
          <p>
            Join thousands of developers and designers using MATTIX for their
            projects
          </p>

          <div className="cta-actions">
            <Link to="/logo" className="cta-button primary large">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <MattixLogo animated={false} size={120} />
              </div>
              <p className="footer-tagline">
                Revolutionizing brand identity through animation
              </p>
            </div>

            <div className="footer-sections">
              <div className="footer-section">
                <h4>Products</h4>
                <div className="footer-links">
                  <Link to="/logo">Logo Studio</Link>
                  <Link to="/generator">Logo Generator</Link>
                  <Link to="/colors">Color System</Link>
                  <Link to="/docs">Documentation</Link>
                </div>
              </div>

              <div className="footer-section">
                <h4>Resources</h4>
                <div className="footer-links">
                  <a
                    href="https://github.com/mattixbrand"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <a href="#tutorials">Tutorials</a>
                  <a href="#support">Support</a>
                  <a href="#community">Community</a>
                </div>
              </div>

              <div className="footer-section">
                <h4>Company</h4>
                <div className="footer-links">
                  <a href="#about">About</a>
                  <a href="#blog">Blog</a>
                  <a href="#careers">Careers</a>
                  <a href="#contact">Contact</a>
                </div>
              </div>

              <div className="footer-section">
                <h4>Connect</h4>
                <div className="footer-links">
                  <a href="#twitter">Twitter</a>
                  <a href="#discord">Discord</a>
                  <a href="#linkedin">LinkedIn</a>
                  <a href="#newsletter">Newsletter</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-info">
              <p>&copy; {currentYear} MATTIX. All rights reserved.</p>
            </div>
            <div className="footer-tech">
              <span className="tech-badge">React 19</span>
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">SVG Animations</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default HomePage;
