(function(){
  'use strict';
  angular
  .module('app')
  .controller('consultRsvCtrl', consultRsvCtrl);
  function consultRsvCtrl($scope, ticketService, eventService, $location) {
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
    var informationRsv = {
      idRsv : vm.rsv.id
    };

    for (var i = 0; i < vm.reservations.length; i++) {
      if (vm.reservations[i].id === pRsv.id) {
        vm.rsvToCxl = vm.reservations[i];
      }else{
        document.querySelector('.errorMessage').innerHTML = 'No existen reservas';
      }
    }
    sendInfo(vm.rsvToCxl);
  };

  // Devuelve la informacion de la reserva consultada
  function sendInfo(pRsvToCxl) {
    vm.reservation.confNum = pRsvToCxl.confirmationNum;
    vm.reservation.id = pRsvToCxl.id;
    vm.reservation.fullName = pRsvToCxl.fullName;
    vm.reservation.event = pRsvToCxl.event;
    vm.reservation.tktsQuantity = pRsvToCxl.tktsQuantity;
  }

 }
})();
