import { createRoot } from 'react-dom/client';

import App from './App';
import { installPreviewApi } from './lib/preview-api';

import './index.css';

// Offline preview build, or a deployment without storage yet: answer /api in the
// browser so everything works. The kitchen dashboard at /kitchen reads the same data.
async function boot() {
  let live = false;
  if (import.meta.env.VITE_PREVIEW !== '1') {
    try {
      const res = await fetch('/api/health', { cache: 'no-store' });
      live = res.ok && (await res.json()).live === true;
    } catch {
      live = false;
    }
  }
  if (!live) installPreviewApi();
  createRoot(document.getElementById('root')!).render(<App />);
}
boot();
