import { render } from "@testing-library/react";
import { DownloadManager } from "../components/DownloadManager";

describe("DownloadManager Simple Test", () => {
  it("should render without crashing", () => {
    console.log("About to render DownloadManager...");
    const result = render(<DownloadManager />);
    console.log("Render result:", result);
    expect(true).toBe(true);
  });
});
