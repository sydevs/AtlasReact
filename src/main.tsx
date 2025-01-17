import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import atlasAuth from "./config/api/auth";

if (!atlasAuth.apiKey) {
  const searchParams = new URLSearchParams(window.location.search);
  atlasAuth.apiKey = searchParams.get('key') || import.meta.env.VITE_ATLAS_API_KEY;
}

ReactDOM.createRoot(document.getElementById("syatlas")!).render(
  <App apiKey={atlasAuth.apiKey} />
);
