import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "../components/SEOHead";
import {
  NavigationProvider,
  useNavigation,
} from "../contexts/NavigationContext";
import { FloatingNav } from "../components/FloatingNav";
import MattixLogo from "../components/MattixLogo";
import { trackColorInteraction } from "../utils/gtm";
import {
  RiEyeLine,
  RiCircleLine,
  RiMagicLine,
  RiCheckboxCircleLine,
  RiToolsLine,
  RiArchiveLine,
  RiSunLine,
  RiMoonLine,
  RiComputerLine,
  RiFileCopyLine,
  RiCheckLine,
  RiCloseLine,
  RiDownloadLine,
} from "@remixicon/react";

// Toast interface
interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
  isVisible: boolean;
}

const ColorSystemPage: React.FC = () => {
  return (
    <NavigationProvider>
      <ColorSystemContent />
    </NavigationProvider>
  );
};

const ColorSystemContent: React.FC = () => {
  const { setCurrentSection } = useNavigation();
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [activeFramework, setActiveFramework] = useState("tailwind");
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Theme management
  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("mattix-theme") as "light" | "dark" | "system") ||
      "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = document.documentElement;

    // Add transition class for smooth theme switching
    root.classList.add("theme-transitioning");

    if (newTheme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.toggle("dark", systemPrefersDark);
      root.classList.toggle("light", !systemPrefersDark);
    } else {
      root.classList.toggle("dark", newTheme === "dark");
      root.classList.toggle("light", newTheme === "light");
    }

    localStorage.setItem("mattix-theme", newTheme);

    // Remove transition class after theme is applied
    setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 300);
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const navSections = [
    { id: "overview", label: "Overview", icon: RiEyeLine },
    { id: "primary", label: "Primary", icon: RiCircleLine },
    { id: "gradients", label: "Gradients", icon: RiMagicLine },
    { id: "semantic", label: "Semantic", icon: RiCheckboxCircleLine },
    { id: "frameworks", label: "Frameworks", icon: RiToolsLine },
    { id: "export", label: "Export", icon: RiArchiveLine },
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.6,
      rootMargin: "-100px 0px -100px 0px",
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    navSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [setCurrentSection]);

  // Toast notification system
  const addToast = (message: string, type: "success" | "error" = "success") => {
    const id = Date.now().toString();
    const toast: Toast = { id, message, type, isVisible: true };

    setToasts((prev) => [...prev, toast]);

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Enhanced copy to clipboard functionality with visual feedback and toast
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addToast(`✅ Copied ${type}!`, "success");

      // Track color interaction for analytics
      trackColorInteraction('copy_color', text);

      // Add visual feedback to the clicked element
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement) {
        activeElement.classList.add("copied");
        setTimeout(() => {
          activeElement.classList.remove("copied");
        }, 600);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
      addToast(`❌ Failed to copy ${type}`, "error");
    }
  };

  return (
    <>
      <SEOHead pageKey="colors" />
      <div className="color-system-page">
      <FloatingNav sections={navSections} />

      {/* Header */}
      <header className="color-header">
        <div className="container">
          <Link to="/" className="back-button">
            ← Back to Home
          </Link>

          {/* Theme Toggle */}
          <div className="theme-controls">
            <button
              onClick={() => handleThemeChange("light")}
              className={`theme-btn ${theme === "light" ? "active" : ""}`}
              title="Light mode"
            >
              <RiSunLine />
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`theme-btn ${theme === "dark" ? "active" : ""}`}
              title="Dark mode"
            >
              <RiMoonLine />
            </button>
            <button
              onClick={() => handleThemeChange("system")}
              className={`theme-btn ${theme === "system" ? "active" : ""}`}
              title="System theme"
            >
              <RiComputerLine />
            </button>
          </div>

          <div className="header-content">
            <MattixLogo animated={true} size={200} />
            <h1>MATTIX Color System</h1>
            <p>Complete color palette for modern UI frameworks</p>
          </div>
        </div>
      </header>

      {/* Overview Section */}
      <section id="overview" className="color-section">
        <div className="container">
          <h2>Design System Overview</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <h3>🎨 Brand Identity</h3>
              <p>
                Consistent colors that represent the MATTIX brand across all
                touchpoints.
              </p>
            </div>
            <div className="overview-card">
              <h3>🔧 Framework Ready</h3>
              <p>
                Pre-configured for Tailwind CSS, Shadcn UI, Hero UI, and
                Aceternity UI.
              </p>
            </div>
            <div className="overview-card">
              <h3>♿ Accessibility</h3>
              <p>
                WCAG 2.1 AA compliant color combinations for inclusive design.
              </p>
            </div>
            <div className="overview-card">
              <h3>🌙 Dark Mode</h3>
              <p>Optimized color variants for both light and dark themes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Colors */}
      <section id="primary" className="color-section">
        <div className="container">
          <h2>Primary Color Palette</h2>
          <div className="color-palette">
            <div className="color-group">
              <h3>MATTIX Blue</h3>
              <div className="color-swatches">
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#4facfe" }}
                  onClick={() =>
                    copyToClipboard("#4facfe", "MATTIX Primary color")
                  }
                  title="Click to copy hex color"
                >
                  <div className="swatch-content">
                    <div className="swatch-name">Primary</div>
                    <div className="swatch-hex">#4facfe</div>
                    <div className="swatch-rgb">rgb(79, 172, 254)</div>
                    <div className="swatch-hsl">hsl(211, 99%, 65%)</div>
                  </div>
                </div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#00f2fe" }}
                  onClick={() =>
                    copyToClipboard("#00f2fe", "MATTIX Cyan color")
                  }
                  title="Click to copy hex color"
                >
                  <div className="swatch-content">
                    <div className="swatch-name">Cyan</div>
                    <div className="swatch-hex">#00f2fe</div>
                    <div className="swatch-rgb">rgb(0, 242, 254)</div>
                    <div className="swatch-hsl">hsl(183, 100%, 50%)</div>
                  </div>
                </div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#667eea" }}
                  onClick={() =>
                    copyToClipboard("#667eea", "MATTIX Purple Blue color")
                  }
                  title="Click to copy hex color"
                >
                  <div className="swatch-content">
                    <div className="swatch-name">Purple Blue</div>
                    <div className="swatch-hex">#667eea</div>
                    <div className="swatch-rgb">rgb(102, 126, 234)</div>
                    <div className="swatch-hsl">hsl(229, 75%, 66%)</div>
                  </div>
                </div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#764ba2" }}
                  onClick={() =>
                    copyToClipboard("#764ba2", "MATTIX Deep Purple color")
                  }
                  title="Click to copy hex color"
                >
                  <div className="swatch-content">
                    <div className="swatch-name">Deep Purple</div>
                    <div className="swatch-hex">#764ba2</div>
                    <div className="swatch-rgb">rgb(118, 75, 162)</div>
                    <div className="swatch-hsl">hsl(270, 37%, 46%)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Gemini-inspired color groups */}
            <div className="color-group">
              <h3>🌟 Gemini AI Inspired</h3>
              <div className="color-swatches">
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#4285F4" }}
                  onClick={() =>
                    copyToClipboard("#4285F4", "Google Blue color")
                  }
                  title="Click to copy hex color"
                >
                  <div className="swatch-content">
                    <div className="swatch-name">Google Blue</div>
                    <div className="swatch-hex">#4285F4</div>
                    <div className="swatch-rgb">rgb(66, 133, 244)</div>
                    <div className="swatch-hsl">hsl(217, 89%, 61%)</div>
                  </div>
                </div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#34A853" }}
                  onClick={() => copyToClipboard("#34A853", "AI Green color")}
                  title="Click to copy hex color"
                >
                  <div className="swatch-content">
                    <div className="swatch-name">AI Green</div>
                    <div className="swatch-hex">#34A853</div>
                    <div className="swatch-rgb">rgb(52, 168, 83)</div>
                    <div className="swatch-hsl">hsl(136, 53%, 43%)</div>
                  </div>
                </div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#FBBC04" }}
                  onClick={() =>
                    copyToClipboard("#FBBC04", "Neural Yellow color")
                  }
                  title="Click to copy hex color"
                >
                  <div className="swatch-content">
                    <div className="swatch-name">Neural Yellow</div>
                    <div className="swatch-hex">#FBBC04</div>
                    <div className="swatch-rgb">rgb(251, 188, 4)</div>
                    <div className="swatch-hsl">hsl(45, 97%, 50%)</div>
                  </div>
                </div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#EA4335" }}
                  onClick={() => copyToClipboard("#EA4335", "Alert Red color")}
                  title="Click to copy hex color"
                >
                  <div className="swatch-content">
                    <div className="swatch-name">Alert Red</div>
                    <div className="swatch-hex">#EA4335</div>
                    <div className="swatch-rgb">rgb(234, 67, 53)</div>
                    <div className="swatch-hsl">hsl(5, 80%, 56%)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="color-group">
              <h3>🎨 Modern Neutrals</h3>
              <div className="color-swatches">
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#1a1a2e" }}
                  onClick={() => copyToClipboard("#1a1a2e", "Space Dark color")}
                  title="Click to copy hex color"
                >
                  <div className="swatch-content">
                    <div className="swatch-name">Space Dark</div>
                    <div className="swatch-hex">#1a1a2e</div>
                    <div className="swatch-rgb">rgb(26, 26, 46)</div>
                    <div className="swatch-hsl">hsl(240, 28%, 14%)</div>
                  </div>
                </div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#16213e" }}
                  onClick={() => copyToClipboard("#16213e", "Deep Navy color")}
                  title="Click to copy hex color"
                >
                  <div className="swatch-content">
                    <div className="swatch-name">Deep Navy</div>
                    <div className="swatch-hex">#16213e</div>
                    <div className="swatch-rgb">rgb(22, 33, 62)</div>
                    <div className="swatch-hsl">hsl(224, 48%, 16%)</div>
                  </div>
                </div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#e3f2fd" }}
                  onClick={() =>
                    copyToClipboard("#e3f2fd", "Cloud Light color")
                  }
                  title="Click to copy hex color"
                >
                  <div className="swatch-content">
                    <div className="swatch-name">Cloud Light</div>
                    <div className="swatch-hex">#e3f2fd</div>
                    <div className="swatch-rgb">rgb(227, 242, 253)</div>
                    <div className="swatch-hsl">hsl(205, 79%, 94%)</div>
                  </div>
                </div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: "#f8fafc" }}
                  onClick={() => copyToClipboard("#f8fafc", "Pure Light color")}
                  title="Click to copy hex color"
                >
                  <div className="swatch-content">
                    <div className="swatch-name">Pure Light</div>
                    <div className="swatch-hex">#f8fafc</div>
                    <div className="swatch-rgb">rgb(248, 250, 252)</div>
                    <div className="swatch-hsl">hsl(210, 20%, 98%)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="color-group">
              <h3>Shades & Tints</h3>
              <div className="shade-grid">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                  (shade) => {
                    const intensity = shade / 900;
                    const r = Math.round(79 + (255 - 79) * (1 - intensity));
                    const g = Math.round(172 + (255 - 172) * (1 - intensity));
                    const b = Math.round(254 + (255 - 254) * (1 - intensity));

                    if (shade >= 600) {
                      const darkIntensity = (shade - 500) / 400;
                      const darkR = Math.round(79 * (1 - darkIntensity * 0.8));
                      const darkG = Math.round(172 * (1 - darkIntensity * 0.8));
                      const darkB = Math.round(254 * (1 - darkIntensity * 0.8));

                      return (
                        <div
                          key={shade}
                          className="shade-swatch"
                          style={{
                            backgroundColor: `rgb(${darkR}, ${darkG}, ${darkB})`,
                          }}
                        >
                          <div className="shade-label">{shade}</div>
                          <div className="shade-hex">
                            #{darkR.toString(16).padStart(2, "0")}
                            {darkG.toString(16).padStart(2, "0")}
                            {darkB.toString(16).padStart(2, "0")}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={shade}
                        className="shade-swatch"
                        style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
                      >
                        <div className="shade-label">{shade}</div>
                        <div className="shade-hex">
                          #{r.toString(16).padStart(2, "0")}
                          {g.toString(16).padStart(2, "0")}
                          {b.toString(16).padStart(2, "0")}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradients */}
      <section id="gradients" className="color-section">
        <div className="container">
          <h2>Gradient Collection</h2>

          {/* Theme-aware gradients showcase */}
          <div className="theme-gradients-demo">
            <h3>🌈 Theme-Adaptive Gradients</h3>
            <div className="theme-gradient-grid">
              <div className="theme-gradient-card">
                <div className="gradient-preview theme-bg-gradient"></div>
                <h4>Background Gradient</h4>
                <div className="gradient-codes">
                  <code className="light-code">
                    Light: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%,
                    #e2e8f0 100%)
                  </code>
                  <code className="dark-code">
                    Dark: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%,
                    #16213e 100%)
                  </code>
                </div>
              </div>

              <div className="theme-gradient-card">
                <div className="gradient-preview theme-glow-gradient"></div>
                <h4>Glow Effect</h4>
                <div className="gradient-codes">
                  <code className="light-code">
                    Light: radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%,
                    transparent 70%)
                  </code>
                  <code className="dark-code">
                    Dark: radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%,
                    transparent 70%)
                  </code>
                </div>
              </div>

              <div className="theme-gradient-card">
                <div className="gradient-preview theme-card-gradient"></div>
                <h4>Card Overlay</h4>
                <div className="gradient-codes">
                  <code className="light-code">
                    Light: rgba(248, 250, 252, 0.8)
                  </code>
                  <code className="dark-code">Dark: rgba(10, 10, 10, 0.8)</code>
                </div>
              </div>
            </div>
          </div>

          <div className="gradient-showcase">
            {/* Modern 2024-2025 Gradient Collection */}
            <div className="gradient-card">
              <div className="gradient-preview mattix-primary"></div>
              <h3>MATTIX Primary</h3>
              <code>linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)</code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)",
                    "MATTIX Primary gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview mattix-spectrum"></div>
              <h3>MATTIX Spectrum</h3>
              <code>
                linear-gradient(45deg, #4facfe 0%, #00f2fe 25%, #667eea 50%,
                #764ba2 75%, #f093fb 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(45deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)",
                    "MATTIX Spectrum gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview mattix-infinity"></div>
              <h3>MATTIX Infinity</h3>
              <code>
                radial-gradient(ellipse at center, #4facfe 0%, #00f2fe 30%,
                #667eea 60%, #764ba2 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "radial-gradient(ellipse at center, #4facfe 0%, #00f2fe 30%, #667eea 60%, #764ba2 100%)",
                    "MATTIX Infinity gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview mattix-pulse"></div>
              <h3>MATTIX Pulse</h3>
              <code>
                linear-gradient(135deg, #764ba2 0%, #667eea 25%, #4facfe 50%,
                #00f2fe 75%, #4facfe 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(135deg, #764ba2 0%, #667eea 25%, #4facfe 50%, #00f2fe 75%, #4facfe 100%)",
                    "MATTIX Pulse gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview mattix-flow"></div>
              <h3>MATTIX Flow</h3>
              <code>
                linear-gradient(90deg, #4facfe 0%, #00f2fe 20%, #667eea 40%,
                #764ba2 60%, #667eea 80%, #00f2fe 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(90deg, #4facfe 0%, #00f2fe 20%, #667eea 40%, #764ba2 60%, #667eea 80%, #00f2fe 100%)",
                    "MATTIX Flow gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview mattix-aurora"></div>
              <h3>MATTIX Aurora</h3>
              <code>
                conic-gradient(from 0deg at 50% 50%, #4facfe 0%, #00f2fe 25%,
                #667eea 50%, #764ba2 75%, #4facfe 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "conic-gradient(from 0deg at 50% 50%, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #4facfe 100%)",
                    "MATTIX Aurora gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview mattix-wave"></div>
              <h3>MATTIX Wave</h3>
              <code>
                linear-gradient(45deg, transparent 0%, #4facfe 25%, #00f2fe 45%,
                transparent 50%, transparent 55%, #667eea 75%, #764ba2 95%,
                transparent 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(45deg, transparent 0%, #4facfe 25%, #00f2fe 45%, transparent 50%, transparent 55%, #667eea 75%, #764ba2 95%, transparent 100%)",
                    "MATTIX Wave gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview mattix-glow"></div>
              <h3>MATTIX Glow</h3>
              <code>
                radial-gradient(circle at 30% 70%, rgba(79, 172, 254, 0.8) 0%,
                rgba(0, 242, 254, 0.6) 25%, rgba(102, 126, 234, 0.4) 50%,
                rgba(118, 75, 162, 0.2) 75%, transparent 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "radial-gradient(circle at 30% 70%, rgba(79, 172, 254, 0.8) 0%, rgba(0, 242, 254, 0.6) 25%, rgba(102, 126, 234, 0.4) 50%, rgba(118, 75, 162, 0.2) 75%, transparent 100%)",
                    "MATTIX Glow gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview aurora-borealis"></div>
              <h3>Aurora Borealis</h3>
              <code>
                linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                    "Aurora Borealis gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview neon-glow"></div>
              <h3>Neon Glow</h3>
              <code>
                linear-gradient(45deg, #ff0080 0%, #ff8c00 50%, #40e0d0 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(45deg, #ff0080 0%, #ff8c00 50%, #40e0d0 100%)",
                    "Neon Glow gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview ocean-wave"></div>
              <h3>Ocean Wave</h3>
              <code>linear-gradient(120deg, #a8edea 0%, #fed6e3 100%)</code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(120deg, #a8edea 0%, #fed6e3 100%)",
                    "Ocean Wave gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview sunset-paradise"></div>
              <h3>Sunset Paradise</h3>
              <code>linear-gradient(45deg, #fa709a 0%, #fee140 100%)</code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(45deg, #fa709a 0%, #fee140 100%)",
                    "Sunset Paradise gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview cosmic-fusion"></div>
              <h3>Cosmic Fusion</h3>
              <code>
                linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%,
                #4facfe 75%, #00f2fe 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)",
                    "Cosmic Fusion gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview deep-space"></div>
              <h3>Deep Space</h3>
              <code>
                linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%,
                #0f3460 75%, #533483 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)",
                    "Deep Space gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview emerald-water"></div>
              <h3>Emerald Water</h3>
              <code>linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)</code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
                    "Emerald Water gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview warm-flame"></div>
              <h3>Warm Flame</h3>
              <code>
                linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
                    "Warm Flame gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview neural-network"></div>
              <h3>Neural Network</h3>
              <code>
                linear-gradient(135deg, #667eea 0%, #764ba2 20%, #f093fb 40%,
                #4facfe 60%, #00f2fe 80%, #89f7fe 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(135deg, #667eea 0%, #764ba2 20%, #f093fb 40%, #4facfe 60%, #00f2fe 80%, #89f7fe 100%)",
                    "Neural Network gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview holographic"></div>
              <h3>Holographic</h3>
              <code>
                linear-gradient(45deg, #ff0080 0%, #ff8c00 20%, #40e0d0 40%,
                #4facfe 60%, #667eea 80%, #f093fb 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(45deg, #ff0080 0%, #ff8c00 20%, #40e0d0 40%, #4facfe 60%, #667eea 80%, #f093fb 100%)",
                    "Holographic gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview crystal-clear"></div>
              <h3>Crystal Clear</h3>
              <code>
                linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%,
                #4facfe 75%, #00f2fe 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)",
                    "Crystal Clear gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview midnight-bloom"></div>
              <h3>Midnight Bloom</h3>
              <code>linear-gradient(120deg, #2d1b69 0%, #11998e 100%)</code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(120deg, #2d1b69 0%, #11998e 100%)",
                    "Midnight Bloom gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview sunrise-bliss"></div>
              <h3>Sunrise Bliss</h3>
              <code>
                linear-gradient(45deg, #ff9a56 0%, #ffad56 25%, #ffc956 50%,
                #ffe556 75%, #f093fb 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(45deg, #ff9a56 0%, #ffad56 25%, #ffc956 50%, #ffe556 75%, #f093fb 100%)",
                    "Sunrise Bliss gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview electric-dreams"></div>
              <h3>Electric Dreams</h3>
              <code>
                linear-gradient(135deg, #667eea 0%, #764ba2 20%, #f093fb 40%,
                #ff0080 60%, #ff8c00 80%, #40e0d0 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(135deg, #667eea 0%, #764ba2 20%, #f093fb 40%, #ff0080 60%, #ff8c00 80%, #40e0d0 100%)",
                    "Electric Dreams gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview velvet-night"></div>
              <h3>Velvet Night</h3>
              <code>
                linear-gradient(120deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%,
                #533483 75%, #764ba2 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(120deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #764ba2 100%)",
                    "Velvet Night gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview glass-morphism"></div>
              <h3>Glass Morphism</h3>
              <code>
                linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255,
                255, 255, 0.05) 50%, rgba(79, 172, 254, 0.1) 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(79, 172, 254, 0.1) 100%)",
                    "Glass Morphism gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview neon-nights"></div>
              <h3>Neon Nights</h3>
              <code>
                linear-gradient(45deg, #ff006e 0%, #8338ec 25%, #3a86ff 50%,
                #06ffa5 75%, #ffbe0b 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(45deg, #ff006e 0%, #8338ec 25%, #3a86ff 50%, #06ffa5 75%, #ffbe0b 100%)",
                    "Neon Nights gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview aurora-green"></div>
              <h3>Aurora Green</h3>
              <code>
                linear-gradient(135deg, #a8e6cf 0%, #88d8c0 25%, #78c6a3 50%,
                #68b684 75%, #56a085 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(135deg, #a8e6cf 0%, #88d8c0 25%, #78c6a3 50%, #68b684 75%, #56a085 100%)",
                    "Aurora Green gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview sunset-vibes"></div>
              <h3>Sunset Vibes</h3>
              <code>
                linear-gradient(45deg, #ff9068 0%, #fd746c 25%, #ff5f6d 50%,
                #ffc371 75%, #ff9068 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(45deg, #ff9068 0%, #fd746c 25%, #ff5f6d 50%, #ffc371 75%, #ff9068 100%)",
                    "Sunset Vibes gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview ocean-breeze"></div>
              <h3>Ocean Breeze</h3>
              <code>
                linear-gradient(120deg, #667eea 0%, #764ba2 25%, #f093fb 50%,
                #4facfe 75%, #00f2fe 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(120deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)",
                    "Ocean Breeze gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview galaxy-spiral"></div>
              <h3>Galaxy Spiral</h3>
              <code>
                conic-gradient(from 180deg at 50% 50%, #667eea 0%, #764ba2 60%,
                #f093fb 120%, #4facfe 180%, #00f2fe 240%, #667eea 300%, #764ba2
                360%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "conic-gradient(from 180deg at 50% 50%, #667eea 0%, #764ba2 60%, #f093fb 120%, #4facfe 180%, #00f2fe 240%, #667eea 300%, #764ba2 360%)",
                    "Galaxy Spiral gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview quantum-field"></div>
              <h3>Quantum Field</h3>
              <code>
                conic-gradient(from 90deg at 50% 50%, #667eea 0%, #764ba2 45%,
                #f093fb 90%, #4facfe 135%, #00f2fe 180%, #89f7fe 225%, #667eea
                270%, #764ba2 315%, #667eea 360%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "conic-gradient(from 90deg at 50% 50%, #667eea 0%, #764ba2 45%, #f093fb 90%, #4facfe 135%, #00f2fe 180%, #89f7fe 225%, #667eea 270%, #764ba2 315%, #667eea 360%)",
                    "Quantum Field gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview digital-rain"></div>
              <h3>Digital Rain</h3>
              <code>
                linear-gradient(90deg, #0f3460 0%, #16213e 25%, #1a1a2e 50%,
                #16213e 75%, #0f3460 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(90deg, #0f3460 0%, #16213e 25%, #1a1a2e 50%, #16213e 75%, #0f3460 100%)",
                    "Digital Rain gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview aurora-polar"></div>
              <h3>Aurora Polar</h3>
              <code>
                linear-gradient(135deg, #667eea 0%, #89f7fe 25%, #66a6ff 50%,
                #4facfe 75%, #00f2fe 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(135deg, #667eea 0%, #89f7fe 25%, #66a6ff 50%, #4facfe 75%, #00f2fe 100%)",
                    "Aurora Polar gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview mystic-forest"></div>
              <h3>Mystic Forest</h3>
              <code>linear-gradient(135deg, #134e5e 0%, #71b280 100%)</code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
                    "Mystic Forest gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>

            <div className="gradient-card">
              <div className="gradient-preview volcanic-energy"></div>
              <h3>Volcanic Energy</h3>
              <code>
                linear-gradient(45deg, #ff5722 0%, #ff9800 25%, #ffc107 50%,
                #ff9800 75%, #ff5722 100%)
              </code>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(
                    "linear-gradient(45deg, #ff5722 0%, #ff9800 25%, #ffc107 50%, #ff9800 75%, #ff5722 100%)",
                    "Volcanic Energy gradient"
                  )
                }
                title="Copy gradient"
              >
                <RiFileCopyLine />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Semantic Colors */}
      <section id="semantic" className="color-section">
        <div className="container">
          <h2>Semantic Color System</h2>
          <div className="semantic-grid">
            <div className="semantic-group">
              <h3>Status Colors</h3>
              <div className="semantic-swatches">
                <div
                  className="semantic-swatch success"
                  onClick={() => copyToClipboard("#10b981", "Success color")}
                  title="Click to copy hex color"
                >
                  <span>Success</span>
                  <code>#10b981</code>
                </div>
                <div
                  className="semantic-swatch warning"
                  onClick={() => copyToClipboard("#f59e0b", "Warning color")}
                  title="Click to copy hex color"
                >
                  <span>Warning</span>
                  <code>#f59e0b</code>
                </div>
                <div
                  className="semantic-swatch error"
                  onClick={() => copyToClipboard("#ef4444", "Error color")}
                  title="Click to copy hex color"
                >
                  <span>Error</span>
                  <code>#ef4444</code>
                </div>
                <div
                  className="semantic-swatch info"
                  onClick={() => copyToClipboard("#3b82f6", "Info color")}
                  title="Click to copy hex color"
                >
                  <span>Info</span>
                  <code>#3b82f6</code>
                </div>
              </div>
            </div>

            <div className="semantic-group">
              <h3>Neutral Colors</h3>
              <div className="semantic-swatches">
                <div
                  className="semantic-swatch neutral-900"
                  onClick={() =>
                    copyToClipboard("#111827", "Text Primary color")
                  }
                  title="Click to copy hex color"
                >
                  <span>Text Primary</span>
                  <code>#111827</code>
                </div>
                <div
                  className="semantic-swatch neutral-600"
                  onClick={() =>
                    copyToClipboard("#4b5563", "Text Secondary color")
                  }
                  title="Click to copy hex color"
                >
                  <span>Text Secondary</span>
                  <code>#4b5563</code>
                </div>
                <div
                  className="semantic-swatch neutral-400"
                  onClick={() => copyToClipboard("#9ca3af", "Text Muted color")}
                  title="Click to copy hex color"
                >
                  <span>Text Muted</span>
                  <code>#9ca3af</code>
                </div>
                <div
                  className="semantic-swatch neutral-200"
                  onClick={() => copyToClipboard("#e5e7eb", "Border color")}
                  title="Click to copy hex color"
                >
                  <span>Border</span>
                  <code>#e5e7eb</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Implementations */}
      <section id="frameworks" className="color-section">
        <div className="container">
          <h2>Framework Integration</h2>

          <div className="framework-tabs">
            <div className="framework-nav">
              <button
                onClick={() => setActiveFramework("tailwind")}
                className={`framework-btn ${
                  activeFramework === "tailwind" ? "active" : ""
                }`}
              >
                <span className="icon">🌊</span> Tailwind CSS
              </button>
              <button
                onClick={() => setActiveFramework("shadcn")}
                className={`framework-btn ${
                  activeFramework === "shadcn" ? "active" : ""
                }`}
              >
                <span className="icon">🎭</span> Shadcn UI
              </button>
              <button
                onClick={() => setActiveFramework("hero")}
                className={`framework-btn ${
                  activeFramework === "hero" ? "active" : ""
                }`}
              >
                <span className="icon">🦸</span> Hero UI
              </button>
              <button
                onClick={() => setActiveFramework("aceternity")}
                className={`framework-btn ${
                  activeFramework === "aceternity" ? "active" : ""
                }`}
              >
                <span className="icon">✨</span> Aceternity UI
              </button>
            </div>

            {activeFramework === "tailwind" && (
              <div className="framework-tab active">
                <h3>🌊 Tailwind CSS - Complete Theme Configuration</h3>
                <div className="code-block">
                  <button
                    className="code-copy-btn"
                    onClick={() =>
                      copyToClipboard(
                        `// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // MATTIX Primary Palette
        mattix: {
          50: '#f0f9ff',   // Ultra light
          100: '#e0f3fe',  // Very light
          200: '#bae8fd',  // Light
          300: '#7dd3fc',  // Light medium
          400: '#38bdf8',  // Medium
          500: '#4facfe',  // Primary (base)
          600: '#0284c7',  // Medium dark
          700: '#0369a1',  // Dark
          800: '#075985',  // Very dark
          900: '#0c4a6e',  // Ultra dark
          950: '#082f49',  // Deepest
        },
        
        // Modern Gemini-inspired colors
        'mattix-cyan': {
          50: '#ecfeff',
          500: '#00f2fe',
          900: '#164e63',
        },
        'mattix-purple': {
          50: '#faf5ff',
          500: '#667eea',
          900: '#312e81',
        },
        'mattix-deep': {
          50: '#fdf4ff',
          500: '#764ba2',
          900: '#581c87',
        },
        
        // Light mode specific colors
        light: {
          bg: {
            primary: '#ffffff',
            secondary: '#f8fafc',
            tertiary: '#f1f5f9',
          },
          text: {
            primary: '#0f172a',
            secondary: '#475569',
            muted: '#64748b',
          },
          border: {
            primary: '#e2e8f0',
            secondary: '#cbd5e1',
          }
        },
        
        // Dark mode specific colors
        dark: {
          bg: {
            primary: '#0a0a0a',
            secondary: '#0f0f23',
            tertiary: '#1a1a2e',
          },
          text: {
            primary: '#f8fafc',
            secondary: '#cbd5e1',
            muted: '#94a3b8',
          },
          border: {
            primary: '#1e293b',
            secondary: '#334155',
          }
        }
      },
      
      backgroundImage: {
        // Enhanced MATTIX Brand Gradients
        'mattix-gradient': 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
        'mattix-spectrum': 'linear-gradient(45deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)',
        'mattix-infinity': 'radial-gradient(ellipse at center, #4facfe 0%, #00f2fe 30%, #667eea 60%, #764ba2 100%)',
        'mattix-pulse': 'linear-gradient(135deg, #764ba2 0%, #667eea 25%, #4facfe 50%, #00f2fe 75%, #4facfe 100%)',
        'mattix-flow': 'linear-gradient(90deg, #4facfe 0%, #00f2fe 20%, #667eea 40%, #764ba2 60%, #667eea 80%, #00f2fe 100%)',
        'mattix-aurora': 'conic-gradient(from 0deg at 50% 50%, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #4facfe 100%)',
        'mattix-wave': 'linear-gradient(45deg, transparent 0%, #4facfe 25%, #00f2fe 45%, transparent 50%, transparent 55%, #667eea 75%, #764ba2 95%, transparent 100%)',
        'mattix-glow': 'radial-gradient(circle at 30% 70%, rgba(79, 172, 254, 0.8) 0%, rgba(0, 242, 254, 0.6) 25%, rgba(102, 126, 234, 0.4) 50%, rgba(118, 75, 162, 0.2) 75%, transparent 100%)',
        // Theme-aware backgrounds
        'mattix-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        'mattix-light': 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
        'mattix-glow-light': 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
        'mattix-glow-dark': 'radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, transparent 70%)',
      },
      
      // Custom CSS variables for dynamic theming
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      }
    }
  },
  
  // CSS Variables approach for dynamic theming
  plugins: [
    function({ addBase }) {
      addBase({
        ':root': {
          '--mattix-primary': '79 172 254',
          '--mattix-primary-foreground': '255 255 255',
          '--mattix-secondary': '0 242 254',
          '--mattix-accent': '102 126 234',
          '--mattix-muted': '118 75 162',
        },
        '.dark': {
          '--mattix-bg-primary': '10 10 10',
          '--mattix-bg-secondary': '15 15 35',
          '--mattix-text-primary': '248 250 252',
          '--mattix-text-secondary': '203 213 225',
          '--mattix-border': '30 41 59',
        },
        '.light': {
          '--mattix-bg-primary': '255 255 255',
          '--mattix-bg-secondary': '248 250 252',
          '--mattix-text-primary': '15 23 42',
          '--mattix-text-secondary': '71 85 105',
          '--mattix-border': '226 232 240',
        }
      })
    }
  ]
}`,
                        "Tailwind CSS Configuration"
                      )
                    }
                    title="Copy Tailwind CSS configuration"
                  >
                    <RiFileCopyLine />
                  </button>
                  <pre>{`// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // MATTIX Primary Palette
        mattix: {
          50: '#f0f9ff',   // Ultra light
          100: '#e0f3fe',  // Very light
          200: '#bae8fd',  // Light
          300: '#7dd3fc',  // Light medium
          400: '#38bdf8',  // Medium
          500: '#4facfe',  // Primary (base)
          600: '#0284c7',  // Medium dark
          700: '#0369a1',  // Dark
          800: '#075985',  // Very dark
          900: '#0c4a6e',  // Ultra dark
          950: '#082f49',  // Deepest
        },
        
        // Modern Gemini-inspired colors
        'mattix-cyan': {
          50: '#ecfeff',
          500: '#00f2fe',
          900: '#164e63',
        },
        'mattix-purple': {
          50: '#faf5ff',
          500: '#667eea',
          900: '#312e81',
        },
        'mattix-deep': {
          50: '#fdf4ff',
          500: '#764ba2',
          900: '#581c87',
        },
        
        // Light mode specific colors
        light: {
          bg: {
            primary: '#ffffff',
            secondary: '#f8fafc',
            tertiary: '#f1f5f9',
          },
          text: {
            primary: '#0f172a',
            secondary: '#475569',
            muted: '#64748b',
          },
          border: {
            primary: '#e2e8f0',
            secondary: '#cbd5e1',
          }
        },
        
        // Dark mode specific colors
        dark: {
          bg: {
            primary: '#0a0a0a',
            secondary: '#0f0f23',
            tertiary: '#1a1a2e',
          },
          text: {
            primary: '#f8fafc',
            secondary: '#cbd5e1',
            muted: '#94a3b8',
          },
          border: {
            primary: '#1e293b',
            secondary: '#334155',
          }
        }
      },
      
      backgroundImage: {
        // Enhanced gradients for both modes
        'mattix-gradient': 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
        'mattix-spectrum': 'linear-gradient(45deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)',
        'mattix-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        'mattix-light': 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
        'mattix-glow-light': 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
        'mattix-glow-dark': 'radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, transparent 70%)',
      },
      
      // Custom CSS variables for dynamic theming
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      }
    }
  },
  
  // CSS Variables approach for dynamic theming
  plugins: [
    function({ addBase }) {
      addBase({
        ':root': {
          '--mattix-primary': '79 172 254',
          '--mattix-primary-foreground': '255 255 255',
          '--mattix-secondary': '0 242 254',
          '--mattix-accent': '102 126 234',
          '--mattix-muted': '118 75 162',
        },
        '.dark': {
          '--mattix-bg-primary': '10 10 10',
          '--mattix-bg-secondary': '15 15 35',
          '--mattix-text-primary': '248 250 252',
          '--mattix-text-secondary': '203 213 225',
          '--mattix-border': '30 41 59',
        },
        '.light': {
          '--mattix-bg-primary': '255 255 255',
          '--mattix-bg-secondary': '248 250 252',
          '--mattix-text-primary': '15 23 42',
          '--mattix-text-secondary': '71 85 105',
          '--mattix-border': '226 232 240',
        }
      })
    }
  ]
}`}</pre>
                </div>
              </div>
            )}

            {activeFramework === "shadcn" && (
              <div className="framework-tab active">
                <h3>🎭 Shadcn UI - Complete Theme System</h3>
                <div className="code-block">
                  <button
                    className="code-copy-btn"
                    onClick={() =>
                      copyToClipboard(
                        `// globals.css - Enhanced Shadcn theme with Mattix colors
@layer base {
  :root {
    /* Light mode - Mattix theme */
    --background: 0 0% 100%;
    --foreground: 240 10% 4%;
    
    /* Primary - Mattix Blue */
    --primary: 211 99% 65%; /* #4facfe */
    --primary-foreground: 0 0% 100%;
    
    /* Secondary - Mattix Cyan */
    --secondary: 183 100% 50%; /* #00f2fe */
    --secondary-foreground: 240 10% 4%;
    
    /* Accent - Mattix Purple */
    --accent: 229 75% 66%; /* #667eea */
    --accent-foreground: 0 0% 100%;
    
    /* Muted - Mattix Deep */
    --muted: 270 37% 46%; /* #764ba2 */
    --muted-foreground: 0 0% 100%;
    
    /* Destructive */
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;
    
    /* Border and inputs */
    --border: 240 6% 90%;
    --input: 240 6% 90%;
    --ring: 211 99% 65%;
    
    /* Card */
    --card: 0 0% 100%;
    --card-foreground: 240 10% 4%;
    
    /* Popover */
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 4%;
    
    /* Radius */
    --radius: 0.5rem;
  }
  
  .dark {
    /* Dark mode - Enhanced Mattix theme */
    --background: 240 10% 4%;
    --foreground: 0 0% 98%;
    
    /* Primary maintains visibility in dark */
    --primary: 211 99% 65%; /* #4facfe */
    --primary-foreground: 240 10% 4%;
    
    /* Secondary adjusted for dark mode */
    --secondary: 183 100% 50%; /* #00f2fe */
    --secondary-foreground: 240 10% 4%;
    
    /* Accent adjusted for dark mode */
    --accent: 229 75% 66%; /* #667eea */
    --accent-foreground: 0 0% 98%;
    
    /* Muted for dark mode */
    --muted: 240 4% 16%;
    --muted-foreground: 240 5% 65%;
    
    /* Destructive for dark mode */
    --destructive: 0 63% 31%;
    --destructive-foreground: 0 0% 98%;
    
    /* Border and inputs for dark */
    --border: 240 4% 16%;
    --input: 240 4% 16%;
    --ring: 211 99% 65%;
    
    /* Card for dark mode */
    --card: 240 10% 4%;
    --card-foreground: 0 0% 98%;
    
    /* Popover for dark mode */
    --popover: 240 10% 4%;
    --popover-foreground: 0 0% 98%;
  }
}

/* Custom Mattix components */
.mattix-gradient {
  background: linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)));
}

.mattix-glow {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.3);
}

/* Theme-aware utilities */
.bg-mattix-adaptive {
  @apply bg-white dark:bg-gray-900;
}

.text-mattix-adaptive {
  @apply text-gray-900 dark:text-gray-100;
}

.border-mattix-adaptive {
  @apply border-gray-200 dark:border-gray-800;
}`,
                        "Shadcn UI Configuration"
                      )
                    }
                    title="Copy Shadcn UI configuration"
                  >
                    <RiFileCopyLine />
                  </button>
                  <pre>{`// globals.css - Enhanced Shadcn theme with Mattix colors
@layer base {
  :root {
    /* Light mode - Mattix theme */
    --background: 0 0% 100%;
    --foreground: 240 10% 4%;
    
    /* Primary - Mattix Blue */
    --primary: 211 99% 65%; /* #4facfe */
    --primary-foreground: 0 0% 100%;
    
    /* Secondary - Mattix Cyan */
    --secondary: 183 100% 50%; /* #00f2fe */
    --secondary-foreground: 240 10% 4%;
    
    /* Accent - Mattix Purple */
    --accent: 229 75% 66%; /* #667eea */
    --accent-foreground: 0 0% 100%;
    
    /* Muted - Mattix Deep */
    --muted: 270 37% 46%; /* #764ba2 */
    --muted-foreground: 0 0% 100%;
    
    /* Destructive */
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;
    
    /* Border and inputs */
    --border: 240 6% 90%;
    --input: 240 6% 90%;
    --ring: 211 99% 65%;
    
    /* Card */
    --card: 0 0% 100%;
    --card-foreground: 240 10% 4%;
    
    /* Popover */
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 4%;
    
    /* Radius */
    --radius: 0.5rem;
  }
  
  .dark {
    /* Dark mode - Enhanced Mattix theme */
    --background: 240 10% 4%;
    --foreground: 0 0% 98%;
    
    /* Primary maintains visibility in dark */
    --primary: 211 99% 65%; /* #4facfe */
    --primary-foreground: 240 10% 4%;
    
    /* Secondary adjusted for dark mode */
    --secondary: 183 100% 50%; /* #00f2fe */
    --secondary-foreground: 240 10% 4%;
    
    /* Accent adjusted for dark mode */
    --accent: 229 75% 66%; /* #667eea */
    --accent-foreground: 0 0% 98%;
    
    /* Muted for dark mode */
    --muted: 240 4% 16%;
    --muted-foreground: 240 5% 65%;
    
    /* Destructive for dark mode */
    --destructive: 0 63% 31%;
    --destructive-foreground: 0 0% 98%;
    
    /* Border and inputs for dark */
    --border: 240 4% 16%;
    --input: 240 4% 16%;
    --ring: 211 99% 65%;
    
    /* Card for dark mode */
    --card: 240 10% 4%;
    --card-foreground: 0 0% 98%;
    
    /* Popover for dark mode */
    --popover: 240 10% 4%;
    --popover-foreground: 0 0% 98%;
  }
}

/* Custom Mattix components */
.mattix-gradient {
  background: linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)));
}

.mattix-glow {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.3);
}

/* Theme-aware utilities */
.bg-mattix-adaptive {
  @apply bg-white dark:bg-gray-900;
}

.text-mattix-adaptive {
  @apply text-gray-900 dark:text-gray-100;
}

.border-mattix-adaptive {
  @apply border-gray-200 dark:border-gray-800;
}`}</pre>
                </div>
              </div>
            )}

            {activeFramework === "hero" && (
              <div className="framework-tab active">
                <h3>🦸 Hero UI - Modern Theme Configuration</h3>
                <div className="code-block">
                  <button
                    className="code-copy-btn"
                    onClick={() =>
                      copyToClipboard(
                        `// hero-ui.config.js - Mattix theme with dark/light modes
export const mattixTheme = {
  colors: {
    // Primary palette
    primary: {
      50: '#f0f9ff',
      100: '#e0f3fe',
      200: '#bae8fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#4facfe',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    
    // Secondary (Cyan)
    secondary: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#00f2fe',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
      950: '#083344',
    },
    
    // Accent (Purple)
    accent: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#667eea',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    
    // Semantic colors for both modes
    success: {
      light: '#10b981',
      dark: '#34d399',
    },
    warning: {
      light: '#f59e0b',
      dark: '#fbbf24',
    },
    error: {
      light: '#ef4444',
      dark: '#f87171',
    },
    info: {
      light: '#3b82f6',
      dark: '#60a5fa',
    },
    
    // Adaptive backgrounds
    background: {
      primary: {
        light: '#ffffff',
        dark: '#0a0a0a',
      },
      secondary: {
        light: '#f8fafc',
        dark: '#0f0f23',
      },
      tertiary: {
        light: '#f1f5f9',
        dark: '#1a1a2e',
      },
    },
    
    // Adaptive text colors
    text: {
      primary: {
        light: '#0f172a',
        dark: '#f8fafc',
      },
      secondary: {
        light: '#475569',
        dark: '#cbd5e1',
      },
      muted: {
        light: '#64748b',
        dark: '#94a3b8',
      },
    },
    
    // Adaptive borders
    border: {
      primary: {
        light: '#e2e8f0',
        dark: '#1e293b',
      },
      secondary: {
        light: '#cbd5e1',
        dark: '#334155',
      },
    },
  },
  
  // Gradient presets
  gradients: {
    primary: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
    spectrum: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)',
    lightBg: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
    darkBg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    glow: {
      light: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
      dark: 'radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, transparent 70%)',
    },
  },
  
  // Animation and effects
  animations: {
    glow: {
      light: 'mattix-glow-light 3s ease-in-out infinite',
      dark: 'mattix-glow-dark 3s ease-in-out infinite',
    },
    pulse: 'mattix-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
};

// Usage example:
// import { mattixTheme } from './hero-ui.config.js';
// const theme = useTheme(); // Assuming you have theme context
// const bgColor = mattixTheme.colors.background.primary[theme.mode];`,
                        "Hero UI Configuration"
                      )
                    }
                    title="Copy Hero UI configuration"
                  >
                    <RiFileCopyLine />
                  </button>
                  <pre>{`// hero-ui.config.js - Mattix theme with dark/light modes
export const mattixTheme = {
  colors: {
    // Primary palette
    primary: {
      50: '#f0f9ff',
      100: '#e0f3fe',
      200: '#bae8fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#4facfe',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    
    // Secondary (Cyan)
    secondary: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#00f2fe',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
      950: '#083344',
    },
    
    // Accent (Purple)
    accent: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#667eea',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    
    // Semantic colors for both modes
    success: {
      light: '#10b981',
      dark: '#34d399',
    },
    warning: {
      light: '#f59e0b',
      dark: '#fbbf24',
    },
    error: {
      light: '#ef4444',
      dark: '#f87171',
    },
    info: {
      light: '#3b82f6',
      dark: '#60a5fa',
    },
    
    // Adaptive backgrounds
    background: {
      primary: {
        light: '#ffffff',
        dark: '#0a0a0a',
      },
      secondary: {
        light: '#f8fafc',
        dark: '#0f0f23',
      },
      tertiary: {
        light: '#f1f5f9',
        dark: '#1a1a2e',
      },
    },
    
    // Adaptive text colors
    text: {
      primary: {
        light: '#0f172a',
        dark: '#f8fafc',
      },
      secondary: {
        light: '#475569',
        dark: '#cbd5e1',
      },
      muted: {
        light: '#64748b',
        dark: '#94a3b8',
      },
    },
    
    // Adaptive borders
    border: {
      primary: {
        light: '#e2e8f0',
        dark: '#1e293b',
      },
      secondary: {
        light: '#cbd5e1',
        dark: '#334155',
      },
    },
  },
  
  // Gradient presets
  gradients: {
    primary: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
    spectrum: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)',
    lightBg: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
    darkBg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    glow: {
      light: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
      dark: 'radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, transparent 70%)',
    },
  },
  
  // Animation and effects
  animations: {
    glow: {
      light: 'mattix-glow-light 3s ease-in-out infinite',
      dark: 'mattix-glow-dark 3s ease-in-out infinite',
    },
    pulse: 'mattix-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
};

// Usage example:
// import { mattixTheme } from './hero-ui.config.js';
// const theme = useTheme(); // Assuming you have theme context
// const bgColor = mattixTheme.colors.background.primary[theme.mode];`}</pre>
                </div>
              </div>
            )}

            {activeFramework === "aceternity" && (
              <div className="framework-tab active">
                <h3>✨ Aceternity UI - Advanced Theme System</h3>
                <div className="code-block">
                  <button
                    className="code-copy-btn"
                    onClick={() =>
                      copyToClipboard(
                        `// aceternity.config.ts - Complete Mattix theme with animations
export const mattixAceternityTheme = {
  colors: {
    // Core brand colors
    primary: {
      DEFAULT: '#4facfe',
      50: '#f0f9ff',
      100: '#e0f3fe',
      200: '#bae8fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#4facfe',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      dark: '#0284c7',
      light: '#bae8fd',
    },
    
    // Extended color palette
    secondary: {
      DEFAULT: '#00f2fe',
      dark: '#0891b2',
      light: '#a5f3fc',
    },
    
    accent: {
      DEFAULT: '#667eea',
      dark: '#4338ca',
      light: '#c084fc',
    },
    
    deep: {
      DEFAULT: '#764ba2',
      dark: '#581c87',
      light: '#d8b4fe',
    },
    
    // Adaptive theme colors
    background: {
      light: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        tertiary: '#f1f5f9',
        elevated: '#ffffff',
        overlay: 'rgba(248, 250, 252, 0.8)',
      },
      dark: {
        primary: '#0a0a0a',
        secondary: '#0f0f23',
        tertiary: '#1a1a2e',
        elevated: '#16213e',
        overlay: 'rgba(10, 10, 10, 0.8)',
      },
    },
    
    text: {
      light: {
        primary: '#0f172a',
        secondary: '#475569',
        muted: '#64748b',
        inverse: '#ffffff',
      },
      dark: {
        primary: '#f8fafc',
        secondary: '#cbd5e1',
        muted: '#94a3b8',
        inverse: '#0f172a',
      },
    },
    
    border: {
      light: {
        primary: '#e2e8f0',
        secondary: '#cbd5e1',
        muted: '#f1f5f9',
        focus: '#4facfe',
      },
      dark: {
        primary: '#1e293b',
        secondary: '#334155',
        muted: '#0f172a',
        focus: '#4facfe',
      },
    },
  },
  
  // Advanced gradients
  gradients: {
    primary: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
    spectrum: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)',
    
    // Theme-aware gradients
    background: {
      light: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
      dark: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    },
    
    glow: {
      light: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
      dark: 'radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, transparent 70%)',
    },
    
    // Interactive gradients
    hover: {
      light: 'linear-gradient(45deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)',
      dark: 'linear-gradient(45deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.2) 100%)',
    },
  },
  
  // Enhanced animations
  animations: {
    // Breathing glow effect
    glow: {
      light: 'mattix-glow-light 3s ease-in-out infinite',
      dark: 'mattix-glow-dark 3s ease-in-out infinite',
    },
    
    // Floating animation
    float: 'mattix-float 6s ease-in-out infinite',
    
    // Pulse with theme awareness
    pulse: {
      light: 'mattix-pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      dark: 'mattix-pulse-dark 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    
    // Shimmer effect
    shimmer: {
      light: 'mattix-shimmer-light 3s linear infinite',
      dark: 'mattix-shimmer-dark 3s linear infinite',
    },
    
    // Gradient animation
    gradientShift: 'mattix-gradient-shift 8s ease-in-out infinite',
  },
};`,
                        "Aceternity UI Configuration"
                      )
                    }
                    title="Copy Aceternity UI configuration"
                  >
                    <RiFileCopyLine />
                  </button>
                  <pre>{`// aceternity.config.ts - Complete Mattix theme with animations
export const mattixAceternityTheme = {
  colors: {
    // Core brand colors
    primary: {
      DEFAULT: '#4facfe',
      50: '#f0f9ff',
      100: '#e0f3fe',
      200: '#bae8fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#4facfe',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      dark: '#0284c7',
      light: '#bae8fd',
    },
    
    // Extended color palette
    secondary: {
      DEFAULT: '#00f2fe',
      dark: '#0891b2',
      light: '#a5f3fc',
    },
    
    accent: {
      DEFAULT: '#667eea',
      dark: '#4338ca',
      light: '#c084fc',
    },
    
    deep: {
      DEFAULT: '#764ba2',
      dark: '#581c87',
      light: '#d8b4fe',
    },
    
    // Adaptive theme colors
    background: {
      light: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        tertiary: '#f1f5f9',
        elevated: '#ffffff',
        overlay: 'rgba(248, 250, 252, 0.8)',
      },
      dark: {
        primary: '#0a0a0a',
        secondary: '#0f0f23',
        tertiary: '#1a1a2e',
        elevated: '#16213e',
        overlay: 'rgba(10, 10, 10, 0.8)',
      },
    },
    
    text: {
      light: {
        primary: '#0f172a',
        secondary: '#475569',
        muted: '#64748b',
        inverse: '#ffffff',
      },
      dark: {
        primary: '#f8fafc',
        secondary: '#cbd5e1',
        muted: '#94a3b8',
        inverse: '#0f172a',
      },
    },
    
    border: {
      light: {
        primary: '#e2e8f0',
        secondary: '#cbd5e1',
        muted: '#f1f5f9',
        focus: '#4facfe',
      },
      dark: {
        primary: '#1e293b',
        secondary: '#334155',
        muted: '#0f172a',
        focus: '#4facfe',
      },
    },
  },
  
  // Advanced gradients
  gradients: {
    primary: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
    spectrum: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)',
    
    // Theme-aware gradients
    background: {
      light: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
      dark: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    },
    
    glow: {
      light: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
      dark: 'radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, transparent 70%)',
    },
    
    // Interactive gradients
    hover: {
      light: 'linear-gradient(45deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)',
      dark: 'linear-gradient(45deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.2) 100%)',
    },
  },
  
  // Enhanced animations
  animations: {
    // Breathing glow effect
    glow: {
      light: 'mattix-glow-light 3s ease-in-out infinite',
      dark: 'mattix-glow-dark 3s ease-in-out infinite',
    },
    
    // Floating animation
    float: 'mattix-float 6s ease-in-out infinite',
    
    // Pulse with theme awareness
    pulse: {
      light: 'mattix-pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      dark: 'mattix-pulse-dark 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    
    // Shimmer effect
    shimmer: {
      light: 'mattix-shimmer-light 3s linear infinite',
      dark: 'mattix-shimmer-dark 3s linear infinite',
    },
    
    // Gradient animation
    gradientShift: 'mattix-gradient-shift 8s ease-in-out infinite',
  },
};

// Example usage:
/*
import { mattixAceternityTheme } from './aceternity.config.ts';

const StyledComponent = styled.div\`
  background: \${props => props.theme === 'dark' 
    ? mattixAceternityTheme.colors.background.dark.primary 
    : mattixAceternityTheme.colors.background.light.primary};
  
  \${mattixAceternityTheme.utils.themeAware(
    { color: mattixAceternityTheme.colors.text.light.primary },
    { color: mattixAceternityTheme.colors.text.dark.primary }
  )}
\`;
*/`}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Export Section */}
      <section id="export" className="color-section">
        <div className="container">
          <h2>Export & Download</h2>
          <div className="export-grid">
            <div className="export-card">
              <h3>📄 CSS Variables</h3>
              <p>Download CSS custom properties for any project</p>
              <div className="export-actions">
                <button
                  className="export-btn"
                  onClick={() => {
                    const cssContent = `:root {
  /* MATTIX Brand Colors */
  --mattix-primary: #4facfe;
  --mattix-cyan: #00f2fe;
  --mattix-purple: #667eea;
  --mattix-deep: #764ba2;
  --mattix-pink: #f093fb;

  /* MATTIX Brand Gradients */
  --mattix-gradient: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
  --mattix-spectrum: linear-gradient(45deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #f093fb 100%);
  --aurora-borealis: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  --neon-glow: linear-gradient(45deg, #ff0080 0%, #ff8c00 50%, #40e0d0 100%);
  --ocean-wave: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
  --sunset-paradise: linear-gradient(45deg, #fa709a 0%, #fee140 100%);
  --deep-space: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%);
  --emerald-water: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
  --warm-flame: linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  --neural-network: linear-gradient(135deg, #667eea 0%, #764ba2 20%, #f093fb 40%, #4facfe 60%, #00f2fe 80%, #89f7fe 100%);
}`;
                    const blob = new Blob([cssContent], { type: "text/css" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "mattix-colors.css";
                    a.click();
                    URL.revokeObjectURL(url);
                    addToast("🎨 CSS Variables downloaded!", "success");
                  }}
                >
                  <RiDownloadLine /> Download CSS
                </button>
                <button
                  className="export-btn secondary"
                  onClick={() =>
                    copyToClipboard(
                      `:root {
  --mattix-primary: #4facfe;
  --mattix-cyan: #00f2fe;
  --mattix-purple: #667eea;
  --mattix-deep: #764ba2;
}`,
                      "CSS Variables"
                    )
                  }
                >
                  <RiFileCopyLine /> Copy CSS
                </button>
              </div>
            </div>
            <div className="export-card">
              <h3>🎨 Figma Tokens</h3>
              <p>Import directly into Figma design system</p>
              <div className="export-actions">
                <button
                  className="export-btn"
                  onClick={() => {
                    const figmaTokens = JSON.stringify(
                      {
                        mattix: {
                          primary: { value: "#4facfe", type: "color" },
                          cyan: { value: "#00f2fe", type: "color" },
                          purple: { value: "#667eea", type: "color" },
                          deep: { value: "#764ba2", type: "color" },
                          pink: { value: "#f093fb", type: "color" },
                        },
                      },
                      null,
                      2
                    );
                    const blob = new Blob([figmaTokens], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "mattix-figma-tokens.json";
                    a.click();
                    URL.revokeObjectURL(url);
                    addToast("🎨 Figma tokens downloaded!", "success");
                  }}
                >
                  <RiDownloadLine /> Download JSON
                </button>
                <button
                  className="export-btn secondary"
                  onClick={() => {
                    copyToClipboard(
                      "https://www.figma.com/community/plugin/mattix-colors",
                      "Figma Plugin URL"
                    );
                    addToast("🔗 Figma Plugin URL copied!", "success");
                  }}
                >
                  <RiFileCopyLine /> Copy Plugin URL
                </button>
              </div>
            </div>
            <div className="export-card">
              <h3>📱 Mobile Colors</h3>
              <p>Color definitions for iOS and Android development</p>
              <div className="export-actions">
                <button
                  className="export-btn"
                  onClick={() => {
                    const swiftContent = `// MATTIX Colors for iOS
struct MattixColors {
    static let primary = UIColor(red: 0.31, green: 0.67, blue: 1.0, alpha: 1.0) // #4facfe
    static let cyan = UIColor(red: 0.0, green: 0.95, blue: 1.0, alpha: 1.0) // #00f2fe
    static let purple = UIColor(red: 0.4, green: 0.49, blue: 0.92, alpha: 1.0) // #667eea
    static let deep = UIColor(red: 0.46, green: 0.29, blue: 0.64, alpha: 1.0) // #764ba2
}`;
                    const blob = new Blob([swiftContent], {
                      type: "text/swift",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "MattixColors.swift";
                    a.click();
                    URL.revokeObjectURL(url);
                    addToast("📱 iOS Colors downloaded!", "success");
                  }}
                >
                  <RiDownloadLine /> Download iOS
                </button>
                <button
                  className="export-btn secondary"
                  onClick={() => {
                    const kotlinContent = `// MATTIX Colors for Android
object MattixColors {
    const val PRIMARY = 0xFF4FACFE
    const val CYAN = 0xFF00F2FE
    const val PURPLE = 0xFF667EEA
    const val DEEP = 0xFF764BA2
}`;
                    const blob = new Blob([kotlinContent], {
                      type: "text/kotlin",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "MattixColors.kt";
                    a.click();
                    URL.revokeObjectURL(url);
                    addToast("🤖 Android Colors downloaded!", "success");
                  }}
                >
                  <RiDownloadLine /> Download Android
                </button>
              </div>
            </div>
            <div className="export-card">
              <h3>🛠️ Framework Configs</h3>
              <p>Ready-to-use configuration files for popular frameworks</p>
              <div className="export-actions">
                <button
                  className="export-btn"
                  onClick={() => {
                    const configContent = `// Tailwind CSS Config
module.exports = {
  theme: {
    extend: {
      colors: {
        mattix: {
          primary: '#4facfe',
          cyan: '#00f2fe',
          purple: '#667eea',
          deep: '#764ba2',
          pink: '#f093fb',
        }
      }
    }
  }
}`;
                    const blob = new Blob([configContent], {
                      type: "text/javascript",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "tailwind.config.js";
                    a.click();
                    URL.revokeObjectURL(url);
                    addToast("⚡ Tailwind config downloaded!", "success");
                  }}
                >
                  <RiDownloadLine /> Download Config
                </button>
                <button
                  className="export-btn secondary"
                  onClick={() =>
                    copyToClipboard(
                      `{
  "mattix": {
    "primary": "#4facfe",
    "cyan": "#00f2fe", 
    "purple": "#667eea",
    "deep": "#764ba2"
  }
}`,
                      "Framework Config JSON"
                    )
                  }
                >
                  <RiFileCopyLine /> Copy JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type} ${
              toast.isVisible ? "toast-visible" : ""
            }`}
          >
            <div className="toast-content">
              <div className="toast-icon">
                {toast.type === "success" ? <RiCheckLine /> : <RiCloseLine />}
              </div>
              <span className="toast-message">{toast.message}</span>
            </div>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
            >
              <RiCloseLine />
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ColorSystemPage;
