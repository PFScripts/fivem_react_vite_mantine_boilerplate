local handleNuiMessage = require('modules.nui')

RegisterCommand('test_nui', function ()
  handleNuiMessage({action = 'setVisibleApp', data = true}, true)
end)