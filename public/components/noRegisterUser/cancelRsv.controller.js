(function(){
  'use strict';
  angular
  .module('app')
  .controller('cancelRsvCtrl', cancelRsvCtrl);
  function cancelRsvCtrl($scope, ticketService, eventService, $location, $mdDialog) {
  var vm = this;
  vm.reservation = {};

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
    vm.searchRsv = function(pRsv) {
      vm.reservations = ticketService.getsReservations();
      var bError =  false;
      for (var i = 0; i < vm.reservations.length; i++) {
        if (vm.reservations[i].confirmationNum === pRsv.confNum) {
          vm.rsvToCxl = vm.reservations[i];
          bError = true;
          cleanRsv();
        }
      }
      if (bError === false) {
        vm.showErrorCxlAlert();
        cleanRsv();
      }
      sendInfo(vm.rsvToCxl);
    };

    // Devueñve la información de la reserva a cancelar
    function sendInfo(pRsvToCxl) {
      vm.reservation.confNum = pRsvToCxl.confirmationNum;
      vm.reservation.ced = pRsvToCxl.ced;
      vm.reservation.fullName = pRsvToCxl.fullName;
      vm.reservation.event = pRsvToCxl.event;
      vm.reservation.tktsQuantity = pRsvToCxl.tktsQuantity;
    }

    // Cambia el estado de la reserva a cancelada
    vm.cancelRsv = function(pCxlRsv) {
      console.log(pCxlRsv);
      vm.reservations = ticketService.getsReservations();
      for (var i = 0; i < vm.reservations.length; i++) {
        if (vm.reservations[i].confirmationNum === pCxlRsv.confNum) {
          vm.reservations[i].state = 'cancelado';
          vm.showCxlSuccessAlert();
          ticketService.updateReservation(vm.reservations[i]);
          init();
          clean();
        }
      }
    };

    // Función para mensaje cancelacion de reserva satisfactoria
    vm.showCxlSuccessAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('¡Cancelación exitosa!')
        .textContent('La reservación bajo su nombre fue cancelada.')
        .ariaLabel()
        .ok('Gracias!')
        .targetEvent()
    );
  };

  // Función para mensaje de que reserva a cancelar no existe
    vm.showErrorCxlAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('¡No existe ese número de reservación!')
        .textContent('Por favor ingrese nuevamente el número de reserva que desea cancelar.')
        .ariaLabel()
        .ok('Gracias!')
        .targetEvent()
    );
  };
   
    // Función para limpiar campos
    function cleanRsv() {
      vm.rsv = '';
      
    }
  
    // Función para limpiar campos
    function clean() {
      vm.reservation.confNum = '';
      vm.reservation.ced = '';
      vm.reservation.fullName = '';
      vm.reservation.event = '';
      vm.reservation.tktsQuantity = '';
    }

   }
})();
