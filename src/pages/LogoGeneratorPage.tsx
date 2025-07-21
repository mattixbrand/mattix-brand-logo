import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "../components/SEOHead";
import { ExportableLogo } from "../components/ExportableLogo";
import {
  LogoExporter,
  downloadAppIcons,
  downloadWebIcons,
  downloadBrandPackage,
} from "../utils/logoExporter";
import { trackGeneratorUsage } from "../utils/gtm";
import {
  RiDownloadLine,
  RiSmartphoneLine,
  RiComputerLine,
  RiImageLine,
  RiPaletteLine,
  RiSaveLine,
  RiRefreshLine,
  RiHome3Line,
  RiUploadLine,
  RiDeleteBinLine,
  RiFileImageLine,
} from "@remixicon/react";

const LogoGeneratorPage: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<string>("png");
  const [selectedSize, setSelectedSize] = useState<string>("1024");
  const [backgroundColor, setBackgroundColor] = useState<string>("transparent");
  const [logoVariant, setLogoVariant] = useState<string>("default");
  const [logoType, setLogoType] = useState<string>("symbol");
  const [textVariant, setTextVariant] = useState<string>("MATTIX");

  // File upload states
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [useUploadedImage, setUseUploadedImage] = useState(false);

  const logoRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formats = [
    { id: "png", name: "PNG", description: "Best for web and digital use" },
    { id: "svg", name: "SVG", description: "Scalable vector format" },
    { id: "ico", name: "ICO", description: "Windows icon format" },
    { id: "pdf", name: "PDF", description: "Print-ready format" },
    { id: "jpg", name: "JPG", description: "Compressed image format" },
    { id: "webp", name: "WebP", description: "Modern web format" },
  ];

  const appIconSizes = [
    { size: "1024", name: "App Store", platform: "iOS/Android" },
    { size: "512", name: "Play Store", platform: "Android" },
    { size: "180", name: "iPhone", platform: "iOS" },
    { size: "152", name: "iPad", platform: "iOS" },
    { size: "120", name: "iPhone (2x)", platform: "iOS" },
    { size: "76", name: "iPad (1x)", platform: "iOS" },
    { size: "60", name: "iPhone (1x)", platform: "iOS" },
    { size: "48", name: "Android MDPI", platform: "Android" },
    { size: "72", name: "Android HDPI", platform: "Android" },
    { size: "96", name: "Android XHDPI", platform: "Android" },
    { size: "144", name: "Android XXHDPI", platform: "Android" },
    { size: "192", name: "Android XXXHDPI", platform: "Android" },
  ];

  const webSizes = [
    { size: "32", name: "Favicon", usage: "Browser tab" },
    { size: "64", name: "Small Icon", usage: "UI elements" },
    { size: "128", name: "Medium Icon", usage: "Cards, lists" },
    { size: "256", name: "Large Icon", usage: "Hero sections" },
    { size: "512", name: "HD Icon", usage: "High-res displays" },
    { size: "1024", name: "Ultra HD", usage: "Marketing materials" },
  ];

  const logoVariants = [
    { id: "default", name: "Default", description: "Full animated logo" },
    { id: "static", name: "Static", description: "Non-animated version" },
    { id: "mono", name: "Monochrome", description: "Single color version" },
    { id: "inverse", name: "Inverse", description: "For dark backgrounds" },
  ];

  const logoTypes = [
    { id: "full", name: "Full Logo", description: "Symbol + text combination" },
    {
      id: "symbol",
      name: "Symbol Only",
      description: "Simple infinity symbol for app icons",
    },
    { id: "text", name: "Text Only", description: "Brand text without symbol" },
  ];

  const textVariants = [
    { id: "MATTIX", name: "MATTIX", description: "Standard brand name" },
    { id: "∞ATTIX", name: "∞ATTIX", description: "Infinity symbol variation" },
  ];

  const backgroundOptions = [
    { id: "transparent", name: "Transparent", color: "transparent" },
    { id: "white", name: "White", color: "#ffffff" },
    { id: "black", name: "Black", color: "#000000" },
    { id: "primary", name: "Primary Blue", color: "#007acc" },
    { id: "dark", name: "Dark Theme", color: "#1a1a1a" },
  ];

  const generateLogo = async (size: string, format: string) => {
    const exporter = new LogoExporter();

    try {
      await exporter.downloadLogo({
        size: parseInt(size),
        format: format as any,
        backgroundColor,
        variant: logoVariant as any,
        logoType: logoType as any,
        textVariant: textVariant as any,
        customImage: useUploadedImage ? uploadedFileUrl : undefined,
      });
    } catch (error) {
      console.error("Error generating logo:", error);
    } finally {
      exporter.dispose();
    }
  };

  const downloadAll = async (category: "app" | "web") => {
    try {
      const customImageUrl = useUploadedImage ? uploadedFileUrl : undefined;
      
      // Track generator usage
      trackGeneratorUsage('batch_download', {
        download_type: category,
        logo_variant: logoVariant,
        logo_type: logoType,
        background_color: backgroundColor,
        has_custom_image: !!customImageUrl
      });

      if (category === "app") {
        await downloadAppIcons(
          backgroundColor,
          logoVariant,
          logoType,
          textVariant,
          customImageUrl
        );
      } else {
        await downloadWebIcons(
          backgroundColor,
          logoVariant,
          logoType,
          textVariant,
          customImageUrl
        );
      }
    } catch (error) {
      console.error("Error downloading logos:", error);
    }
  };

  const downloadCompletePackage = async () => {
    try {
      const customImageUrl = useUploadedImage ? uploadedFileUrl : undefined;
      
      // Track complete package download
      trackGeneratorUsage('complete_package_download', {
        logo_type: logoType,
        text_variant: textVariant,
        background_color: backgroundColor,
        has_custom_image: !!customImageUrl
      });

      await downloadBrandPackage(
        backgroundColor,
        logoType,
        textVariant,
        customImageUrl
      );
    } catch (error) {
      console.error("Error downloading brand package:", error);
    }
  };

  // File upload handlers
  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setUploadedFileUrl(url);
      setUseUploadedImage(true);
    }
  }, []);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeUploadedFile = () => {
    if (uploadedFileUrl) {
      URL.revokeObjectURL(uploadedFileUrl);
    }
    setUploadedFile(null);
    setUploadedFileUrl("");
    setUseUploadedImage(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <SEOHead pageKey="generator" />
      <div className="logo-generator-page">
      {/* Header */}
      <header className="generator-header">
        <div className="header-content">
          <Link to="/" className="back-link">
            <RiHome3Line size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="page-title">Logo Generator</h1>
          <p className="page-subtitle">
            Generate MATTIX logos in all formats and sizes for your projects
          </p>
        </div>
      </header>

      <div className="generator-container">
        {/* Live Preview */}
        <section className="preview-section">
          <div className="preview-header">
            <h2>
              <RiImageLine size={24} />
              Live Preview
            </h2>
            <div className="preview-controls">
              <button className="control-btn">
                <RiRefreshLine size={16} />
                Refresh
              </button>
            </div>
          </div>

          <div className="preview-container" style={{ backgroundColor }}>
            <div ref={logoRef} className="logo-preview">
              {useUploadedImage && uploadedFileUrl ? (
                <img
                  src={uploadedFileUrl}
                  alt="Uploaded logo preview"
                  style={{
                    maxWidth: Math.min(parseInt(selectedSize), 300),
                    maxHeight: Math.min(parseInt(selectedSize), 300),
                    objectFit: "contain",
                  }}
                />
              ) : (
                <ExportableLogo
                  size={Math.min(parseInt(selectedSize), 300)}
                  variant={logoVariant as any}
                  backgroundColor="transparent"
                  logoType={logoType as any}
                  textVariant={textVariant as any}
                />
              )}
            </div>
            <div className="preview-info">
              <span>
                {selectedSize}×{selectedSize}px
              </span>
              <span>{selectedFormat.toUpperCase()}</span>
              <span>{useUploadedImage ? "Custom Image" : logoVariant}</span>
              <span>{useUploadedImage ? "Uploaded" : logoType}</span>
              <span>
                {useUploadedImage
                  ? uploadedFile?.name || "Custom"
                  : textVariant}
              </span>
            </div>
          </div>
        </section>

        {/* Configuration Panel */}
        <section className="config-section">
          <h2>
            <RiPaletteLine size={24} />
            Configuration
          </h2>

          {/* File Upload */}
          <div className="config-group">
            <h3>Upload Your Logo</h3>
            <p className="upload-description">
              Upload your own image file to use as a logo, or use the default
              MATTIX infinity symbol
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/*"
              style={{ display: "none" }}
            />

            {!useUploadedImage ? (
              <div
                className={`upload-area ${isDragOver ? "drag-over" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <RiUploadLine size={48} />
                <h4>Upload Logo File</h4>
                <p>Drag and drop an image file here, or click to browse</p>
                <p className="upload-formats">Supports: PNG, JPG, SVG, WebP</p>
              </div>
            ) : (
              <div className="uploaded-file-preview">
                <div className="file-preview">
                  <img
                    src={uploadedFileUrl}
                    alt="Uploaded logo"
                    className="preview-image"
                  />
                  <div className="file-info">
                    <div className="file-name">
                      <RiFileImageLine size={16} />
                      {uploadedFile?.name}
                    </div>
                    <div className="file-size">
                      {uploadedFile ? (uploadedFile.size / 1024).toFixed(1) : 0}{" "}
                      KB
                    </div>
                  </div>
                </div>
                <div className="file-actions">
                  <button
                    className="action-btn secondary"
                    onClick={triggerFileInput}
                  >
                    <RiUploadLine size={16} />
                    Replace File
                  </button>
                  <button
                    className="action-btn danger"
                    onClick={removeUploadedFile}
                  >
                    <RiDeleteBinLine size={16} />
                    Remove
                  </button>
                </div>
              </div>
            )}

            <div className="logo-source-toggle">
              <label className="toggle-option">
                <input
                  type="radio"
                  name="logoSource"
                  checked={!useUploadedImage}
                  onChange={() => setUseUploadedImage(false)}
                />
                <span>Use MATTIX Symbol</span>
              </label>
              <label className="toggle-option">
                <input
                  type="radio"
                  name="logoSource"
                  checked={useUploadedImage}
                  onChange={() => setUseUploadedImage(true)}
                  disabled={!uploadedFile}
                />
                <span>Use Uploaded Image</span>
              </label>
            </div>
          </div>

          {/* Logo Variant */}
          <div className="config-group">
            <h3>Logo Variant</h3>
            <div className="variant-grid">
              {logoVariants.map((variant) => (
                <button
                  key={variant.id}
                  className={`variant-card ${
                    logoVariant === variant.id ? "active" : ""
                  }`}
                  onClick={() => setLogoVariant(variant.id)}
                >
                  <div className="variant-name">{variant.name}</div>
                  <div className="variant-desc">{variant.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Logo Type */}
          <div className="config-group">
            <h3>Logo Type</h3>
            <div className="variant-grid">
              {logoTypes.map((type) => (
                <button
                  key={type.id}
                  className={`variant-card ${
                    logoType === type.id ? "active" : ""
                  }`}
                  onClick={() => setLogoType(type.id)}
                >
                  <div className="variant-name">{type.name}</div>
                  <div className="variant-desc">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Text Variant */}
          {(logoType === "full" || logoType === "text") && (
            <div className="config-group">
              <h3>Text Variant</h3>
              <div className="variant-grid">
                {textVariants.map((text) => (
                  <button
                    key={text.id}
                    className={`variant-card ${
                      textVariant === text.id ? "active" : ""
                    }`}
                    onClick={() => setTextVariant(text.id)}
                  >
                    <div className="variant-name">{text.name}</div>
                    <div className="variant-desc">{text.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Background Color */}
          <div className="config-group">
            <h3>Background</h3>
            <div className="background-grid">
              {backgroundOptions.map((bg) => (
                <button
                  key={bg.id}
                  className={`bg-option ${
                    backgroundColor === bg.color ? "active" : ""
                  }`}
                  onClick={() => setBackgroundColor(bg.color)}
                >
                  <div
                    className="bg-preview"
                    style={{ backgroundColor: bg.color }}
                  />
                  <span>{bg.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div className="config-group">
            <h3>Output Format</h3>
            <div className="format-grid">
              {formats.map((format) => (
                <button
                  key={format.id}
                  className={`format-card ${
                    selectedFormat === format.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedFormat(format.id)}
                >
                  <div className="format-name">{format.name}</div>
                  <div className="format-desc">{format.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="config-group">
            <h3>Preview Size</h3>
            <div className="size-selector">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="size-select"
              >
                <option value="64">64×64px (Small)</option>
                <option value="128">128×128px (Medium)</option>
                <option value="256">256×256px (Large)</option>
                <option value="512">512×512px (XL)</option>
                <option value="1024">1024×1024px (XXL)</option>
              </select>
              <button
                className="download-current-btn"
                onClick={() => generateLogo(selectedSize, selectedFormat)}
              >
                <RiDownloadLine size={16} />
                Download Current
              </button>
            </div>
          </div>
        </section>

        {/* Quick Actions for Symbol Only */}
        {logoType === "symbol" && (
          <section className="quick-actions-section">
            <div className="quick-actions-header">
              <h2>
                <RiSmartphoneLine size={24} />
                App Icon Quick Download
              </h2>
              <p>Get essential app icon sizes instantly</p>
            </div>

            <div className="quick-actions-grid">
              <div className="quick-action-card">
                <div className="quick-preview">
                  <ExportableLogo
                    size={64}
                    variant={logoVariant as any}
                    backgroundColor="transparent"
                    logoType="symbol"
                  />
                </div>
                <div className="quick-info">
                  <h3>iOS App Store</h3>
                  <p>1024×1024px - Required for App Store submission</p>
                </div>
                <button
                  className="quick-download-btn"
                  onClick={() => generateLogo("1024", "png")}
                >
                  <RiDownloadLine size={16} />
                  Download
                </button>
              </div>

              <div className="quick-action-card">
                <div className="quick-preview">
                  <ExportableLogo
                    size={64}
                    variant={logoVariant as any}
                    backgroundColor="transparent"
                    logoType="symbol"
                  />
                </div>
                <div className="quick-info">
                  <h3>Android Play Store</h3>
                  <p>512×512px - Required for Play Store submission</p>
                </div>
                <button
                  className="quick-download-btn"
                  onClick={() => generateLogo("512", "png")}
                >
                  <RiDownloadLine size={16} />
                  Download
                </button>
              </div>

              <div className="quick-action-card">
                <div className="quick-preview">
                  <ExportableLogo
                    size={64}
                    variant={logoVariant as any}
                    backgroundColor="transparent"
                    logoType="symbol"
                  />
                </div>
                <div className="quick-info">
                  <h3>All App Sizes</h3>
                  <p>Complete bundle for iOS & Android development</p>
                </div>
                <button
                  className="quick-download-btn primary"
                  onClick={() => downloadAll("app")}
                >
                  <RiDownloadLine size={16} />
                  Download All
                </button>
              </div>
            </div>
          </section>
        )}

        {/* App Icons */}
        <section className="sizes-section">
          <div className="section-header">
            <h2>
              <RiSmartphoneLine size={24} />
              App Icons
              {logoType === "symbol" && (
                <span className="recommended-badge">Recommended for Apps</span>
              )}
            </h2>
            <button
              className="download-all-btn"
              onClick={() => downloadAll("app")}
            >
              <RiDownloadLine size={16} />
              Download All App Icons
              {logoType === "symbol" && " (Symbol Only)"}
            </button>
          </div>

          {logoType === "symbol" && (
            <div className="symbol-info">
              <p>
                <strong>Symbol Only</strong> is perfect for app icons! The clean
                infinity symbol works great at small sizes and maintains clarity
                across all devices.
              </p>
            </div>
          )}

          <div className="sizes-grid">
            {appIconSizes.map((item) => (
              <div key={item.size} className="size-card">
                <div className="size-preview">
                  <ExportableLogo
                    size={Math.min(parseInt(item.size) / 4, 64)}
                    variant={logoVariant as any}
                    backgroundColor="transparent"
                    logoType={logoType as any}
                    textVariant={textVariant as any}
                    className="mini-logo-svg"
                  />
                </div>
                <div className="size-info">
                  <div className="size-name">{item.name}</div>
                  <div className="size-platform">{item.platform}</div>
                  <div className="size-dimensions">
                    {item.size}×{item.size}px
                  </div>
                </div>
                <button
                  className="download-btn"
                  onClick={() => generateLogo(item.size, selectedFormat)}
                >
                  <RiDownloadLine size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Web Icons */}
        <section className="sizes-section">
          <div className="section-header">
            <h2>
              <RiComputerLine size={24} />
              Web Icons
              {logoType === "full" && (
                <span className="recommended-badge">Full Logo Recommended</span>
              )}
            </h2>
            <button
              className="download-all-btn"
              onClick={() => downloadAll("web")}
            >
              <RiDownloadLine size={16} />
              Download All Web Icons
              {logoType === "symbol" && " (Symbol Only)"}
              {logoType === "text" && " (Text Only)"}
            </button>
          </div>

          {logoType === "text" && (
            <div className="symbol-info">
              <p>
                <strong>Text Only</strong> is great for headers, footers, and
                branding elements where you want to emphasize the MATTIX name.
              </p>
            </div>
          )}

          <div className="sizes-grid">
            {webSizes.map((item) => (
              <div key={item.size} className="size-card">
                <div className="size-preview">
                  <ExportableLogo
                    size={Math.min(parseInt(item.size) / 2, 64)}
                    variant={logoVariant as any}
                    backgroundColor="transparent"
                    logoType={logoType as any}
                    textVariant={textVariant as any}
                    className="mini-logo-svg"
                  />
                </div>
                <div className="size-info">
                  <div className="size-name">{item.name}</div>
                  <div className="size-usage">{item.usage}</div>
                  <div className="size-dimensions">
                    {item.size}×{item.size}px
                  </div>
                </div>
                <button
                  className="download-btn"
                  onClick={() => generateLogo(item.size, selectedFormat)}
                >
                  <RiDownloadLine size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Package */}
        <section className="brand-section">
          <div className="section-header">
            <h2>
              <RiSaveLine size={24} />
              Brand Package
            </h2>
            <p>Download complete brand assets in one package</p>
          </div>

          <div className="brand-packages">
            <div className="package-card">
              <h3>Complete Package</h3>
              <p>All logo variants, sizes, and formats</p>
              <ul>
                <li>All app icon sizes (iOS & Android)</li>
                <li>All web icon sizes</li>
                <li>PNG, SVG, ICO formats</li>
                <li>Multiple color variants</li>
                <li>Usage guidelines</li>
              </ul>
              <button
                className="package-download-btn"
                onClick={downloadCompletePackage}
              >
                <RiDownloadLine size={16} />
                Download Complete Package
              </button>
            </div>

            <div className="package-card">
              <h3>Developer Package</h3>
              <p>Essential formats for development</p>
              <ul>
                <li>Key app icon sizes</li>
                <li>Favicon sizes (16, 32, 64px)</li>
                <li>PNG and SVG formats</li>
                <li>Transparent backgrounds</li>
              </ul>
              <button
                className="package-download-btn"
                onClick={() => downloadAll("web")}
              >
                <RiDownloadLine size={16} />
                Download Developer Package
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default LogoGeneratorPage;
