(function(){
  'use strict';
  angular
  .module('app')
  .controller('consultRsvCtrl', consultRsvCtrl);
  function consultRsvCtrl($scope, $mdDialog, ticketService, eventService, $location) {
  var vm = this;
  vm.reservation = {};
  vm.myRsvs =[];

  // función que se llama así misma para indicar que sea lo primero que se ejecute
  function init() {
    vm.events = eventService.getEvents();
    vm.reservations = ticketService.getsReservations();
    }init();

  // Función para devolverse al landing
  vm.return = function(event){
      event.preventDefault();
      $location.path('/landing');
     };

  // obtiene reserva a buscar
  vm.searchRsvs = function(pClientName) {
        vm.reservations = ticketService.getsReservations();
        var error = false;
        for (var i = 0; i < vm.reservations.length; i++) {
          if (pClientName.id === vm.reservations[i].id) {
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
