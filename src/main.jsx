import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <div style={{ color: "white", textAlign: "center", padding: "20px" }}>
      <h1>Test React App</h1>
      <p>If you can see this, React is working!</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
