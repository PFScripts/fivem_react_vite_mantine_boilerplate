<h1 align='center'>
  FiveM React Boilerplate
</h1>

<div align="center">
  This boilerplate provides a modern React setup specifically designed for FiveM development.
</div>

<div align='center'>
  
  ![GitHub License](https://img.shields.io/github/license/PFScripts/fivem_react_vite_mantine_boilerplate?label=License&labelColor=%E2%80%8E%E2%80%8E&color=%2330b893)
  <a href='https://discord.gg/QhMmyx8xsE'>
    ![Discord](https://img.shields.io/discord/1279910494425186446?style=flat&logo=discord&logoColor=%2330b893&label=%E2%80%8E%20&labelColor=%E2%80%8E%E2%80%8E&color=%2330b893)
  </a>
</div>

## `Information`

* **Fast Build System:** Powered by Vite for quick and efficient development.
* **UI Library:** Built with Mantine UI to ensure a visually appealing interface.
* **Flexible Workflows:** Supports both browser and in-game development, making it versatile for various scenarios.
* **CfxLua Runtime Compatibility:** Seamlessly integrates with the CfxLua runtime for FiveM applications.

## `Requirements`

- [**ox_lib**](https://github.com/overextended/ox_lib/releases/latest)
- [**Node > v18.20.4**](https://nodejs.org/en/)
- [**PNPM (Preferred but not required)**](https://pnpm.io/)

## `Getting Started`

### `Installation`

The boilerplate was built `pnpm` but is still compatible with `npm`.

1. Clone the repository or use the template option and place it within your `resources` folder.
2. Go to the `web` folder within a terminal of your choice and type `pnpm i` or `npm i`.

## `Features` 

### `Web | Scripts`

* (`pnpm` or `npm`) `run dev` – Starts the development server.
* (`pnpm` or `npm`) `run build` – Builds the project.
* (`pnpm` or `npm`) `run build:watch` – Builds the project and watches for changes.
* (`pnpm` or `npm`) `run build:clean` – Deletes the `./build` directory.

### `Web | VisibilityProvider`

```tsx
// `VisibilityProvider` is a component that manages the visibility state of its children.
// Example:
<VisibilityProvider component='MDTComponent'>
  <MDTComponent/>
</VisibilityProvider>
```

### `Web | TriggerNuiCallback`

```tsx
// Triggers a callback registered with the REGISTER_NUI_CALLBACK native.
// Example:
TriggerNuiCallback<any>('getPlayerInfo').then(info => {
  setPlayerInfo(info);
});
```

### `Web | HandleNuiMessage`

```tsx
// `HandleNuiMessage` is a hook that listens for events sent from the client and invokes a handler when an event with the specified action is received.
// Example:
const [playerData, setPlayerData] = useState<PlayerData>([]);
  HandleNuiMessage<any>('updatePlayerData', (data) => {
  setPlayerData(data);
});
```

### `Web | SendNuiMessage`

```tsx
// Example:
// Triggers the `HandleNuiMessage` hook registered with the action `setVisibleApp`, passing `true` as the data payload to control the visibility of the application.
// This stimulates the SEND_NUI_MESSAGE native in the development environment.
SendNuiMessage([
  {action: 'setVisibleApp', data: true}
]);
```

### `Lua | handleNuiMessage`

```lua
-- 1st argument its the message sent by SEND_NUI_MESSAGE native.
-- 2nd argument sets the SET_NUI_FOCUS native value. 
-- Example:
handleNuiMessage({action = 'setVisibleApp', data = true}, true)
```
