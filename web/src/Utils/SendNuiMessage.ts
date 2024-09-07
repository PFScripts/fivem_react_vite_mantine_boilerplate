import {IsRunningInBrowser} from "./Misc";

interface NuiMessage<T = unknown> {action: string, data: T};

/**
 * This simulates the SEND_NUI_MESSAGE native.
 * 
 * Only used in developing environment.
 * @param messages 
 * @param timeout 
**/

export const SendNuiMessage = <P>(messages: NuiMessage<P>[], timeout = 1000): void => {
  if (import.meta.env.DEV && IsRunningInBrowser()) {
    for (const message of messages) {
      setTimeout(() => {
        window.dispatchEvent(new MessageEvent('message', {data: {action: message.action, data: message.data}}));
      }, timeout);
    };
  };
};