(function(){
  'use strict';
  angular
  .module('app')
  .controller('reserveCtrl', reserveCtrl);
  function reserveCtrl($scope, eventService, ticketService) {
  var vm = this;
  vm.reservation = {};

    // función que se llama así misma para indicar que sea lo primero que se ejecute
    function init() { 
      vm.events = eventService.getEvents();
      vm.reservations = ticketService.getsReservations();
      }init();

    // funciones para guardar reservaciones

    vm.presaveReservation = function(pReservation) {
         console.log(pReservation);
         vm.saveReservation(pReservation);
      };


    vm.saveReservation = function(pReservation) {
      vm.availableTkts = availableTickects(pReservation);
      vm.Error = false;

      if (pReservation.tktsQuantity > vm.availableTkts) {
        vm.Error = true;
      }
      if (vm.Error === false) {
        ticketService.setReservations(pReservation);
        document.querySelector('.SuccessMessage').innerHTML = 'La reservación ha sido enviada exitosamente';
        clean();
        init();
      }else{
        document.querySelector('.ErrorMessage').innerHTML = 'No se puede reservar, la cantidad de entradas solicitadas excede las entradas disponibles';
      }
    };

     function availableTickects(pReservation) {
      vm.events = eventService.getEvents();
      vm.reservedTkts = reservedTickects(pReservation);
      vm.availableTkts = 0;

      for (var i = 0; i < vm.events.length; i++) {
        if (pReservation.event === vm.events[i].eventName) {
          vm.availableTkts = vm.events[i].tickets - vm.reservedTkts;
        }
      }
      return vm.availableTkts;
    }

    // función para sumar los tiquetes reservados
    function reservedTickects(pReservation) {
      vm.reservations = ticketService.getsReservations();
      vm.reservedTkts = 0;
      vm.eventReservations = [];

      for (var i = 0; i < vm.reservations.length; i++) {
        if (pReservation.event === vm.reservations[i].event) {
          vm.eventReservations.push(vm.reservations[i]);
        }
      }

      if (vm.eventReservations.length == 0) {
        vm.reservedTkts = 0;
      }else{
        for (var i = 0; i < vm.eventReservations.length; i++) {
          vm.reservedTkts +=  vm.eventReservations[i].tktsQuantity;
        }
      }
      return vm.reservedTkts;
    }
  
   

    // Función para limpiar campos

    function clean() {
      vm.reservations='';
    }

    

   }
})();