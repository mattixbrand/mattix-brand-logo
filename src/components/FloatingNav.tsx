import React, { useEffect, useState } from "react";
import { useNavigation } from "../contexts/NavigationContext";
import { RiPaletteLine, RiDownloadLine } from "@remixicon/react";

interface FloatingNavProps {
  sections: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number | string; className?: string }>;
  }>;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ sections }) => {
  const { currentSection, setCurrentSection, isNavVisible } = useNavigation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (!isNavVisible) return null;

  return (
    <nav className={`floating-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <RiPaletteLine size={20} className="nav-logo" />
          <span className="nav-title">Color System</span>
        </div>

        <div className="nav-sections">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`nav-item ${
                  currentSection === section.id ? "active" : ""
                }`}
                title={section.label}
              >
                <IconComponent size={16} className="nav-icon" />
                <span className="nav-label">{section.label}</span>
              </button>
            );
          })}
        </div>

        <div className="nav-actions">
          <button className="nav-download" title="Download Color System">
            <RiDownloadLine size={16} className="nav-icon" />
            <span className="nav-label">Export</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
