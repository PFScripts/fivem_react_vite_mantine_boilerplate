import { MutableRefObject, useEffect, useRef } from 'react';
import { NoOperationFunction } from '../Utils/Misc';

interface MessageData<T = unknown> {action: string, data: T};
type HandlerSignature<T> = (data: T) => void;

/**
 * `HandleNuiMessage` is a hook that listens for events sent from the client and invokes a handler when an event with the specified action is received.
 * 
 * @param action The `action` string that should be listened for.
 * @param handler The callback function that handles the data received for the given `action`.
 * 
 * @example
 * const [playerData, setPlayerData] = useState<PlayerData>([]);
 * HandleNuiMessage<any>('updatePlayerData', (data) => {
 *  setPlayerData(data);
 * });
 */

export const HandleNuiMessage = <T = unknown>(action: string, handler: (data: T) => void) => {
  const savedHandler: MutableRefObject<HandlerSignature<T>> = useRef(NoOperationFunction);
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    const messageListener = (message: MessageEvent<MessageData<T>>) => {
      const {action: messageAction, data} = message.data;
      if (savedHandler.current) {
        if (messageAction === action) {
          savedHandler.current(data);
        };
      };
    };
    window.addEventListener('message', messageListener);
    return () => window.removeEventListener('message', messageListener);
  }, [action]);
};