(function(){
  'use strict';
  angular
  .module('app')
  .controller('reserveCtrl', reserveCtrl);
  function reserveCtrl($scope, eventService, ticketService, $location) {
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

    // funciones para guardar reservaciones
    vm.saveReservation = function(pReservation) {
      var newRsv = {
        event : vm.reservation.event,
        tktsQuantity : vm.reservation.tktsQuantity,
        email : vm.reservation.email,
        fullName : vm.reservation.fullName,
        id : vm.reservation.id,
        card : vm.reservation.card,
        expCard : vm.reservation.expCard,
        confirmationNum : conNum(),
        state : 'activo'
      };

      vm.availableTkts = availableTickects(newRsv);
      vm.Error = false;

      if (newRsv.tktsQuantity > vm.availableTkts) {
        vm.Error = true;
      }
      if (vm.Error === false) {
        ticketService.setReservations(newRsv);
        document.querySelector('.SuccessMessage').innerHTML = 'La confirmación de su reserva es: ' + newRsv.confirmationNum;
        clean();
        init();
      }else{
        document.querySelector('.ErrorMessage').innerHTML = 'La cantidad de entradas solicitadas excede las entradas disponibles, hay ' + vm.availableTkts + ' entradas disponibles para este evento.';
      }
    };

      // Función para generar el número de confirmación
      function conNum() {
        var a = [];
        for (var i = 97; i <= 122; i++) {
        a[a.length] = String.fromCharCode(i).toUpperCase();
        
        // crear letras random.
        var one = a[Math.floor(Math.random() * a.length)];
        var two = a[Math.floor(Math.random() * a.length)];
        var three = a[Math.floor(Math.random() * a.length)];
        var four = a[Math.floor(Math.random() * a.length)];

        // crear números random.
        var int1 = Math.floor(Math.random() * 10);
        var int2 = Math.floor(Math.random() * 10);
        var ints = int1.toFixed(0) + int2.toFixed(0);
        var intsDecimal = int1.toFixed(0) + "." + int2.toFixed(0);

        // crear variable moviendo todas las letras y números juntos.
        var confNum = one + two + three + four + ints;
        }
        return confNum;
        console.log(confNum);
    }

     function availableTickects(pNewRsv) {
      vm.events = eventService.getEvents();
      vm.reservedTkts = reservedTickects(pNewRsv);
      vm.availableTkts = 0;

      for (var i = 0; i < vm.events.length; i++) {
        if (pNewRsv.event === vm.events[i].eventName) {
          vm.availableTkts = vm.events[i].tickets - vm.reservedTkts;
        }
      }
      return vm.availableTkts;
    }

    // función para sumar los tiquetes reservados
    function reservedTickects(pNewRsv) {
      vm.reservations = ticketService.getsReservations();
      vm.reservedTkts = 0;
      vm.eventReservations = [];

      for (var i = 0; i < vm.reservations.length; i++) {
        if (pNewRsv.event === vm.reservations[i].event && vm.reservations[i].state === 'activo') {
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
      vm.reservation ='';
    }

   }
})();