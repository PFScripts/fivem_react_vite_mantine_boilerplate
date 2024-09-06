import {IsRunningInBrowser} from './Misc';

/**
 * Triggers a callback registered with the REGISTER_NUI_CALLBACK native.
 * @param callback The target callback name.
 * @param data The data that you wish to send to the target callback.
 * @param mockData The data that will be returned if you're running in the browser.
 * @returns The data sent from the target callback.
**/

export async function TriggerNuiCallback<T = unknown>(callback: string, data?: unknown, mockData?: T): Promise<T> {
  if (IsRunningInBrowser() && mockData) return mockData;
  const options = {method: 'post', headers: {'Content-Type': 'application/json; charset=UTF-8'}, body: JSON.stringify(data)};
  const resource = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : 'nui-frame-app';
  const response = (await fetch(`https://${resource}/${callback}`, options)).json();
  return response;
};