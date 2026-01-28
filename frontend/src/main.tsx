import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthProvider.tsx';
import { EventBusProvider } from '@/contexts/EventBusProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventBusProvider>
          <App />
        </EventBusProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
