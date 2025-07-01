/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

declare global {
  interface Window {
    JSZip: any;
    showStaticVersion: () => void;
    hideStaticVersion: () => void;
    copyLoadingCode: () => Promise<void>;
    downloadLoadingComponent: () => void;
    downloadSVG: () => void;
  }
}

export {};
