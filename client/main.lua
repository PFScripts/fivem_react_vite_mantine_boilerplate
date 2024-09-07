local handleNuiMessage = require('modules.nui')

RegisterCommand('test_nui', function ()
  handleNuiMessage({action = 'setVisibleApp', data = true}, true)
end)

local function getPlayerInformation(_, cb)
  local info = lib.callback.await('getplayerInformation')
  local identifiers = {}
  for _, identifier in pairs(info.identifiers) do identifiers[identifier:match('([^:]+):')] = identifier:match(':(.+)') end
  cb({name = info.name, identifiers =identifiers})
end

RegisterNUICallback('getplayerInformation', getPlayerInformation)
