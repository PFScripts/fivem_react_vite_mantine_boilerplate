local handleNuiMessage = require('modules.nui')

RegisterCommand('test_nui', function ()
  handleNuiMessage({action = 'setVisibleApp', shouldFocus = true})
end)