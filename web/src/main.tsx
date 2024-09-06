import {createRoot} from 'react-dom/client';
import {StrictMode} from 'react';
import {MantineProvider} from '@mantine/core';
import {VisibilityProvider} from './Providers/VisibilityProvider';
import {App} from './Components/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <VisibilityProvider component='App'>
        <App/>
      </VisibilityProvider>
    </MantineProvider>
  </StrictMode>
);