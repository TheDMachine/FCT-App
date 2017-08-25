(function(){
  'use strict';
  angular
  .module('app')
  .controller('consultRsvCtrl', consultRsvCtrl);
  function consultRsvCtrl($scope, $mdDialog, ticketService, eventService, $location) {
  var vm = this;
  vm.reservation = {};
  vm.myRsvs =[];
  console.log(vm.myRsvs);

  // función que se llama así misma para indicar que sea lo primero que se ejecute
  function init() {
    eventService.getEvents().then(function(response) {
        vm.events = response.data;
      });
    ticketService.getsReservations().then(function(response) {
        vm.reservations = response.data;
      });
    }init();

  // Función para devolverse al landing
  vm.return = function(event){
      event.preventDefault();
      $location.path('/landing');
     };

  // obtiene reserva a buscar
  vm.searchRsvs = function(pClientName) {
    ticketService.getsReservations().then(function(response) {
        vm.reservations = response.data;
      });
        var error = false;
        for (var i = 0; i < vm.reservations.length; i++) {
          if (pClientName.ced === vm.reservations[i].ced) {
            vm.myRsvs.push(vm.reservations[i]);
            error = true;
          }
        }

        if(error === false){
            vm.showNoExistReservationAlert();
        }
        return vm.myRsvs;
      }






  vm.showNoExistReservationAlert = function() {
  // Appending dialog to document.body to cover sidenav in docs app
  // Modal dialogs should fully cover application
  // to prevent interaction outside of dialog
  $mdDialog.show(
    $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('Sin Reservas')
      .textContent('No existen reservas para la cédula suministrada')
      .ariaLabel()
      .ok('¡Gracias!')
      .targetEvent()
  );
};
 }
})();
