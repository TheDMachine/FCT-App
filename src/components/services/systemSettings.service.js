(function() {
  'use strict';
  angular
  .module('app')
  .service('settingsService', settingsService);
  function settingsService(logService) {

    var globalFieldSettings = {
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
    };

    var publicApi = {
      setSetting:_setSettings,
      getSettings:_getSettings,
      updateDirect:_updateDirect,
      editParamToSystem: _editParamToSystem
    };
    return publicApi;

    //Función para actualizar los parametros del sistema
    function _editParamToSystem(pOldParam, pNewParam) {
      var data = _getSettings();
      for (var index in data) {
        if (data[index] === pOldParam) {
          data[index] = pNewParam;
          localStorage.setItem('LSSettingsValues', JSON.stringify(data));
          return;
        }
      }
    }





    //funcion para actualizar información de un
    //integrante de la junta directiva
    function _updateDirect(pnewDirect){
      var directList = _getSettings();
        for (var i = 0; i < directList.direct.length; i++) {
          if(directList.direct[i].name === pnewDirect.name || directList.direct[i].position === pnewDirect.position || directList.direct[i].email === pnewDirect.email || directList.direct[i].phone === pnewDirect.phone) {
            directList.direct[i]= pnewDirect;
            localStorage.setItem('LSSettingsValues',JSON.stringify(directList));
            return false;
          }
        }
        directList.direct.push(pnewDirect);
        localStorage.setItem('LSSettingsValues',JSON.stringify(directList));
    }

    //functionn para actualizar algo
    function _setSettings(pNewSetting) {
      console.log(pNewSetting);
      var settingsList = _getSettings();
      for (var index in settingsList) {
        console.log(settingsList[index]);

        }
      localStorage.setItem('LSSettingsValues',JSON.stringify(settingsList));
    }

    //function para obtener los parametros de configuración del sistema
    function _getSettings() {
      var settingsList = JSON.parse(localStorage.getItem('LSSettingsValues'));
      if(settingsList == null) {
        settingsList = globalFieldSettings;
      }
      return settingsList;

    }
  }
}());
