angular.module('app')
  .controller('adminCtrl', ['$scope','logService', function ($scope,logService) {
    var vm = this;
    $scope.user = {};
    vm.log = {};
    vm.stepOneConsult = true;
    vm.stepTwoConsult = false;
    vm.stepThreeConsult = false;
  	var originatorEv;
    $scope.selected = 0;
    function init(){
      vm.log = logService.showLog();
    }init();
	  	/*Sidenav*/

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
    vm.save = function(pNewConsultUser){
      logService.createLog(0,'Administrador','user Adrian');
      console.log("El usuario regristado es %o",pNewConsultUser);
    }
}]);
