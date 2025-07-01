# MATTIX Brand Logo System

A modern, animated brand identity system built with React, TypeScript, and cutting-edge web technologies. Features dynamic logo animations, comprehensive color systems, and professional logo generation tools.

## 🌟 Features

### ✨ **Animated Brand Identity**

- Dynamic infinity symbol that morphs into the MATTIX "M" shape
- Smooth 60fps CSS3 animations with enhanced white light blur effects
- Multiple logo variants: default, static, monochrome, and inverse
- **NEW**: Logo type options: full logo, symbol only, or text only
- **NEW**: Text variants: "MATTIX" or "∞ATTIX" for creative flexibility

### 📱 **Symbol Only Mode - Perfect for App Icons** ⭐

- **Optimized infinity symbol** designed specifically for app icons and favicons
- **Smart defaults**: App icon downloads automatically use symbol-only format
- **Quick Actions**: Instant downloads for iOS App Store (1024px) and Android Play Store (512px)
- **Clean at any size**: Optimized SVG paths ensure clarity from 16px to 1024px
- **Professional quality**: Meets all app store requirements and guidelines

### 🎨 **Comprehensive Design System**

- Carefully crafted color palette based on blues and cyans
- Framework integration configs (Tailwind CSS, Shadcn UI, Hero UI, Aceternity UI)
- Professional gradients and semantic color schemes

### 🛠️ **Logo Generation Suite**

- Export logos in multiple formats: PNG, SVG, ICO, PDF (coming soon)
- Generate app icons for iOS and Android in all required sizes
- **NEW**: Simple infinity symbol optimized for app icons and favicons
- **NEW**: Text-only exports for branding applications
- Batch download capabilities with customizable variants
- Real-time preview with dynamic configuration

### 📱 **Multi-Page Application**

- **Home Page**: Modern landing page with feature showcase
- **Logo Studio**: Interactive logo customization and animation controls
- **Color System**: Complete brand color documentation with code examples
- **Logo Generator**: Professional asset generation tool
- **Documentation**: Comprehensive usage guide and integration examples

### 🚀 **Modern Tech Stack**

- React 18 with TypeScript
- Vite for blazing-fast development
- Remix Icons for consistent iconography
- Responsive design with glassmorphism effects
- Hot module replacement for instant updates

## 🎯 Live Demo

Visit the live application: `http://localhost:5174`

### Available Routes:

- `/` - Home page with feature overview
- `/logo` - Interactive logo studio
- `/colors` - Color system documentation
- `/generator` - Logo generation tool
- `/docs` - Complete documentation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/mattix-brand-logo.git

# Navigate to project directory
cd mattix-brand-logo

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The application will be available at `http://localhost:5174`

### Build for Production

```bash
# Create production build
pnpm run build

# Preview production build
pnpm run preview
```

## 🔧 Usage

### Basic Logo Component

```tsx
import MattixLogo from "./components/MattixLogo";

function App() {
  return (
    <div>
      <MattixLogo size={200} animated={true} />
    </div>
  );
}
```

### Exportable Logo for Different Variants

```tsx
import { ExportableLogo } from "./components/ExportableLogo";

function App() {
  return (
    <div>
      <ExportableLogo size={256} variant="mono" backgroundColor="white" />
    </div>
  );
}
```

### Programmatic Logo Export

```tsx
import { LogoExporter } from "./utils/logoExporter";

const exportLogo = async () => {
  const exporter = new LogoExporter();

  await exporter.downloadLogo({
    size: 512,
    format: "png",
    backgroundColor: "transparent",
    variant: "default",
  });

  exporter.dispose();
};
```

## 🎨 Brand Guidelines

### Logo Variants

- **Default**: Full animated version with gradients and glow effects
- **Static**: Non-animated version for print and static media
- **Monochrome**: Single color version for monochrome applications
- **Inverse**: Light version for dark backgrounds

### Color Palette

