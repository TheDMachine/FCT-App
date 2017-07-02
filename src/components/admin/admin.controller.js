(function(){
  'use strict';
  angular
  .module('app')
  .controller('adminCtrl', ['$scope', 'eventService', 'imageService', function ($scope, eventService, imageService) {
    var originatorEv;
    var vm = this;
    vm.cloudObj = imageService.getConfiguration();
    $scope.selected = 0;

    function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        vm.events = eventService.getEvents();
        vm.event = {};
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

    // Función para pre guardar datos del evento

    vm.presave= function(pNewEvent){
      vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            pNewEvent.photo = data.url;
            vm.save(pNewEvent);
          });
      }

      $scope.$watch('files.length',function(newVal,oldVal){
    console.log($scope.files);
});

    // Función para guardar

    vm.save= function(pNewEvent){
        eventService.setEvents(pNewEvent);
        limpiar();
        init();
      }

    // Función para limpiar campos

    function limpiar(){
      vm.event={}
    }



  }]);
})();