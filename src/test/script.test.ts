import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  showStaticVersion,
  hideStaticVersion,
  copyLoadingCode,
  downloadLoadingComponent,
  downloadSVG,
} from "../script";

// Mock DOM elements
// const mockElement = {
//   style: { display: "" },
// };

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

// Mock URL methods
global.URL.createObjectURL = vi.fn().mockReturnValue("mock-url");
global.URL.revokeObjectURL = vi.fn();

// Mock document methods
Object.defineProperty(document, "getElementById", {
  value: vi.fn(),
  writable: true,
});

Object.defineProperty(document, "createElement", {
  value: vi.fn(),
  writable: true,
});

describe("DOM Utility Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("showStaticVersion", () => {
    it("should show static version element", () => {
      const mockEl = { style: { display: "none" } };
      vi.mocked(document.getElementById).mockReturnValue(mockEl as any);

      showStaticVersion();

      expect(document.getElementById).toHaveBeenCalledWith("staticVersion");
      expect(mockEl.style.display).toBe("flex");
    });

    it("should handle missing element gracefully", () => {
      vi.mocked(document.getElementById).mockReturnValue(null);

      expect(() => showStaticVersion()).not.toThrow();
      expect(document.getElementById).toHaveBeenCalledWith("staticVersion");
    });
  });

  describe("hideStaticVersion", () => {
    it("should hide static version element", () => {
      const mockEl = { style: { display: "flex" } };
      vi.mocked(document.getElementById).mockReturnValue(mockEl as any);

      hideStaticVersion();

      expect(document.getElementById).toHaveBeenCalledWith("staticVersion");
      expect(mockEl.style.display).toBe("none");
    });

    it("should handle missing element gracefully", () => {
      vi.mocked(document.getElementById).mockReturnValue(null);

      expect(() => hideStaticVersion()).not.toThrow();
    });
  });

  describe("copyLoadingCode", () => {
    it("should copy code to clipboard and show preview", async () => {
      const mockEl = { style: { display: "none" } };
      vi.mocked(document.getElementById).mockReturnValue(mockEl as any);

      await copyLoadingCode();

      expect(navigator.clipboard.writeText).toHaveBeenCalled();
      expect(mockEl.style.display).toBe("block");

      // Check that it contains the expected code
      const copiedCode = vi.mocked(navigator.clipboard.writeText).mock
        .calls[0][0];
      expect(copiedCode).toContain("InfinityLoader");
      expect(copiedCode).toContain("linear-gradient");
      expect(copiedCode).toContain("∞");
    });

    it("should handle clipboard error gracefully", async () => {
      vi.mocked(navigator.clipboard.writeText).mockRejectedValue(
        new Error("Clipboard error")
      );
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      await copyLoadingCode();

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to copy code:",
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });

    it("should handle missing preview element", async () => {
      vi.mocked(document.getElementById).mockReturnValue(null);

      await expect(copyLoadingCode()).resolves.not.toThrow();
    });
  });

  describe("downloadLoadingComponent", () => {
    it("should create and download TypeScript file", () => {
      const mockLink = {
        href: "",
        download: "",
        click: vi.fn(),
      };
      vi.mocked(document.createElement).mockReturnValue(mockLink as any);

      downloadLoadingComponent();

      expect(document.createElement).toHaveBeenCalledWith("a");
      expect(mockLink.download).toBe("MattixLogo.tsx");
      expect(mockLink.click).toHaveBeenCalled();
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });

    it("should generate valid TypeScript component code", () => {
      const mockBlob = vi.fn();
      global.Blob = mockBlob as any;

      downloadLoadingComponent();

      expect(mockBlob).toHaveBeenCalled();
      const blobCall = mockBlob.mock.calls[0];
      const componentCode = blobCall[0][0];

      expect(componentCode).toContain("React.FC<MattixLogoProps>");
      expect(componentCode).toContain("interface MattixLogoProps");
      expect(componentCode).toContain("interface InfinityLoaderProps");
      expect(componentCode).toContain("export { MattixLogo, InfinityLoader }");
    });
  });

  describe("downloadSVG", () => {
    beforeEach(() => {
      // Mock JSZip
      global.window = {
        JSZip: function () {
          return {
            file: vi.fn(),
            generateAsync: vi.fn().mockResolvedValue(new Blob()),
          };
        },
      } as any;
    });

    it("should create ZIP file with all SVG variants", async () => {
      const mockZip = {
        file: vi.fn(),
        generateAsync: vi.fn().mockResolvedValue(new Blob()),
      };
      global.window.JSZip = vi.fn().mockReturnValue(mockZip);

      const mockLink = {
        href: "",
        download: "",
        click: vi.fn(),
      };
      vi.mocked(document.createElement).mockReturnValue(mockLink as any);

      downloadSVG();

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

      await mockZip.generateAsync.mock.results[0].value;
      expect(mockLink.download).toBe("mattix-snake-brand-logos.zip");
      expect(mockLink.click).toHaveBeenCalled();
    });

    it("should generate valid SVG content", () => {
      const mockZip = {
        file: vi.fn(),
        generateAsync: vi.fn().mockResolvedValue(new Blob()),
      };
      global.window.JSZip = vi.fn().mockReturnValue(mockZip);

      downloadSVG();

      // Check animated SVG content
      const animatedSVG = mockZip.file.mock.calls[0][1];
      expect(animatedSVG).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(animatedSVG).toContain('<svg width="280" height="100"');
      expect(animatedSVG).toContain("snakeGradient");
      expect(animatedSVG).toContain('<animate attributeName="d"');
      expect(animatedSVG).toContain("ATTIX");

      // Check static SVG content
      const staticSVG = mockZip.file.mock.calls[1][1];
      expect(staticSVG).toContain("∞ATTIX");
      expect(staticSVG).toContain("textGradient");
    });

    it("should fallback to separate downloads when JSZip unavailable", () => {
      global.window = {} as any; // No JSZip

      const mockLink = {
        href: "",
        download: "",
        click: vi.fn(),
      };
      vi.mocked(document.createElement).mockReturnValue(mockLink as any);

      downloadSVG();

      // Should create multiple download links with timeouts
      expect(vi.mocked(document.createElement)).toHaveBeenCalledWith("a");
      expect(mockLink.click).toHaveBeenCalled();
    });
  });
});

