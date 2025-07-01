/// <reference types="vitest/globals" />

import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
(globalThis as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
(globalThis as any).ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock URL for file downloads
Object.assign(globalThis, {
  URL: {
    createObjectURL: () => "mocked-url",
    revokeObjectURL: () => {},
  },
  Blob: class MockBlob {
    constructor(_content: any[], _options?: any) {
      return {} as any;
    }
  },
});
