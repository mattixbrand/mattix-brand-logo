import React from "react";

export interface CodePreviewProps {
  className?: string;
  type?: "logo" | "loading";
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  className = "",
  type = "logo",
}) => {
  const message =
    type === "loading"
      ? "✅ Loading component code copied to clipboard!"
      : "✅ React component code copied to clipboard!";

  return (
    <div
      id="codePreview"
      className={`code-preview ${className}`}
      data-testid="code-preview"
    >
      <div className="preview-content">{message}</div>
    </div>
  );
};
