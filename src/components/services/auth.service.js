(function() {
  angular.module('app')
  .service('AuthService',AuthService);
  function AuthService($cookies,$location){
    return {
      getCredencials:_getAuthCredencials,
      logOut : _destroyAuthCredentials
    }
    function _getAuthCredencials(pEmail,pPassword){
      var user = 
        { 'email' : 'luisbianco28@hotmail.com',
          'password' : '123',
          'userType' : 'Profesor'
        };
      //console.log("Yass work correctly auth service. The user is %s and the password is %s",pUsername,pPassword);
      var userFounded = user;
      if(userFounded.length == 0){
        $location.path('/');
      }
      _validateFields(pEmail, pPassword, userFounded);
      $cookies.put('currentUserActive',userFounded.userName);
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
        default:
          $location.path('/');
          break;

      }
    }
  }
}());
