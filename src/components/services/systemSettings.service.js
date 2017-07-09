(function() {
  'use strict';
  angular
  .module('app')
  .service('settingsService', settingsService);
  function settingsService(logService) {
    var publicApi = {setSetting:_setSettings, getSettings:_getSettings};
    return publicApi;
    //functionn para actualizar algo
    function _setSettings(pNewSetting) {

    }
    //function para obtener los parametros de configuración del sistema
    function _getSettings() {

    }
  }
}());
