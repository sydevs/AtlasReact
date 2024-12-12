import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import r2wc from "@r2wc/react-to-web-component"

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import "@/styles/embla.css";
import '@/config/i18n';

type Props = {
  key: string;
};

function Atlas({ key }: Props) {
  console.log('api key', key)
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("syatlas")!).render(<Atlas key="" />);

customElements.define(
  "rwc-header", r2wc(Atlas, {
    props: { key: "string" },
  })
);

const EmbedAtlas = r2wc(Atlas, {
  props: {
    key: "string",
  },
})

export default EmbedAtlas;