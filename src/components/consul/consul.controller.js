(function(){
  'use strict';
  angular
  .module('app')
  .controller('consulCtrl', consulCtrl);
  function consulCtrl($scope, eventService) {
	  	/*Sidenav functionality*/
 	var originatorEv;
  var vm = this;

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
    vm.presavePropose = function(pNewPropose){
        console.log(pNewPropose);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            pNewPropose.photo = data.url;
            vm.createNewPropose(pNewPropose);
          });
      }

// Función para guardar
    vm.createNewPropose= function(pNewPropose){
      eventService.setPropose(pNewPropose);
      vm.error = false;
      if (vm.error === true) {
        document.querySelector('.ErrorMessage').innerHTML = 'El evento ya existe';
        }else{
        document.querySelector('.SuccessMessage').innerHTML = 'El evento se registró exitosamente';
      }
      console.log(eventService.getPropose());
      clean();
      init();
      }
    }
})();