```css
/* MATTIX Primary Colors */
--mattix-blue: #4facfe;
--mattix-cyan: #00f2fe;
--mattix-purple: #667eea;
--mattix-deep: #764ba2;

/* Enhanced MATTIX Brand Gradients */
--mattix-gradient: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
--mattix-spectrum: linear-gradient(
  45deg,
  #4facfe 0%,
  #00f2fe 25%,
  #667eea 50%,
  #764ba2 75%,
  #f093fb 100%
);
--mattix-infinity: radial-gradient(
  ellipse at center,
  #4facfe 0%,
  #00f2fe 30%,
  #667eea 60%,
  #764ba2 100%
);
--mattix-pulse: linear-gradient(
  135deg,
  #764ba2 0%,
  #667eea 25%,
  #4facfe 50%,
  #00f2fe 75%,
  #4facfe 100%
);
--mattix-flow: linear-gradient(
  90deg,
  #4facfe 0%,
  #00f2fe 20%,
  #667eea 40%,
  #764ba2 60%,
  #667eea 80%,
  #00f2fe 100%
);
--mattix-aurora: conic-gradient(
  from 0deg at 50% 50%,
  #4facfe 0%,
  #00f2fe 25%,
  #667eea 50%,
  #764ba2 75%,
  #4facfe 100%
);
--mattix-wave: linear-gradient(
  45deg,
  transparent 0%,
  #4facfe 25%,
  #00f2fe 45%,
  transparent 50%,
  transparent 55%,
  #667eea 75%,
  #764ba2 95%,
  transparent 100%
);
--mattix-glow: radial-gradient(
  circle at 30% 70%,
  rgba(79, 172, 254, 0.8) 0%,
  rgba(0, 242, 254, 0.6) 25%,
  rgba(102, 126, 234, 0.4) 50%,
  rgba(118, 75, 162, 0.2) 75%,
  transparent 100%
);

/* Semantic Colors */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Logo Specifications

#### App Icons (iOS/Android)

- 1024×1024px (App Store)
- 512×512px (Play Store)
- 180×180px (iPhone)
- 152×152px (iPad)
- Additional sizes: 120px, 76px, 60px, 48px, 72px, 96px, 144px, 192px

#### Web Icons

- 32×32px (Favicon)
- 64×64px (Small UI elements)
- 128×128px (Medium icons)
- 256×256px (Large displays)
- 512×512px (HD displays)
- 1024×1024px (Marketing materials)

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── MattixLogo.tsx  # Main animated logo component
│   ├── ExportableLogo.tsx # SVG-based logo for exports
│   └── FloatingNav.tsx # Navigation component
├── pages/              # Application pages
│   ├── HomePage.tsx    # Landing page
│   ├── LogoPage.tsx    # Logo studio
│   ├── ColorSystemPage.tsx # Color documentation
│   ├── LogoGeneratorPage.tsx # Logo generation tool
│   └── DocumentationPage.tsx # Usage documentation
├── contexts/           # React contexts
│   └── NavigationContext.tsx # Navigation state management
├── utils/              # Utility functions
│   └── logoExporter.ts # Logo export functionality
├── styles/             # CSS modules
│   ├── styles.css      # Global styles
│   ├── home.css        # Home page styles
│   ├── color-system.css # Color system styles
│   ├── logo-generator.css # Generator styles
│   └── documentation.css # Docs styles
└── types/              # TypeScript type definitions
```

## 🎯 Features Breakdown

### Enhanced Logo Animation

- ✅ White light blur effects matching vanilla HTML version
- ✅ Reduced glow intensity (30% reduction) for better visibility
- ✅ Smooth infinity-to-M morphing animation
- ✅ CSS3 optimized for 60fps performance

### Multi-Page Architecture

- ✅ React Router with clean URL structure
- ✅ Responsive design across all pages
- ✅ Consistent navigation with Remix Icons
- ✅ Glassmorphism design language

### Professional Logo Generation

- ✅ Canvas-based rendering for pixel-perfect exports
- ✅ SVG export support for scalable graphics
- ✅ Batch download with progress indication
- ✅ Multiple variants and background options

### Comprehensive Color System

- ✅ Complete brand palette documentation
- ✅ Framework integration snippets
- ✅ Interactive color swatches
- ✅ Usage guidelines and best practices

