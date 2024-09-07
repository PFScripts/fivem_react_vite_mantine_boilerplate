local function getPlyInfo(src) return {name = GetPlayerName(src), identifiers = GetPlayerIdentifiers(src)} end

lib.callback.register('getplayerInformation', getPlyInfo)