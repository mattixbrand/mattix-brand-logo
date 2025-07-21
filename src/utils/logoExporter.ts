import { trackLogoDownload } from './gtm';

export interface LogoExportOptions {
  size: number;
  format: "png" | "svg" | "ico" | "pdf" | "jpg" | "jpeg" | "webp";
  backgroundColor: string;
  variant: "default" | "static" | "mono" | "inverse";
  logoType?: "full" | "symbol" | "text";
  textVariant?: "MATTIX" | "∞ATTIX";
  quality?: number;
  customImage?: string; // URL or data URL of uploaded image
}

export interface ExportResult {
  url: string;
  filename: string;
  format: string;
  size: number;
}

export class LogoExporter {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
  }

  async exportLogo(options: LogoExportOptions): Promise<ExportResult> {
    const {
      size,
      format,
      backgroundColor,
      variant,
      logoType = "full",
      textVariant = "MATTIX",
      customImage,
    } = options;

    // If custom image is provided, use it instead of MATTIX logo
    if (customImage) {
      return this.exportCustomImage(options);
    }

    if (format === "svg") {
      return this.exportSVG(
        size,
        backgroundColor,
        variant,
        logoType,
        textVariant
      );
    } else {
      return this.exportRaster(options);
    }
  }

  private async exportSVG(
    size: number,
    backgroundColor: string,
    variant: string,
    logoType: string = "full",
    textVariant: string = "MATTIX"
  ): Promise<ExportResult> {
    // Full infinity path for complete logos (centered in 400x400 viewBox)
    const fullInfinityPath =
      "M120,200 C120,140 160,100 200,100 C240,100 240,140 240,140 C240,140 240,100 280,100 C320,100 360,140 360,200 C360,260 320,300 280,300 C240,300 240,260 240,260 C240,260 240,300 200,300 C160,300 120,260 120,200 Z";

    // Create SVG content based on logoType
    let svgContent = "";

    if (logoType === "symbol") {
      // Symbol only - Unicode infinity symbol matching StaticVersionModal
      const colors = this.getColors(variant);
      let gradientStops = "";
      let filterDef = "";

      if (variant === "mono") {
        gradientStops = `
          <stop offset="0%" stop-color="${colors.primary}" />
          <stop offset="100%" stop-color="${colors.secondary}" />`;
      } else if (variant === "inverse") {
        gradientStops = `
          <stop offset="0%" stop-color="${colors.primary}" />
          <stop offset="100%" stop-color="${colors.secondary}" />`;
      } else {
        // Default - use MATTIX Spectrum gradient
        gradientStops = `
          <stop offset="0%" stop-color="#4facfe" />
          <stop offset="25%" stop-color="#00f2fe" />
          <stop offset="50%" stop-color="#667eea" />
          <stop offset="75%" stop-color="#764ba2" />
          <stop offset="100%" stop-color="#f093fb" />`;
        filterDef = `
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#4facfe" flood-opacity="0.5"/>
          </filter>`;
      }

      svgContent = `
        <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${
            backgroundColor !== "transparent"
              ? `<rect width="100" height="100" fill="${backgroundColor}" />`
              : ""
          }
          <defs>
            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              ${gradientStops}
            </linearGradient>
            ${filterDef}
          </defs>
          <text x="50" y="50" text-anchor="middle" dominant-baseline="middle" 
                fill="url(#primaryGradient)" font-size="48" 
                font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
                font-weight="900" ${
                  variant === "default" || variant === "static"
                    ? 'filter="url(#dropShadow)"'
                    : ""
                }>∞</text>
        </svg>
      `;
    } else if (logoType === "text") {
      // Text only
      svgContent = `
        <svg width="${size}" height="${size}" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
          ${
            backgroundColor !== "transparent"
              ? `<rect width="400" height="100" fill="${backgroundColor}" />`
              : ""
          }
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="${this.getColors(variant).text}" />
              <stop offset="100%" stop-color="${
                this.getColors(variant).primary
              }" />
            </linearGradient>
          </defs>
          <text x="200" y="60" text-anchor="middle" 
                fill="url(#textGradient)" font-size="48" 
                font-family="Arial, sans-serif" font-weight="bold">${textVariant}</text>
        </svg>
      `;
    } else {
      // Full logo - symbol + text
      svgContent = `
        <svg width="${size}" height="${size}" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          ${
            backgroundColor !== "transparent"
              ? `<rect width="400" height="400" fill="${backgroundColor}" />`
              : ""
          }
          <defs>
            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${
                this.getColors(variant).primary
              }" />
              <stop offset="100%" stop-color="${
                this.getColors(variant).secondary
              }" />
            </linearGradient>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="${this.getColors(variant).text}" />
              <stop offset="100%" stop-color="${
                this.getColors(variant).primary
              }" />
            </linearGradient>
          </defs>
          <path d="${fullInfinityPath}" 
                fill="none" stroke="url(#primaryGradient)" 
                stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <text x="200" y="320" text-anchor="middle" 
                fill="url(#textGradient)" font-size="42" 
                font-family="Arial, sans-serif" font-weight="bold">${textVariant}</text>
        </svg>
      `;
    }

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const timestamp = Date.now();
    const filename = `mattix-logo-${logoType}-${variant}-${size}x${size}-${timestamp}.svg`;

    return {
      url,
      filename,
      format: "svg",
      size,
    };
  }

  private async exportRaster(
    options: LogoExportOptions
  ): Promise<ExportResult> {
    const {
      size,
      format,
      backgroundColor,
      variant,
      logoType = "full",
    } = options;

    // Set canvas size
    this.canvas.width = size;
    this.canvas.height = size;

    // Clear canvas
    this.ctx.clearRect(0, 0, size, size);

    // Set background
    if (backgroundColor !== "transparent") {
      this.ctx.fillStyle = backgroundColor;
      this.ctx.fillRect(0, 0, size, size);
    }

    // Render logo based on logoType
    if (logoType === "symbol") {
      await this.renderInfinitySymbol(variant, size);
    } else {
      // For full logos, still use the old method temporarily
      await this.renderLogo(variant, size);
    }

    // Export canvas
    return this.exportCanvas(format, size, variant, logoType);
  }

  private getColors(variant: string) {
    switch (variant) {
      case "mono":
        return {
          primary: "#000000",
          secondary: "#333333",
          text: "#000000",
        };
      case "inverse":
        return {
          primary: "#ffffff",
          secondary: "#f0f0f0",
          text: "#ffffff",
        };
      default:
        return {
          primary: "#4facfe", // MATTIX Spectrum start
          secondary: "#f093fb", // MATTIX Spectrum end
          tertiary: "#667eea", // MATTIX Spectrum middle
          text: "#4facfe",
        };
    }
  }

  private async renderInfinitySymbol(
    variant: string,
    size: number
  ): Promise<void> {
    const centerX = size / 2;
    const centerY = size / 2;

    // Create gradient for the infinity symbol
    let gradient: CanvasGradient;

    if (variant === "mono") {
      this.ctx.fillStyle = "#000000";
    } else if (variant === "inverse") {
      this.ctx.fillStyle = "#ffffff";
    } else {
      // Default - use MATTIX Spectrum gradient colors (45 degrees)
      gradient = this.ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, "#4facfe");
      gradient.addColorStop(0.25, "#00f2fe");
      gradient.addColorStop(0.5, "#667eea");
      gradient.addColorStop(0.75, "#764ba2");
      gradient.addColorStop(1, "#f093fb");
      this.ctx.fillStyle = gradient;
    }

    // Set font properties matching StaticVersionModal
    const fontSize = size * 0.6; // Scale font size to canvas size
    this.ctx.font = `900 ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    // Add glow effect for default variant
    if (variant === "default" || variant === "static") {
      this.ctx.shadowColor = "#4facfe";
      this.ctx.shadowBlur = 10;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
    }

    // Draw the ∞ symbol
    this.ctx.fillText("∞", centerX, centerY);

    // Reset shadow
    this.ctx.shadowColor = "transparent";
    this.ctx.shadowBlur = 0;
  }

  private async renderLogo(variant: string, size: number): Promise<void> {
    const centerX = size / 2;
    const centerY = size / 2;
    const logoSize = size * 0.6;

    const colors = this.getColors(variant);

    // Draw the infinity symbol
    this.drawInfinitySymbol(
      centerX,
      centerY - logoSize * 0.1,
      logoSize * 0.3,
      colors.primary
    );

    // Draw the "MATTIX" text
    this.drawMattixText(
      centerX,
      centerY + logoSize * 0.25,
      logoSize * 0.15,
      colors.text
    );
  }

  private drawInfinitySymbol(
    x: number,
    y: number,
    size: number,
    color: string
  ): void {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = size * 0.1;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    // Draw infinity symbol using bezier curves
    this.ctx.beginPath();

    // Left loop
    this.ctx.moveTo(x - size, y);
    this.ctx.bezierCurveTo(
      x - size,
      y - size * 0.8,
      x - size * 0.2,
      y - size * 0.8,
      x - size * 0.2,
      y
    );
    this.ctx.bezierCurveTo(
      x - size * 0.2,
      y + size * 0.8,
      x - size,
      y + size * 0.8,
      x - size,
      y
    );

    // Right loop
    this.ctx.moveTo(x + size, y);
    this.ctx.bezierCurveTo(
      x + size,
      y - size * 0.8,
      x + size * 0.2,
      y - size * 0.8,
      x + size * 0.2,
      y
    );
    this.ctx.bezierCurveTo(
      x + size * 0.2,
      y + size * 0.8,
      x + size,
      y + size * 0.8,
      x + size,
      y
    );

    this.ctx.stroke();
  }

  private drawMattixText(
    x: number,
    y: number,
    fontSize: number,
    color: string
  ): void {
    this.ctx.fillStyle = color;
    this.ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillText("MATTIX", x, y);
  }

  private exportCanvas(
    format: string,
    size: number,
    variant: string,
    logoType: string = "full"
  ): ExportResult {
    const timestamp = Date.now();
    const filename = `mattix-logo-${logoType}-${variant}-${size}x${size}-${timestamp}.${format}`;

    let mimeType: string;
    switch (format) {
      case "png":
        mimeType = "image/png";
        break;
      case "jpg":
      case "jpeg":
        mimeType = "image/jpeg";
        break;
      case "webp":
        mimeType = "image/webp";
        break;
      default:
        mimeType = "image/png";
    }

    const dataURL = this.canvas.toDataURL(mimeType, 0.95);

    return {
      url: dataURL,
      filename,
      format,
      size,
    };
  }

  async downloadLogo(options: LogoExportOptions): Promise<void> {
    const result = await this.exportLogo(options);

    // Track download for analytics
    trackLogoDownload(options.format, options.size, options.variant);

    // Create download link
    const link = document.createElement("a");
    link.href = result.url;
    link.download = result.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up object URL for SVG
    if (options.format === "svg") {
      URL.revokeObjectURL(result.url);
    }
  }

  async exportMultipleSizes(
    sizes: number[],
    baseOptions: Omit<LogoExportOptions, "size">
  ): Promise<ExportResult[]> {
    const results: ExportResult[] = [];

    for (const size of sizes) {
      const result = await this.exportLogo({ ...baseOptions, size });
      results.push(result);
    }

    return results;
  }

  async downloadMultipleSizes(
    sizes: number[],
    baseOptions: Omit<LogoExportOptions, "size">,
    delay: number = 200
  ): Promise<void> {
    for (let i = 0; i < sizes.length; i++) {
      await this.downloadLogo({ ...baseOptions, size: sizes[i] });

      // Add delay between downloads to prevent browser blocking
      if (i < sizes.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  private async exportCustomImage(
    options: LogoExportOptions
  ): Promise<ExportResult> {
    const { size, format, backgroundColor, customImage } = options;

    if (!customImage) {
      throw new Error("Custom image URL is required");
    }

    // Create a filename for the custom image
    const timestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[-:]/g, "");
    const filename = `custom-logo-${size}x${size}-${timestamp}.${format}`;

    if (format === "svg") {
      // For SVG, embed the image as a data URL
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
          // Convert image to data URL if it's not already
          let imageDataUrl = customImage;
          if (!customImage.startsWith("data:")) {
            const tempCanvas = document.createElement("canvas");
            const tempCtx = tempCanvas.getContext("2d")!;
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            tempCtx.drawImage(img, 0, 0);
            imageDataUrl = tempCanvas.toDataURL("image/png");
          }

          const bgColor =
            backgroundColor === "transparent" ? "none" : backgroundColor;
          const svgContent = `
            <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
              ${
                bgColor !== "none"
                  ? `<rect width="100%" height="100%" fill="${bgColor}"/>`
                  : ""
              }
              <image href="${imageDataUrl}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/>
            </svg>
          `.trim();

          const blob = new Blob([svgContent], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);

          resolve({
            url,
            filename,
            format,
            size,
          });
        };

        img.onerror = () => reject(new Error("Failed to load custom image"));
        img.src = customImage;
      });
    } else {
      // For raster formats, draw on canvas
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
          this.canvas.width = size;
          this.canvas.height = size;

          // Clear and set background
          this.ctx.clearRect(0, 0, size, size);
          if (backgroundColor !== "transparent") {
            this.ctx.fillStyle = backgroundColor;
            this.ctx.fillRect(0, 0, size, size);
          }

          // Calculate dimensions to maintain aspect ratio
          const aspectRatio = img.width / img.height;
          let drawWidth = size;
          let drawHeight = size;
          let offsetX = 0;
          let offsetY = 0;

          if (aspectRatio > 1) {
            // Image is wider than tall
            drawHeight = size / aspectRatio;
            offsetY = (size - drawHeight) / 2;
          } else if (aspectRatio < 1) {
            // Image is taller than wide
            drawWidth = size * aspectRatio;
            offsetX = (size - drawWidth) / 2;
          }

          // Draw the image centered
          this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

          // Convert to appropriate format
          let mimeType = "image/png";
          switch (format) {
            case "jpg":
            case "jpeg":
              mimeType = "image/jpeg";
              break;
            case "webp":
              mimeType = "image/webp";
              break;
          }

          const dataURL = this.canvas.toDataURL(mimeType, 0.95);

          resolve({
            url: dataURL,
            filename,
            format,
            size,
          });
        };

        img.onerror = () => reject(new Error("Failed to load custom image"));
        img.src = customImage;
      });
    }
  }

  dispose(): void {
    this.canvas.width = 0;
    this.canvas.height = 0;
  }
}

// Utility functions for batch downloads
export const downloadAppIcons = async (
  backgroundColor: string = "transparent",
  variant: string = "default",
  logoType: string = "symbol", // Default to symbol for app icons
  textVariant: string = "MATTIX",
  customImage?: string
): Promise<void> => {
  const exporter = new LogoExporter();
  const appSizes = [1024, 512, 180, 152, 120, 76, 60, 48, 72, 96, 144, 192];

  await exporter.downloadMultipleSizes(appSizes, {
    format: "png",
    backgroundColor,
    variant: variant as any,
    logoType: logoType as any,
    textVariant: textVariant as any,
    customImage,
  });

  exporter.dispose();
};

export const downloadWebIcons = async (
  backgroundColor: string = "transparent",
  variant: string = "default",
  logoType: string = "full",
  textVariant: string = "MATTIX",
  customImage?: string
): Promise<void> => {
  const exporter = new LogoExporter();
  const webSizes = [32, 64, 128, 256, 512, 1024];

  await exporter.downloadMultipleSizes(webSizes, {
    format: "png",
    backgroundColor,
    variant: variant as any,
    logoType: logoType as any,
    textVariant: textVariant as any,
    customImage,
  });

  exporter.dispose();
};

export const downloadBrandPackage = async (
  backgroundColor: string = "transparent",
  logoType: string = "full",
  textVariant: string = "MATTIX",
  customImage?: string
): Promise<void> => {
  const exporter = new LogoExporter();

  // Download all variants in key sizes
  const variants = ["default", "static", "mono", "inverse"];
  const keySizes = [64, 256, 512, 1024];

  for (const variant of variants) {
    await exporter.downloadMultipleSizes(
      keySizes,
      {
        format: "png",
        backgroundColor,
        variant: variant as any,
        logoType: logoType as any,
        textVariant: textVariant as any,
        customImage,
      },
      300
    ); // Longer delay for batch download
  }

  exporter.dispose();
};
