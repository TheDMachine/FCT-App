(function() {
  angular.module('app')
  .service('AuthService',AuthService);
  function AuthService($cookies,$location, userService, $http){
    return {
      getCredencials:_getAuthCredencials,
      logOut : _destroyAuthCredentials,
      getCookie : _getCookie
    }
    function _getAuthCredencials(pId,pPassword){
      $http.post('http://localhost:3000/api/find_user', {id : pId, password : pPassword})
      .then(function(response){
        console.log(response);
        var role = response.data.user[0].role; 
        var userLogged = response.data.user[0];
        $cookies.putObject('currentUserActive', userLogged);

        switch (role) {
        case 'admin':
          $location.path('/admin');
          break;
        case 'teacher':
          $location.path('/teacher');
          break;
        case 'student':
          $location.path('/competitor');
          break;
        case 'consul':
          $location.path('/consul');
          break;
        case 'assistant':
          $location.path('/assistant');
          break;
        default:
          $location.path('/');
          break;

      }

      })
      .catch(function(err){
        console.log(err);
      })
      /*var user = 
        { 'email' : 'luisbianco28@hotmail.com',
          'password' : '123',
          'userType' : 'Profesor',
          'newUser' : 1
        };*/
      //console.log("Yass work correctly auth service. The user is %s and the password is %s",pUsername,pPassword);
      /*if(userService.findUserTeacher(pId) !== false){
        var userFounded = userService.findUserTeacher(pId);
        userFounded.userType = 'Profesor';
        if(userFounded.newUser == undefined || userFounded.newUser !== 0){
          userFounded.newUser = 1;
          userService.updateTeacher(userFounded);
        }
      }
      if(userService.searchUser(pId) !== false){
        var userFounded = userService.searchUser(pId);
        userFounded.userType = 'Competidor';
        if(userFounded.newUser == undefined || userFounded.newUser !== 0){
          userFounded.newUser = 1;
          userService.updateUsers(userFounded);
        }
      }
      if(userService.searchAdmin(pId) !== false){
        var userFounded = userService.searchAdmin(pId);
        userFounded.userType = 'Administrador';
      }

      if(userService.searchAssistant(pId) !== false){
        var userFounded = userService.searchAssistant(pId);
        userFounded.userType = 'Asistente';
      }
      /*
      if(userService.searchUser(pEmail) !== false){
        var userFounded = userService.searchUser(pEmail);
        userFounded.userType = 'Representante';
        userFounded.newUser = 1;
        userService.updateUsers(userFounded);
      }
      if(userService.searchUser(pEmail) !== false){
        var userFounded = userService.searchUser(pEmail);
        userFounded.userType = 'Asistente';
        userFounded.newUser = 1;
        userService.updateUsers(userFounded);
      }*/



      /*if(userFounded.length == 0){
        $location.path('/');
      }
      _validateFields(pId, pPassword, userFounded);
      $cookies.put('currentUserActive',userFounded.id);*/
    }
    function _destroyAuthCredentials(){
      var currentUser = $cookies.get('currentUserActive');
      /*var x = userService.findUsers(currentUser);
      x.logIn = false;*/
      $cookies.remove('currentUserActive');
      _redirectTo(false);
    }
    function _validateFields(pUserId, pPassField, userFound){
      if(userFound.id == pUserId && userFound.password == pPassField){
        _redirectTo(userFound);
      }
      else {
        _redirectTo(false);
      }
    }
    function _redirectTo(pValidUser){
      switch (pValidUser.userType) {
        case 'Administrador':
          $location.path('/admin');
          break;
        case 'Profesor':
          $location.path('/teacher');
          break;
        case 'Competidor':
          $location.path('/competitor');
          break;
        case 'Representante':
          $location.path('/consul');
          break;
        case 'Asistente':
          $location.path('/assistant');
          break;
        default:
          $location.path('/');
          break;

      }
    }

   function _getCookie(){
    return $cookies.get('currentUserActive');
   }
  }
}());
