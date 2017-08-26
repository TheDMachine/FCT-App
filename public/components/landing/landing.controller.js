(function(){
  angular
  .module('app')
  .controller('landingCtrl', landingCtrl);

  landingCtrl.$inject = ['$scope', '$location', '$http' , 'eventService'];

    function landingCtrl($scope, $location,$http, eventService){ //se inyecta el service userService en el controlador para que se tenga acceso
      //controlador
      var vm = this; //binding del controlador con el html, solo en el controlador
      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        eventService.getEvents().then(function(response) {
          vm.callEventsDB = response.data;
          console.log(vm.callEventsDB);
          });

      }init();

      

      vm.logIn = function(event){
        event.preventDefault();
        $location.path('/login');
      }

      vm.reserve = function(event){
        event.preventDefault();
        $location.path('/reserve');
      }

      vm.consult = function(event){
        event.preventDefault();
        $location.path('/consultRsv');
      }

      vm.cancel = function(event){
        event.preventDefault();
        $location.path('/cancelRsv');
      }

      vm.events = function(event){
        event.preventDefault();
        $location.path('/events');
      }

      // function showEvents(){
      //   for (var i = 0; i < vm.callEventsDB.length; i++) {
      //     if (vm.callEventsDB[i].eventName === 'Torneo Nacional el Cambiori' && vm.callEventsDB[i].eventName === 'Torneo de Taekwondo IV 2017' && vm.callEventsDB[i].eventName === 'Torneo Kiguty Sam') {
      //       vm.threeEvents.push(vm.callEventsDB[i]);
      //       console.log(vm.threeEvents);
      //     }
      //   }
      //   return vm.threeEvents;
      // };


    }

     //se establece un objeto de angular normal

   })();
