import r2wc from '@r2wc/react-to-web-component';
import App from './App';
import { HashRouter } from 'react-router';
import i18n from './config/i18n';
import atlasAuth from './config/api/auth';

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
  locale
} : WidgetProps) {
  if (!atlasAuth.apiKey) {
    atlasAuth.apiKey = apiKey;
  }

  if (locale) {
    i18n.changeLanguage(locale)
  }

  if (!window.location.hash) {
    window.location.hash = HASH_BASE;
  }

  return (
    <HashRouter basename={HASH_BASE}>
      <App apiKey={apiKey} defaultLocale={locale} />
    </HashRouter>
  );
}

customElements.define('syatlas-map', r2wc(Widget, {
  props: {
    apiKey: 'string',
    locale: 'string',
  },
}));
