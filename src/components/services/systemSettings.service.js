(function() {
  'use strict';
  angular
  .module('app')
  .service('settingsService', settingsService);
  function settingsService(logService) {
    var publicApi = {
      setSetting:_setSettings,
      getSettings:_getSettings,
      updateDirect:_updateDirect
    };
    return publicApi;
    var _globalFieldSettings = [{
      address:'Pavas, San José, Costa Rica',
      phone:'22314308',
      idJ:'3-002-660565',
      emailNotifications: 'no-reply@tckcr.org',
      direct:[
        {name:'Wilmer Alvarado Castro',
        position:'Presidente',
      email:'info@tkdcr.com',
    phone:'89829607'},
        {name:'Ferdinardo Alfaro Jimenez',
    position:'Vicepresidente',
  email:'ferdinandoalfaro@gmail.com',
phone:'89916463'}
,{name:'Kenneth Viquez Guevara',
position:'Secretario',
email:'prosema@racsa.co.cr',
phone:'88561919'}
      ]
    }];
    function _updateDirect(pnewDirect){
      var directList = _getSettings();
      for (var i = 0; i < directList.length; i++) {
        for (var j = 0; j < directList.direct.length; j++) {
          if(directList[i].direct[j].name == pnewDirect.name) {
            directList[i].direct[j].push(pnewDirect);
            localStorage.setItem('LSSettingsValues',JSON.stringify(directList));
          }
        }
      }
    }
    //functionn para actualizar algo
    function _setSettings(pNewSetting) {
      var settingsList = _getSettings();
      settingsList.push()
    }
    //function para obtener los parametros de configuración del sistema
    function _getSettings() {
      var settingsList = JSON.parse(localStorage.getItem('LSSettingsValues'));
      if(settingsList == null) {
        settingsList = _globalFieldSettings;
      }
      return settingsList;

    }
  }
}());
