// 1. ABSOLUTE FIRST: Polyfill process to prevent "process is not defined" errors in Vite/Vercel
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: {} };
}
(window as any).process.env = (window as any).process.env || {};

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("Extreme Air App: Booting...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Extreme Air App: Root element not found!");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Extreme Air App: Rendered successfully.");
} catch (err) {
  console.error("Extreme Air App: Render failed:", err);
}