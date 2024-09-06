import {createContext, FC, ReactNode, useEffect, useState} from 'react';
import {HandleNuiMessage} from '../Hooks/HandleNuiMessage';
import {IsRunningInBrowser} from '../Utils/Misc';
import {TriggerNuiCallback} from '../Utils/TriggerNuiCallback';

interface VisibilityProviderValue {visible: boolean, setVisible: (visible: boolean) => void};

const VisibilityProviderContext = createContext<VisibilityProviderValue | null>(null);

export const VisibilityProvider: FC<{children: ReactNode, component: string}> = ({children, component}) => {
  const [visible, setVisible] = useState(false);
  HandleNuiMessage<boolean>(`setVisible${component}`, setVisible);
  useEffect(() => {
    if (visible) {
      const keyHandler = (keyboardEvent: KeyboardEvent) => {
        if (['Backspace', 'Escape'].includes(keyboardEvent.key)) {
          if (!IsRunningInBrowser()) {
            TriggerNuiCallback('hideComponent', {action: `setVisible${component}`, data: false});
          } else {
            setVisible(false);
          };
        };
      };
      window.addEventListener('keydown', keyHandler);
      return () => window.removeEventListener('keydown', keyHandler);
    };
  }, [visible, component]);
  return (
    <VisibilityProviderContext.Provider value={{visible, setVisible}}>
      <div style={{visibility: visible ? 'visible': 'hidden'}}>
        {children}
      </div>
    </VisibilityProviderContext.Provider>
  );
};