## 📖 Component API

### MattixLogo Component

The main animated logo component with morphing effects.

```tsx
import { MattixLogo } from "./components/MattixLogo";

<MattixLogo
  animated={true} // Enable/disable animations
  size={200} // Logo size in pixels
  className="my-logo" // Additional CSS classes
/>;
```

### ExportableLogo Component

SVG-based logo component optimized for exports and static use.

```tsx
import { ExportableLogo } from "./components/ExportableLogo";

<ExportableLogo
  size={256} // Logo size in pixels
  variant="default" // 'default' | 'static' | 'mono' | 'inverse'
  backgroundColor="transparent" // Background color or 'transparent'
  logoType="full" // 'full' | 'symbol' | 'text'
  textVariant="MATTIX" // 'MATTIX' | '∞ATTIX'
  className="exportable-logo" // Additional CSS classes
/>;
```

#### Logo Type Options:

- **`full`** - Complete logo with symbol and text (default)
- **`symbol`** - Simple infinity symbol only (perfect for app icons)
- **`text`** - Text only without symbol (for branding)

#### Text Variant Options:

- **`MATTIX`** - Standard brand name (default)
- **`∞ATTIX`** - Creative variation with infinity symbol

### SimpleInfinity Component

Minimal infinity symbol for basic use cases.

```tsx
import { SimpleInfinity } from "./components/SimpleInfinity";

<SimpleInfinity
  size={64} // Symbol size in pixels
  color="#007acc" // Stroke color
  strokeWidth={4} // Stroke width
  className="infinity" // Additional CSS classes
/>;
```

### LogoExporter Utility

Professional logo export functionality with multiple format support.

```tsx
import { LogoExporter } from "./utils/logoExporter";

const exporter = new LogoExporter();

// Export single logo
const result = await exporter.exportLogo({
  size: 1024,
  format: "png", // 'png' | 'svg' | 'ico' | 'pdf'
  backgroundColor: "transparent",
  variant: "default", // 'default' | 'static' | 'mono' | 'inverse'
  logoType: "symbol", // 'full' | 'symbol' | 'text'
  textVariant: "∞ATTIX", // 'MATTIX' | '∞ATTIX'
});

// Batch export for app icons
await downloadAppIcons("transparent", "default");

// Batch export for web assets
await downloadWebIcons("#ffffff", "inverse");
```

## 🔧 Framework Integration

### Next.js

```tsx
// pages/_app.tsx
import { MattixLogo } from "mattix-brand-logo";

export default function App() {
  return <MattixLogo size={200} animated={true} />;
}
```

### Vite + React

```tsx
// main.tsx
import { MattixLogo } from "mattix-brand-logo";
import "mattix-brand-logo/dist/styles.css";
```

### Tailwind CSS Integration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        "mattix-primary": "#007acc",
        "mattix-secondary": "#00d4ff",
        "mattix-accent": "#0066cc",
      },
    },
  },
};
```

## 📱 Responsive Design

The application is fully responsive and tested on:

- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Design Tokens

### Spacing Scale

- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

### Typography Scale

- xs: 0.75rem
- sm: 0.875rem
- base: 1rem
- lg: 1.125rem
- xl: 1.25rem
- 2xl: 1.5rem
- 3xl: 1.875rem
- 4xl: 2.25rem

## 🚀 Performance Optimizations

- Lazy loading for large components
- SVG optimization for crisp rendering
- CSS animations using GPU acceleration
- Efficient React rendering with proper memoization
- Vite's optimized build process

## 🧪 Testing

```bash
# Run tests
pnpm run test

# Run tests with coverage
pnpm run test:coverage

# Run tests in watch mode
pnpm run test:watch
```

## 📦 Build & Deployment

### Production Build

```bash
pnpm run build
```

### Static Deployment

The build outputs static files that can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

### Docker Support

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install && pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- Remix Icon team for beautiful icons
- The open-source community for inspiration and tools

## 📞 Support

For support, email support@mattixs.com or create an issue in the GitHub repository.

---

**Built with ❤️ by the MATTIX team**
