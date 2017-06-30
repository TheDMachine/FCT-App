(function(){
  'use strict';
  angular
  .module('app')
  .controller('adminCtrl',['$scope','academyServices', function ($scope, academyServices) {
  	var originatorEv;
    var vm = this;
    $scope.selected = 0;

	  /*Inicio Sidenav*/

    $scope.openMenu = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    };

    $scope.notificationsEnabled = true;
    $scope.toggleNotifications = function() {
      $scope.notificationsEnabled = !this.notificationsEnabled;
    };

    $scope.redial = function() {
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

    $scope.checkVoicemail = function() {
      // This never happens.
    };
    /*Final sidenav
    -->>*/
    function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        vm.academy = academyServices.getAcademy();
      }init();

     vm.save = function(){
       var newAcademy = {
         name: vm.name,
         address: vm.address,
         manager: vm.manager,
         competitors: vm.competitors,
         phone: vm.phone,
         email: vm.email
       };
       console.log(newAcademy);
       academyServices.setAcademy(newAcademy);
       clean();
       init();
     };

    function clean(){
      vm.name = '',
      vm.address = '',
      vm.manager = '',
      vm.competitors = '',
      vm.phone = '',
      vm.email = ''
    }
}]);
})();
