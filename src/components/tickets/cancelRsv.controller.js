(function(){
  'use strict';
  angular
  .module('app')
  .controller('cancelRsvCtrl', cancelRsvCtrl);
  function cancelRsvCtrl($scope, ticketService, eventService) {
  var vm = this;
  vm.reservation = {};

    // función que se llama así misma para indicar que sea lo primero que se ejecute
    function init() { 
      vm.events = eventService.getEvents();
      vm.reservations = ticketService.getsReservations();
      }init();

    // obtiene reserva a buscar

    vm.searchRsv = function(pRsv) {
      vm.reservations = ticketService.getsReservations();
      var InfoRsv = {
        confNum : vm.rsv.confNum
      };
      
      for (var i = 0; i < vm.reservations.length; i++) {
        if (vm.reservations[i].confirmationNum === pRsv.confNum) {
          vm.rsvToCxl = vm.reservations[i];
        }
      }
      sendInfo(vm.rsvToCxl);
      clean();
    };

    function sendInfo(pRsvToCxl) {
      vm.reservation.confNum = pRsvToCxl.confirmationNum;
      vm.reservation.id = pRsvToCxl.id;
      vm.reservation.fullName = pRsvToCxl.fullName;
      vm.reservation.event = pRsvToCxl.event;
      vm.reservation.tktsQuantity = pRsvToCxl.tktsQuantity;
    }

    vm.cancelRsv = function(pCxlRsv) {
      console.log(pCxlRsv);
      vm.reservations = ticketService.getsReservations();
      for (var i = 0; i < vm.reservations.length; i++) {
        if (vm.reservations[i].confirmationNum === pCxlRsv.confNum) {
          vm.reservations[i].state = 'cancelado';
          document.querySelector('.SuccessMessage').innerHTML = 'Su reserva ha sido cancelada';
        }
      }
      ticketService.updateReservation(vm.reservations[i]);
      init();
      clean();
    };
   
  
    // Función para limpiar campos

    function clean() {
      vm.reservations = '';
      vm.rsv = '';
    }

   }
})();