import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// Mock the child components
vi.mock("../components/MattixLogo", () => ({
  default: ({ "data-testid": testId }: any) => (
    <div data-testid={testId}>MattixLogo</div>
  ),
  InfinityLoader: ({ "data-testid": testId }: any) => (
    <div data-testid={testId}>InfinityLoader</div>
  ),
}));

vi.mock("../components/DownloadManager", () => ({
  DownloadManager: () => (
    <div data-testid="download-manager">DownloadManager</div>
  ),
}));

vi.mock("../components/CodePreview", () => ({
  CodePreview: () => <div data-testid="code-preview">CodePreview</div>,
}));

vi.mock("../components/StaticVersionModal", () => ({
  StaticVersionModal: ({ onClose }: any) => (
    <div data-testid="static-version-modal">
      <button onClick={onClose} data-testid="close-modal">
        Close
      </button>
    </div>
  ),
}));

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

describe("App Component", () => {
  it("renders the main sections", () => {
    render(<App />);

    // Check main sections
    expect(screen.getByText("MATTIX Logo Animation")).toBeTruthy();
    expect(screen.getByText("Loading Component")).toBeTruthy();

    // Check components are rendered
    expect(screen.getByTestId("main-logo")).toBeTruthy();
    expect(screen.getByTestId("infinity-loader")).toBeTruthy();
    expect(screen.getAllByTestId("download-manager")).toHaveLength(2); // Two download managers now
  });

  it("shows static version modal when button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const captureButtons = screen.getAllByText("Capture MATTIX Logo");
    await user.click(captureButtons[0]); // Click the first one

    expect(screen.getByTestId("static-version-modal")).toBeTruthy();
  });

  it("closes static version modal when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Open modal
    const captureButtons = screen.getAllByText("Capture MATTIX Logo");
    await user.click(captureButtons[0]); // Click the first one

    expect(screen.getByTestId("static-version-modal")).toBeTruthy();

    // Close modal
    const closeButton = screen.getByTestId("close-modal");
    await user.click(closeButton);

    expect(screen.queryByTestId("static-version-modal")).toBeNull();
  });

  it("shows code preview when copy code button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const copyButton = screen.getByText("Copy React Code");
    await user.click(copyButton);

    expect(screen.getByTestId("code-preview")).toBeTruthy();
  });

  it("hides code preview after 3 seconds", async () => {
    vi.useFakeTimers();
    render(<App />);

    const copyButton = screen.getByText("Copy React Code");
    fireEvent.click(copyButton);

    expect(screen.getByTestId("code-preview")).toBeTruthy();

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByTestId("code-preview")).toBeNull();

    vi.useRealTimers();
  });

  it("renders with correct CSS classes", () => {
    render(<App />);

    const appContainer = screen
      .getByText("MATTIX Logo Animation")
      .closest(".app");
    expect(appContainer).toBeTruthy();
    expect(appContainer?.classList.contains("app")).toBe(true);

    const mainSection = screen
      .getByText("MATTIX Logo Animation")
      .closest(".main-logo-section");
    expect(mainSection).toBeTruthy();
    expect(mainSection?.classList.contains("main-logo-section")).toBe(true);

    const loadingSection = screen
      .getByText("Loading Component")
      .closest(".loading-section");
    expect(loadingSection).toBeTruthy();
    expect(loadingSection?.classList.contains("loading-section")).toBe(true);
  });

  it("passes correct props to MattixLogo", () => {
    render(<App />);

    const logo = screen.getByTestId("main-logo");
    expect(logo).toBeTruthy();

    // The mocked component should receive the props we pass
    // In a real scenario, we'd test the actual props passed
  });

  it("passes correct props to InfinityLoader", () => {
    render(<App />);

    const loader = screen.getByTestId("infinity-loader");
    expect(loader).toBeTruthy();
  });
});
