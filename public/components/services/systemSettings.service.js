(function() {
  'use strict';
  angular
  .module('app')
  .service('settingsService', settingsService);
  function settingsService(logService, $http) {
    var publicApi = {
      updateParam:_updateParam,
      getSetting:_getSetting,
      updateDirect:_updateDirect,
      setDirect:_saveDirective,
      getDirect: _getDirectives,
      deleteDirective: _deleteDirective
    };
    return publicApi;

    // Se Actualiza un nuevo setting
    function _updateParam(pSettingObj) {
        return $http.put('http://localhost:3000/api/update_param', pSettingObj);
    }
    // Agarra toda la configuración
    function _getSetting() {
        return $http.get('http://localhost:3000/api/get_param');
    }

    // Guarda al nuevo directivo
    function _saveDirective(pNewDirective) {
        return $http.post('http://localhost:3000/api/save_directive', pNewDirective);
    }

    // Obtiene todos los directivos
    function _getDirectives(){
        return $http.get('http://localhost:3000/api/get_directive');
    }

    //Actualiza el directivo
    function _updateDirect(pDirectiveUpdate) {
        return $http.put('http://localhost:3000/api/update_directive', pDirectiveUpdate);
    }
    function _deleteDirective(pIdDirective){
        return $http.put('http://localhost:3000/api/deleteDirective/'+pIdDirective);
    }
  }
}());
