import r2wc from '@r2wc/react-to-web-component';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router';
import i18n from './config/i18n';

// Implementation of embeddable Widget
// Demo in: demo.html
// Based on: https://www.linkedin.com/pulse/converting-react-app-appendable-widget-using-web-mike-rahimi-wssnf/

const HASH_BASE = "!"

type WidgetProps = {
  apiKey: string;
  locale?: string;
  basePath?: string;
}

export default function Widget({
  apiKey,
  locale,
  basePath
} : WidgetProps) {
  let Router: typeof BrowserRouter | typeof HashRouter;

  if (locale) {
    i18n.changeLanguage(locale)
  }

  if (!!basePath) {
    if (!window.location.pathname.startsWith(basePath)) {
      window.location.pathname = basePath + window.location.pathname
    }

    Router = BrowserRouter
  } else {
    if (!window.location.hash.startsWith("#" + HASH_BASE)) {
      window.location.hash = HASH_BASE + window.location.hash
    }

    Router = HashRouter
    basePath = HASH_BASE
  }

  return (
    <Router basename={basePath}>
      <App key={apiKey} />
    </Router>
  );
}

customElements.define('syatlas-map', r2wc(Widget, {
  props: {
    apiKey: 'string',
    basePath: 'string',
    locale: 'string',
  },
}));
