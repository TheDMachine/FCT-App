
(function() {
  'use strict';
  angular
    .module('app')
    //Inicia servicio de usuarios
    //que maneja todos los usuarios y sus formas.
    .service('userService',userService);
    function userService($cookies){
      var teachers = [];
       var users = [];
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
      var publicAPI = {
        createConsul:_setNewConsul,
        obtainConsult:_getUserConsult,
        findUserTeacher : _findUserTeacher,
        setTeachers : _setTeachers,
        getTeachers : _getTeachers,
        updateTeacher : _updateTeacher,
        getCookie : _getCookie,
        setUsers: _setUsers,
        getUsers: _getUsers,
        updateUsers: _updateUsers,
        searchUser : _searchUser
    };
    return publicAPI;

    //Guardar alumno
    function _setUsers(newUser){
      var usersList = _getUsers();
      var position = searchUser(newUser);
      if (position == -1) {
        usersList.push(newUser);
        localStorage.setItem('lsUsersList', JSON.stringify(usersList));
      }
    }

    //buscar si la cédula se repite
    function _searchUser(newUser){
      var usersList = _getUsers();
     for (var i = 0; i < usersList.length; i++) {
       if(usersList[i].email == pUsernameToFind){
         return usersList[i];
       }
     }
     return false;
   }

    //muestra la informacion mas actual
    function _getUsers(){
      var usersList = JSON.parse(localStorage.getItem('lsUsersList'));
      if(usersList == null){
        usersList = users;
      }
      return usersList;
    }

    //editar la informacion del alumno ya registrada
    function _updateUsers(editUser){
      var usersList = _getUsers();
      for(var i = 0; i < usersList.length; i++){
        if(usersList[i].id == editUser.id){
          usersList[i] = editUser;
        }
      }
      localStorage.setItem('lsUsersList', JSON.stringify(usersList));
    } // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que cuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones

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
     return false;
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
            pNewObjConsult.password = _generatePassword();
            consulList.push(pNewObjConsult);
            localStorage.setItem('lsConsulUsers', JSON.stringify(consulList));
            return true;
          }
        }
    }

   function _getCookie(){
    return $cookies.get('currentUserActive');
   }
   function _generatePassword() {
     a = [];
  var chars = ['#', '%', '£', '!', '?', '&', ';', '(', ')', '=', '+', '$'];
  for (var i = 97; i <= 122; i++) {
  	a[a.length] = String.fromCharCode(i).toUpperCase();
        
    // create random letters.
  	var one = a[Math.floor(Math.random() * a.length)];
    var two = a[Math.floor(Math.random() * a.length)];
    var three = a[Math.floor(Math.random() * a.length)];
    var four = a[Math.floor(Math.random() * a.length)];
    var five = a[Math.floor(Math.random() * a.length)];
    var six = a[Math.floor(Math.random() * a.length)];
    var seven = a[Math.floor(Math.random() * a.length)];
    var eight = a[Math.floor(Math.random() * a.length)];

    // create random numbers.
    var int1 = Math.floor(Math.random() * 10);
    var int2 = Math.floor(Math.random() * 10);
    var ints = int1.toFixed(0) + int2.toFixed(0);
    var intsDecimal = int1.toFixed(0) + "." + int2.toFixed(0);

    // create random characters, based on array (chars).
    var randChar = chars[Math.floor(Math.random() * chars.length).toFixed(0)];

    // create variable moving all letters, numbers and characters together.
    var c = one + two + three + four + five + six + seven + eight + ints + randChar;
 		}
   }
  }
})();
