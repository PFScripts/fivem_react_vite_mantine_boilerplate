import {SendNuiMessage} from '../Utils/SendNuiMessage';
import {DEFAULT_THEME, Box} from '@mantine/core';
import {FC} from 'react';

SendNuiMessage([{action: 'setVisibleApp', data: true}]);

export const App: FC = () => {
  const theme = DEFAULT_THEME;
  return (
    <Box style={{ backgroundColor: theme.colors.red[4], textAlign: 'center'}}>
      <h1>Hello World!</h1>
    </Box>
  );
};