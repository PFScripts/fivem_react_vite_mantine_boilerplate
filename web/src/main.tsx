import {createRoot} from 'react-dom/client';
import {StrictMode} from 'react';
import {MantineProvider} from '@mantine/core';
import {VisibilityProvider} from './Providers/VisibilityProvider';
import {App} from './Components/App';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={{colorScheme:'dark'}}>
      <VisibilityProvider component='App'>
        <App/>
      </VisibilityProvider>
    </MantineProvider>
  </StrictMode>
);