describe("SVG Content Generation", () => {
  it("should generate proper animated SVG structure", () => {
    const mockZip = {
      file: vi.fn(),
      generateAsync: vi.fn().mockResolvedValue(new Blob()),
    };
    global.window = { JSZip: vi.fn().mockReturnValue(mockZip) } as any;

    downloadSVG();

    const animatedSVG = mockZip.file.mock.calls[0][1];

    // Check essential animation elements
    expect(animatedSVG).toContain('stroke-dasharray="40 160"');
    expect(animatedSVG).toContain('dur="12s"');
    expect(animatedSVG).toContain('repeatCount="indefinite"');
    expect(animatedSVG).toContain('calcMode="spline"');

    // Check morphing path values
    expect(animatedSVG).toContain("M45,50 C45,25");
    expect(animatedSVG).toContain("M30,75 L30,40 Q30,25");

    // Check gradient colors
    expect(animatedSVG).toContain("#00f2fe");
    expect(animatedSVG).toContain("#4facfe");
    expect(animatedSVG).toContain("#ffffff");
    expect(animatedSVG).toContain("#667eea");
    expect(animatedSVG).toContain("#764ba2");
  });

  it("should generate proper static SVG variants", () => {
    const mockZip = {
      file: vi.fn(),
      generateAsync: vi.fn().mockResolvedValue(new Blob()),
    };
    global.window = { JSZip: vi.fn().mockReturnValue(mockZip) } as any;

    downloadSVG();

    // Check ∞ATTIX logo
    const infinityAttixSVG = mockZip.file.mock.calls[1][1];
    expect(infinityAttixSVG).toContain("∞ATTIX");
    expect(infinityAttixSVG).toContain("textGradient");

    // Check MATTIX logo
    const mattixSVG = mockZip.file.mock.calls[2][1];
    expect(mattixSVG).toContain("MATTIX");
    expect(mattixSVG).toContain("textGradient");

    // Check loading symbol
    const loadingSVG = mockZip.file.mock.calls[3][1];
    expect(loadingSVG).toContain("∞");
    expect(loadingSVG).toContain("loadingGradient");
    expect(loadingSVG).toContain('width="60" height="60"');
  });
});
