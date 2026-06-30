import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import App from './App.tsx'
import atlasAuth from './config/api/auth'
import { initTheme } from './hooks/use-theme'

if (!atlasAuth.apiKey) {
  const searchParams = new URLSearchParams(window.location.search)

  atlasAuth.apiKey = searchParams.get('key') || import.meta.env.VITE_SAHAJCLOUD_API_KEY
}

// Restore the persisted (or default) theme before first paint to avoid a flash.
initTheme()

ReactDOM.createRoot(document.getElementById('syatlas')!).render(
  <BrowserRouter>
    <App apiKey={atlasAuth.apiKey} />
  </BrowserRouter>,
)
