import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MattixLogo, { InfinityLoader } from "../components/MattixLogo";

describe("MattixLogo Component", () => {
  it("renders correctly", () => {
    render(<MattixLogo data-testid="mattix-logo" />);
    const logo = screen.getByTestId("mattix-logo");
    expect(logo).toBeTruthy();
  });
});

describe("InfinityLoader Component", () => {
  it("renders correctly", () => {
    render(<InfinityLoader data-testid="infinity-loader" />);
    const loader = screen.getByTestId("infinity-loader");
    expect(loader).toBeTruthy();
  });
});
