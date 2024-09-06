import {createContext, FC, ReactNode, useEffect, useState} from 'react';
import {HandleNuiMessage} from '../Hooks/HandleNuiMessage';
import {IsRunningInBrowser} from '../Utils/Misc';
import {TriggerNuiCallback} from '../Utils/TriggerNuiCallback';

interface VisibilityProviderValue {visible: boolean, setVisible: (visible: boolean) => void};

const VisibilityProviderContext = createContext<VisibilityProviderValue | null>(null);

/**
 * `VisibilityProvider` is a component that manages the visibility state of its children.
 * @param children The content wrapped by the `VisibilityProvider` that will be shown or hidden.
 * @param component The name of the component that this provider controls.
 * @example
 * <VisibilityProvider component='MDTComponent'>
 *  <MDTComponent/>
 * </VisibilityProvider>
**/

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