(function(){
  'use strict';
  angular
  .module('app')
  .controller('competitorCtrl', competitorCtrl);
  function competitorCtrl($scope) {
  var vm = this;

    // función que se llama así misma para indicar que sea lo primero que se ejecute
    function init() {
      vm.originatorEv;
      }init();

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
    vm.updateWeigth = function(pWeigthUser) {
      userService.update(pWeigthUser);
    }
   }
})();
