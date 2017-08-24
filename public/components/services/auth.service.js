(function() {
  angular.module('app')
  .service('AuthService',AuthService);
  function AuthService($cookies,$location, userService, $http){
    return {
      getCredencials:_getAuthCredencials,
      logOut : _destroyAuthCredentials,
      getCookie : _getCookie,
      recoverPassword : _recoverPassword
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

    function _recoverPassword(userId){
      var recoveredPassword = _generatePassword();
      var recover = {"id" : userId, "password" : recoveredPassword};
      $http.put('http://localhost:3000/api/recover_password', recover)
      .then(function(response){
        $http.put('http://localhost:3000/api/update_teacher', response.data)
        .then(function(response){
          console.log(response);
        })
        .catch(function(response){
          console.log(response);
        })
        return;
        console.log(response);
      })
      .catch(function(err){
        return;
        console.log(err);
      })
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

    function _generatePassword() {
     var a = [];
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
        return c;
      }

   function _getCookie(){
    return $cookies.get('currentUserActive');
   }
  }
}());
