(function() {
  angular.module('app')
  .service('AuthService',AuthService);
  function AuthService($cookies,$location, userService){
    return {
      getCredencials:_getAuthCredencials,
      logOut : _destroyAuthCredentials,
      getCookie : _getCookie
    }
    function _getAuthCredencials(pEmail,pPassword){
      /*var user = 
        { 'email' : 'luisbianco28@hotmail.com',
          'password' : '123',
          'userType' : 'Profesor',
          'newUser' : 1
        };*/
      //console.log("Yass work correctly auth service. The user is %s and the password is %s",pUsername,pPassword);
      var userFoundedTeacher = userService.findUserTeacher(pEmail);
      if(userFoundedTeacher.length == 0){
        $location.path('/');
      }
      _validateFields(pEmail, pPassword, userFoundedTeacher);
      $cookies.put('currentUserActive',userFoundedTeacher.email);
    }
    function _destroyAuthCredentials(){
      var currentUser = $cookies.get('currentUserActive');
      /*var x = userService.findUsers(currentUser);
      x.logIn = false;*/
      $cookies.remove('currentUserActive');
      _redirectTo(false);
    }
    function _validateFields(pUserField, pPassField, userFound){
      if(userFound.email == pUserField && userFound.password == pPassField){
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
