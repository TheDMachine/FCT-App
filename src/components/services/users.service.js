(function() {
  'use strict';
  angular
    .module('app')
    .service('userService',userService);
    function userService(){
      var _UsersConsult = [{"nationality":"costarricense"
      ,"email":"daniel.camposarce@gmail.com"
      ,"id":"402220554"
      ,"firstName":"Daniel"
      ,"secondName":"Jose"
      ,"firstLastName":"Campos"
      ,"secondLastName":"Arce"
      ,"birthday":"1994-03-13T06:00:00.000Z"}];
      var publicApi = {
        createConsul:_setConsul
      }
      return publicApi;
      function _getUserConsult(){
      var consulList = JSON.parse(localStorage.getItem('lsConsulUsers'));
        if(consulList == null){
          consulList = _UsersConsult;
        }
        return consulList;
      }
    function _setConsul(pNewObjConsult){
      var consulList = _getUserConsult();
      for (var i = 0; i < consulList.length; i++) {
        if (consulList[i].name == pNewObjConsult.name) {
          return false;
        }else{
          consulList.push(pNewObjConsult);
          localStorage.setItem('lsConsulUsers', JSON.stringify(consulList));
          return true;
       }
    }
    }
  }
})();
