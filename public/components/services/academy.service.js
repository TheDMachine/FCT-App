(function(){
  'use strict';
  angular
  .module('app')
  .service('academyServices', academyServices);
  academyServices.$inject=['$http'];

  function academyServices($http) {
    var academy = [];
    var publicAPI = {
      setAcademy: _setAcademy,
      getAcademy: _getAcademy,
      updateAcademy : _updateAcademy
    };
    return publicAPI;
    //Guardar academia
    function _setAcademy(newAcademy){
      // var academyList = _getAcademy();
      // var position = searchAcademy(newAcademy);
      // if (position == -1) {
      //   academyList.push(newAcademy);
      //   localStorage.setItem('lsAcademyList', JSON.stringify(academyList));
      //   //logService.createLog(0, )
      // }
      console.log(newAcademy);
     return $http.post('http://localhost:3000/api/save_academy',newAcademy);
    }
    //buscar si la academia se repite
    function searchAcademy(newAcademy){
      var academyList = _getAcademy();
      var position = -1;

      for (var i = 0; i < academyList.length; i++) {
        if (newAcademy.name == academyList[i].name) {
          position = i;
        }
      }
      return position;
    }
    //muestra la informacion mas actual
    function _getAcademy(){
    //   var academyList = JSON.parse(localStorage.getItem('lsAcademyList'));
    //   if(academyList == null){
    //     academyList = academy;
    //   }
    //   return academyList;
     return $http.get('http://localhost:3000/api/get_all_academies');
    }
    //editar la informacion de la academian ya registrada
    function _updateAcademy(editAcademy){
      // var academyList = _getAcademy();
      // for(var i = 0; i < academyList.length; i++){
      //   if(academyList[i].name == editAcademy.name){
      //     academyList[i] = editAcademy;
      //   }
      // }
      // localStorage.setItem('lsAcademyList', JSON.stringify(academyList));
      return $http.put('http://localhost:3000/api/update_academy',editAcademy);
    }
  }

})();
