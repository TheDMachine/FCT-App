(function(){
  'use strict';
  angular
  .module('app')
  .controller('competitorCtrl', competitorCtrl);
  function competitorCtrl($scope, AuthService, $location, $cookies, userService, $mdDialog, imageService, eventService, estabInfoService, academyServices, sponsorService, logService, $http) {
  var vm = this;
  vm.currentUser = '';

    // función que se llama así misma para indicar que sea lo primero que se ejecute
    function init() {
      vm.currentUser = userService.searchUser(userService.getCookie()); 
      vm.originatorEv = '';
      }init();

      /*Sidenav*/
    vm.openMenu = function($mdMenu, ev) {
      vm.originatorEv = ev;
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
      vm.currentUser.password =  result;
      vm.currentUser.newUser = 0;
      userService.updateUsers(vm.currentUser);
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
  };

  if(vm.currentUser.newUser == 1) {
    $scope.showPrompt();
  }

    vm.checkVoicemail = function() {
      // This never happens.
    };
    /*End sidenav functionality
    -->>*/   

    vm.logOut = function() {
      AuthService.logOut();
    }

   }
})();