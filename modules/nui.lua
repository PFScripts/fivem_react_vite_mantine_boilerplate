---@param message NuiMessage
local function handleNuiMessage(message)
  if not(type(message) == 'table') then return end
  message.data = message.data or {}
  message.shouldFocus = message.shouldFocus or false
  SendNUIMessage({action = message.action, data = message.data})
  SetNuiFocus(message.shouldFocus, message.shouldFocus)
end

local function hideComponent(data, cb) handleNuiMessage(data) cb(true) end
RegisterNUICallback('hideComponent', hideComponent)

return handleNuiMessage