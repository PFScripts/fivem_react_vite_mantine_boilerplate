import { MutableRefObject, useEffect, useRef } from 'react';
import { NoOperationFunction } from '../Utils/Misc';

interface MessageData<T = unknown> {action: string, data: T};
type HandlerSignature<T> = (data: T) => void;

/**
 * 
 * @param action The `action` that should be listedned for.
 * @param handler The callback function that will handle the data relayed by this hook.
**/

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