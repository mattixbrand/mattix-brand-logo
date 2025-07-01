import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MattixLogo, { InfinityLoader } from "../components/MattixLogo";

describe("MattixLogo Component", () => {
  it("renders animated version by default", () => {
    render(<MattixLogo data-testid="mattix-logo" />);

    const svg = screen.getByTestId("mattix-logo");
    expect(svg).toBeTruthy();
    expect(svg.tagName).toBe("svg");
    expect(svg.getAttribute("width")).toBe("280");
    expect(svg.getAttribute("height")).toBe("100.8"); // 280 * 0.36
  });

  it("renders static version when animated is false", () => {
    render(<MattixLogo animated={false} data-testid="mattix-logo-static" />);

    const staticDiv = screen.getByTestId("mattix-logo-static");
    expect(staticDiv).toBeTruthy();
    expect(staticDiv.tagName).toBe("DIV");
    expect(staticDiv.textContent).toContain("∞ATTIX");
  });

  it("applies custom size correctly", () => {
    render(<MattixLogo size={400} data-testid="mattix-logo-large" />);

    const svg = screen.getByTestId("mattix-logo-large");
    expect(svg.getAttribute("width")).toBe("400");
    expect(svg.getAttribute("height")).toBe("144"); // 400 * 0.36
  });

  it("applies custom className", () => {
    render(
      <MattixLogo className="custom-class" data-testid="mattix-logo-custom" />
    );

    const svg = screen.getByTestId("mattix-logo-custom");
    expect(svg.classList.contains("custom-class")).toBe(true);
  });

  it("contains required SVG elements for animation", () => {
    render(<MattixLogo data-testid="mattix-logo-animated" />);

    const svg = screen.getByTestId("mattix-logo-animated");

    // Check for gradient definition
    const gradient = svg.querySelector("#snakeGradient");
    expect(gradient).toBeTruthy();

    // Check for filter definition
    const filter = svg.querySelector("#snakeGlow");
    expect(filter).toBeTruthy();

    // Check for animated path
    const path = svg.querySelector("path");
    expect(path).toBeTruthy();
    expect(path?.getAttribute("stroke-dasharray")).toBe("40 160");

    // Check for text element
    const text = svg.querySelector("text");
    expect(text).toBeTruthy();
    expect(text?.textContent).toBe("ATTIX");
  });

  it("has proper animation attributes", () => {
    render(<MattixLogo data-testid="mattix-logo-anim" />);

    const svg = screen.getByTestId("mattix-logo-anim");
    const animations = svg.querySelectorAll("animate");

    expect(animations.length).toBe(3); // d, stroke-dashoffset, stroke-width

    // Check morphing animation
    const morphAnim = svg.querySelector('animate[attributeName="d"]');
    expect(morphAnim).toBeTruthy();
    expect(morphAnim?.getAttribute("dur")).toBe("12s");
    expect(morphAnim?.getAttribute("repeatCount")).toBe("indefinite");
  });

  it("static version has correct styling", () => {
    render(
      <MattixLogo animated={false} size={100} data-testid="static-logo" />
    );

    const staticDiv = screen.getByTestId("static-logo");

    expect(staticDiv.style.fontSize).toBe("17px"); // 100 * 0.17
    expect(staticDiv.style.fontWeight).toBe("900");
  });
});

describe("InfinityLoader Component", () => {
  it("renders with default props", () => {
    render(<InfinityLoader data-testid="infinity-loader" />);

    const loader = screen.getByTestId("infinity-loader");
    expect(loader).toBeTruthy();
    expect(loader.textContent).toBe("∞");
    expect(loader).toHaveClass("loading-text");
    // Font size should come from CSS, not inline styles
    expect(loader.style.fontSize).toBe("");
  });

  it("applies custom size", () => {
    render(<InfinityLoader size={64} data-testid="infinity-loader-large" />);

    const loader = screen.getByTestId("infinity-loader-large");
    expect(loader.style.fontSize).toBe("64px");
  });

  it("applies custom className", () => {
    render(
      <InfinityLoader
        className="loader-custom"
        data-testid="infinity-loader-custom"
      />
    );

    const loader = screen.getByTestId("infinity-loader-custom");
    expect(loader.classList.contains("loader-custom")).toBe(true);
  });

  it("has loading animation css class", () => {
    render(<InfinityLoader data-testid="infinity-loader-anim" />);

    const loader = screen.getByTestId("infinity-loader-anim");
    expect(loader).toHaveClass("loading-text");
  });

  it("has proper CSS styling through class", () => {
    render(<InfinityLoader data-testid="infinity-loader-gradient" />);

    const loader = screen.getByTestId("infinity-loader-gradient");
    expect(loader).toHaveClass("loading-text");
    expect(loader.textContent).toBe("∞");
  });
});
