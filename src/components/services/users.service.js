(function(){
  'use strict';
  angular
  .module('app')
  .service('userService', userService);

  function userService(){
    var teachers = [];
    var publicAPI = {
      setTeachers : _setTeachers,
      getTeachers : _getTeachers,
      updateTeacher : _updateTeacher
    };
    return publicAPI; // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que cuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones

    function _setTeachers(pTeacher){
      var teachersList = _getTeachers();

      teachersList.push(pTeacher);
      localStorage.setItem('lsTeachersList', JSON.stringify(teachersList));
    }
    function _getTeachers(){
      var teachersList = JSON.parse(localStorage.getItem('lsTeachersList'));
      if(teachersList == null){
        teachersList = teachers;
      }
      return teachersList;
    }
    function _updateTeacher(pobjUsuario){
      var teachersList = _getTeachers();
      for(var i = 0; i < teachersList.length; i++){
        if(teachersList[i].id == pobjUsuario.id){
          teachersList[i] = pobjUsuario;
        }
      }
      localStorage.setItem('lsTeachersList', JSON.stringify(teachersList));
    }

    //encontrar usuario profesor para agarrar información
    function _findUserTeacher(pUsernameToFind){
      var userStorage = _getTeachers();
     for (var i = 0; i < userStorage.length; i++) {
       if(userStorage[i].email == pUsernameToFind){
         return userStorage[i];
       }
     }
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

   function _getCookie(){
    return $cookies.get('currentUserActive');
   }
  }
})();
