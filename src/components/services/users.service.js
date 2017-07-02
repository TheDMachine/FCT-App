(function() {
  'use strict';
  angular
    .module('app')
    .service('userService',userService);
    function userService(){
      var _Users = [];
      var publicApi = {
        createConsul:_setConsul
      }
      return publicApi;
      function _getUserConsult(){
      var consulList = JSON.parse(localStorage.getItem('lsConsulUsers'));
        if(consulList == null){
          consulList = _Users;
        }
        return consulList;
      }
    function _setConsul(pNewObjConsult){
      var consulList = _getuserConsult();
      for (var i = 0; i < consulList.length; i++) {
        if (consulList[i].name == pNewObjConsult.name) {
          return false;
        }else{
          consulList.push(pNewObjConsult);
          localStorage.setItem('lsConsulUsers');
          return true;
        }
    }
    }
  }
})();
