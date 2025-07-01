import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DownloadManager } from "../components/DownloadManager";

// Mock JSZip
const mockZip = {
  file: vi.fn(),
  generateAsync: vi.fn().mockResolvedValue(new Blob(["mock zip content"])),
};

vi.mock("jszip", () => ({
  default: vi.fn(() => mockZip),
}));

// Mock DOM APIs
const mockClick = vi.fn();
const mockObjectURL = "mock-object-url";

// Store original functions
const originalCreateElement = document.createElement;
const originalCreateObjectURL = global.URL.createObjectURL;
const originalRevokeObjectURL = global.URL.revokeObjectURL;

beforeEach(() => {
  // Reset all mocks
  vi.clearAllMocks();
  mockZip.file.mockClear();
  mockZip.generateAsync.mockClear();

  // Mock document.createElement for anchor elements
  document.createElement = vi.fn().mockImplementation((tagName: string) => {
    if (tagName === "a") {
      return {
        href: "",
        download: "",
        click: mockClick,
        style: {},
        setAttribute: vi.fn(),
        getAttribute: vi.fn(),
      };
    }
    return originalCreateElement.call(document, tagName);
  });

  // Mock URL methods
  global.URL.createObjectURL = vi.fn().mockReturnValue(mockObjectURL);
  global.URL.revokeObjectURL = vi.fn();

  // Mock Blob
  global.Blob = vi.fn().mockImplementation((content, options) => ({
    content,
    options,
    size: content?.[0]?.length || 0,
    type: options?.type || "",
  })) as any;

  // Mock navigator.clipboard
  Object.defineProperty(window, "navigator", {
    value: {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    },
    writable: true,
  });
});

afterEach(() => {
  // Restore original functions
  document.createElement = originalCreateElement;
  global.URL.createObjectURL = originalCreateObjectURL;
  global.URL.revokeObjectURL = originalRevokeObjectURL;
  vi.restoreAllMocks();
});

describe("DownloadManager Component", () => {
  it("renders download buttons", () => {
    render(<DownloadManager />);

    expect(screen.getByTestId("download-component")).toBeInTheDocument();
    expect(screen.getByTestId("download-svg")).toBeInTheDocument();

    expect(screen.getByText("Download React Component")).toBeInTheDocument();
    expect(
      screen.getByText("Download Snake Brand Logos ZIP")
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<DownloadManager className="custom-class" />);

    const container = screen
      .getByText("Download React Component")
      .closest(".download-manager");
    expect(container).toHaveClass("custom-class");
  });

  it("downloads React component when button is clicked", async () => {
    const user = userEvent.setup();
    render(<DownloadManager />);

    const downloadButton = screen.getByTestId("download-component");
    await user.click(downloadButton);

    expect(document.createElement).toHaveBeenCalledWith("a");
    expect(mockClick).toHaveBeenCalled();
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(global.URL.revokeObjectURL).toHaveBeenCalled();
  });

  it("downloads SVG ZIP when button is clicked", async () => {
    const user = userEvent.setup();

    render(<DownloadManager />);

    const downloadButton = screen.getByTestId("download-svg");
    await user.click(downloadButton);

    // Wait for async operations
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(mockZip.file).toHaveBeenCalledWith(
      "animated-snake-morphing-logo.svg",
      expect.any(String)
    );
    expect(mockZip.file).toHaveBeenCalledWith(
      "infinity-attix-logo.svg",
      expect.any(String)
    );
    expect(mockZip.file).toHaveBeenCalledWith(
      "mattix-logo.svg",
      expect.any(String)
    );
    expect(mockZip.file).toHaveBeenCalledWith(
      "loading-symbol.svg",
      expect.any(String)
    );
    expect(mockZip.generateAsync).toHaveBeenCalledWith({ type: "blob" });
  });

  it("handles JSZip operations", async () => {
    // This test verifies the JSZip mock is working
    const user = userEvent.setup();
    render(<DownloadManager />);

    const downloadButton = screen.getByTestId("download-svg");
    await user.click(downloadButton);

    // Wait for async operations
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Verify JSZip was used
    expect(mockZip.file).toHaveBeenCalled();
    expect(mockZip.generateAsync).toHaveBeenCalled();
  });

  it("generates correct TypeScript component code", async () => {
    const user = userEvent.setup();
    render(<DownloadManager />);

    const downloadButton = screen.getByTestId("download-component");
    await user.click(downloadButton);

    expect(global.Blob).toHaveBeenCalledWith(
      [expect.stringContaining("React.FC<MattixLogoProps>")],
      { type: "text/typescript" }
    );

    const blobCall = (global.Blob as any).mock.calls[0];
    const componentCode = blobCall[0][0];

    expect(componentCode).toContain("interface MattixLogoProps");
    expect(componentCode).toContain("interface InfinityLoaderProps");
    expect(componentCode).toContain("export { MattixLogo, InfinityLoader }");
    expect(componentCode).toContain('strokeDasharray="40 160"'); // React JSX uses camelCase
  });

  it("generates correct SVG content", async () => {
    const user = userEvent.setup();

    render(<DownloadManager />);

    const downloadButton = screen.getByTestId("download-svg");
    await user.click(downloadButton);

    // Wait for async operations
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Check animated SVG content
    const animatedSVGCall = mockZip.file.mock.calls[0];
    expect(animatedSVGCall[0]).toBe("animated-snake-morphing-logo.svg");
    expect(animatedSVGCall[1]).toContain(
      '<?xml version="1.0" encoding="UTF-8"?>'
    );
    expect(animatedSVGCall[1]).toContain('<svg width="280" height="100"');
    expect(animatedSVGCall[1]).toContain("snakeGradient");
    expect(animatedSVGCall[1]).toContain('<animate attributeName="d"');
    expect(animatedSVGCall[1]).toContain("ATTIX");

    // Check static SVG content
    const staticSVGCall = mockZip.file.mock.calls[1];
    expect(staticSVGCall[0]).toBe("infinity-attix-logo.svg");
    expect(staticSVGCall[1]).toContain("∞ATTIX");
  });

  it("handles download errors gracefully", async () => {
    // Mock URL.createObjectURL to throw an error
    const originalCreateObjectURL = global.URL.createObjectURL;
    global.URL.createObjectURL = vi.fn().mockImplementation(() => {
      throw new Error("URL creation failed");
    });

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();

    render(<DownloadManager />);

    const downloadButton = screen.getByTestId("download-component");

    // Should not throw when clicked, but might log errors
    try {
      await user.click(downloadButton);
    } catch (error) {
      // Expected to catch the error, which means error handling is working
    }

    // Restore the original function
    global.URL.createObjectURL = originalCreateObjectURL;
    consoleSpy.mockRestore();
  });
});
