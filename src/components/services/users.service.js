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

  }

})();
