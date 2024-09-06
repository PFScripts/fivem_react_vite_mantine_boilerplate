import '@mantine/core/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { VisibilityProvider } from './Providers/VisibilityProvider';
import {App} from './Components/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VisibilityProvider component='App'>
      <App/>
    </VisibilityProvider>
  </StrictMode>
);