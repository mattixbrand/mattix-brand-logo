import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// Cleanup after each test case
afterEach(() => {
  // Use a try-catch to handle cleanup errors gracefully
  try {
    cleanup();
  } catch (error) {
    // Ignore React cleanup warnings in tests
    if (
      !(error instanceof Error) ||
      !error.message?.includes("Should not already be working")
    ) {
      throw error;
    }
  }
});

// Mock window.navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

// Mock IntersectionObserver
(globalThis as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock window.URL methods
global.URL.createObjectURL = vi.fn().mockReturnValue("mock-object-url");
global.URL.revokeObjectURL = vi.fn();

// Mock ResizeObserver
(globalThis as any).ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock URL.createObjectURL for file downloads
Object.assign(globalThis, {
  URL: {
    createObjectURL: () => "mocked-url",
    revokeObjectURL: () => {},
  },
});
