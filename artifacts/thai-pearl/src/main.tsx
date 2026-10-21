import { createRoot } from 'react-dom/client';

import App from './App';
import { installPreviewApi } from './lib/preview-api';

import './index.css';

// Offline preview build: answer /api in the browser so it runs with no server.
if (import.meta.env.VITE_PREVIEW === '1') installPreviewApi();

createRoot(document.getElementById('root')!).render(<App />);
