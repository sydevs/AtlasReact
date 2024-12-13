import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

ReactDOM.createRoot(document.getElementById("syatlas")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
