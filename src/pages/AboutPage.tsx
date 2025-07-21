import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "../components/SEOHead";
import MattixLogo from "../components/MattixLogo";
import {
  RiSparklingLine,
  RiTeamLine,
  RiLightbulbLine,
  RiRocketLine,
  RiGithubLine,
  RiMailLine,
} from "@remixicon/react";

const AboutPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <SEOHead pageKey="about" />
      <div className="about-page gpu-accelerated">
        {/* Hero Section */}
        <header className="about-hero">
          <div className="about-hero-content">
            <MattixLogo size={120} animated={true} />
            <h1>About Mattix Brand</h1>
            <p className="about-hero-subtitle">
              Crafting exceptional brand identity through innovative design and cutting-edge technology
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="about-main">
          {/* Story Section */}
          <section className="about-section story-section">
            <div className="container">
              <div className="section-header">
                <RiSparklingLine className="section-icon" />
                <h2>Our Story</h2>
              </div>
              <div className="story-content">
                <p>
                  Mattix Brand was born from a passion for creating meaningful visual identities 
                  that resonate with audiences and drive business success. Our journey began with 
                  a simple belief: every brand deserves a logo that tells its unique story.
                </p>
                <p>
                  We combine traditional design principles with modern technology to deliver 
                  scalable, versatile brand assets that work across all platforms and mediums. 
                  From concept to implementation, we ensure every element serves a purpose.
                </p>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="about-section mission-section">
            <div className="container">
              <div className="section-header">
                <RiLightbulbLine className="section-icon" />
                <h2>Our Mission</h2>
              </div>
              <div className="mission-cards">
                <div className="mission-card">
                  <RiRocketLine className="card-icon" />
                  <h3>Innovation</h3>
                  <p>
                    We push the boundaries of design technology, creating tools and assets 
                    that empower businesses to stand out in competitive markets.
                  </p>
                </div>
                <div className="mission-card">
                  <RiTeamLine className="card-icon" />
                  <h3>Collaboration</h3>
                  <p>
                    We believe great design comes from understanding our clients' needs 
                    and working together to bring their vision to life.
                  </p>
                </div>
                <div className="mission-card">
                  <RiSparklingLine className="card-icon" />
                  <h3>Excellence</h3>
                  <p>
                    Every project is an opportunity to create something extraordinary. 
                    We're committed to delivering the highest quality in every detail.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="about-section values-section">
            <div className="container">
              <div className="section-header">
                <RiSparklingLine className="section-icon" />
                <h2>Our Values</h2>
              </div>
              <div className="values-grid">
                <div className="value-item">
                  <h4>Simplicity</h4>
                  <p>We believe in the power of simple, clean design that communicates effectively.</p>
                </div>
                <div className="value-item">
                  <h4>Scalability</h4>
                  <p>Our solutions grow with your business, from startup to enterprise scale.</p>
                </div>
                <div className="value-item">
                  <h4>Performance</h4>
                  <p>Every asset is optimized for fast loading and smooth user experiences.</p>
                </div>
                <div className="value-item">
                  <h4>Accessibility</h4>
                  <p>We design with everyone in mind, ensuring inclusive and accessible experiences.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="about-section tech-section">
            <div className="container">
              <div className="section-header">
                <RiRocketLine className="section-icon" />
                <h2>Our Technology</h2>
              </div>
              <div className="tech-content">
                <p>
                  Built with cutting-edge web technologies including React, TypeScript, and 
                  advanced CSS for GPU-accelerated performance. Our logos are delivered as 
                  scalable SVG files, ensuring crisp quality at any size.
                </p>
                <div className="tech-stack">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">TypeScript</span>
                  <span className="tech-tag">SVG</span>
                  <span className="tech-tag">GPU Acceleration</span>
                  <span className="tech-tag">Responsive Design</span>
                  <span className="tech-tag">Performance Optimized</span>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="about-section cta-section">
            <div className="container">
              <div className="cta-content">
                <h2>Let's Work Together</h2>
                <p>Ready to elevate your brand with exceptional design?</p>
                <div className="cta-buttons">
                  <Link to="/generator" className="btn btn-primary">
                    <RiSparklingLine className="btn-icon" />
                    Try Logo Generator
                  </Link>
                  <Link to="/docs" className="btn btn-secondary">
                    View Documentation
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="about-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-logo">
                <MattixLogo size={60} />
                <span>Mattix Brand</span>
              </div>
              <div className="footer-links">
                <a href="mailto:contact@mattixbrand.com" className="footer-link">
                  <RiMailLine className="link-icon" />
                  contact@mattixbrand.com
                </a>
                <a href="https://github.com/mattixbrand" className="footer-link" target="_blank" rel="noopener noreferrer">
                  <RiGithubLine className="link-icon" />
                  GitHub
                </a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; {currentYear} Mattix Brand. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutPage;
