import {SendNuiMessage} from '../Utils/SendNuiMessage';
import {FC, useState} from 'react';
import classes from './App.module.css';
import {DEFAULT_THEME, Container, Box, List, Title, Button} from '@mantine/core';
import {TriggerNuiCallback} from '../Utils/TriggerNuiCallback';
import { HandleNuiMessage } from '../Hooks/HandleNuiMessage';
import { useClipboard } from '@mantine/hooks';

interface PlayerInformation {name: string, identifiers: string[]};

SendNuiMessage([{action: 'setVisibleApp', data: true}]);

export const App: FC = () => {
  const [playerInformation, setPlayerInformation] = useState<PlayerInformation | null>(null);

  const getPlayerInformation = () => {
    TriggerNuiCallback<PlayerInformation>('getplayerInformation').then(info => {
      setPlayerInformation(info)
    }).catch(_ => {
      setPlayerInformation(null);
    });
  };

  const LoadInformation = () => {
    if (playerInformation === null) return (<></>);  
    return (
      <div>
        <Title c={DEFAULT_THEME.colors.gray[0]} order={2} align='center'>{playerInformation.name}</Title>
        <List c={DEFAULT_THEME.colors.gray[0]}>
          {Object.entries(playerInformation.identifiers).map(([type, value], i) => (
            <List.Item key={i} icon='-'>
              {type.toUpperCase()}: {value}
            </List.Item>
          ))}
        </List>
      </div>
    );
  };

  HandleNuiMessage<any>('setVisibleApp', () => {
    setPlayerInformation(null);
  });

  return (
    <Container className={classes.app_container}>
      <Box className={classes.box_container} bg={DEFAULT_THEME.colors.dark[9]} opacity={0.8}>
          <div>
            {LoadInformation()}
          </div>
          <div>
            <Button variant='filled' onClick={getPlayerInformation}>GET PLAYER INFORMATION</Button>
          </div>
      </Box>
    </Container>
  );
};