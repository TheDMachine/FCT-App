(function(){
  'use strict';
  angular
  .module('app')
  .controller('teacherCtrl', teacherCtrl);

  function teacherCtrl ($scope, AuthService, $location, $cookies, userService, $mdDialog) {
  	/*Sidenav functionality*/
 	var originatorEv;
  var vm = this;
  vm.newPassword = false;
  vm.currentUser = '';
  vm.selected = 0;

  function init() {
    vm.currentUser = userService.findUserTeacher(userService.getCookie());
    console.log(vm.currentUser);
  }init();

    $scope.showPrompt = function() {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('Bienvenido ' + vm.currentUser.email + '!')
      .textContent('Modifica tu contraseña temporal')
      .placeholder('Nueva contraseña')
      .ariaLabel('New password')
      .initialValue('')
      .targetEvent()
      .ok('Cambiar')
      .cancel('');

    $mdDialog.show(confirm).then(function(result) {
      $scope.status =  result;
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
  };

  if(vm.currentUser.newUser == 1) {
    $scope.showPrompt();
  }

    // función que se llama así misma para indicar que sea lo primero que se ejecute

      /*Sidenav*/
    vm.openMenu = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    };

    vm.notificationsEnabled = true;
    vm.toggleNotifications = function() {
      vm.notificationsEnabled = !this.notificationsEnabled;
    };

    vm.redial = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
      );

      originatorEv = null;
    };

    vm.checkVoicemail = function() {
      // This never happens.
    };
    /*End sidenav functionality
    -->>*/

    vm.logOut = function() {
      AuthService.logOut();
    }
  };
})();
