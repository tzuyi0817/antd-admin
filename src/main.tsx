import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { setupI18n } from '@/plugins/i18n';
import { setupLoading } from '@/plugins/loading';

import { App } from './App.tsx';
import 'virtual:svg-icons-register';
import '@/styles/index.css';

async function setupApp() {
  const rootElement = document.querySelector('#root');

  if (!rootElement) return;

  setupI18n();
  setupLoading();

  const root = createRoot(rootElement);
  const isDev = import.meta.env.DEV;

  if (import.meta.env.VITE_APP_MOCK === 'service-worker') {
    const { worker } = await import('@/mocks/browser');

    worker.start();
  }

  if (isDev) {
    root.render(<App />);
  } else {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}

setupApp();
