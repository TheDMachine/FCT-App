  (function() {
  'use strict';
  angular
    .module('app')
    //Inicia servicio de usuarios
    //que maneja todos los usuarios y sus formas.
    .service('userService',userService);
    function userService(){
      //EL usuario quemado de represetante de consejo.
      var _UsersConsult = [{"nationality":"costarricense"
      ,"email":"daniel.camposarce@gmail.com"
      ,"id":"402220554"
      ,"firstName":"Daniel"
      ,"secondName":"Jose"
      ,"firstLastName":"Campos"
      ,"secondLastName":"Arce"
      ,"birthday":"1994-03-13T06:00:00.000Z"}];
      //Se publica el api para acceso al servicio.
      var publicApi = {
        createConsul:_setNewConsul,
        obtainConsult:_getUserConsult,
        createTeacher:_setNewTeacher,
        obtainTeacher:_getUserTeacher,
        createCompetitor:_setNewCompetitor
      }
      //retorna el api.
      return publicApi;
      function _setNewTeacher(pNewObjTeacher){
        var teacherList = _getUserTeacher();
        teacherList.push(pNewObjTeacher)
        localStorage.setItem('lsTeacherUsers', JSON.stringify(teacher));
      }
      function _getUserTeacher(){
        var teacherList = JSON.parse(localStorage.getItem('lsTeacherUsers'));
        if(teacherList == null){
          teacherList = _userTeacher;
        }
        return teacherList;
      }
      //Se obtiene los usuarios de tipo representantes de consejo
      function _getUserConsult(){
      var consulList = JSON.parse(localStorage.getItem('lsConsulUsers'));
        if(consulList == null){
          consulList = _UsersConsult;
        }
        return consulList;
      }
      //se crea un nuevo representante de consejo.
      function _setNewConsul(pNewObjConsult){
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
