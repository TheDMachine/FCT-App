(function(){
  angular
  .module('app')
  .controller('eventsCtrl', eventsCtrl);

  eventsCtrl.$inject = ['$scope', '$location', '$mdDialog','eventService', 'NgMap'];

    function eventsCtrl($scope, $location, $mdDialog, eventService, NgMap){ //se inyecta el service userService en el controlador para que se tenga acceso
      //controlador
      var vm = this; //binding del controlador con el html, solo en el controlador
      vm.today = new Date();
      vm.acceptedEvents=[];
      console.log(vm.acceptedEvents);
      vm.infowindow;
      vm.consultEvent = {};
      
      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        vm.events = eventService.getEvents();
        console.log(vm.events);
        acceptedEvents();
        vm.to = new Date();
      }init();

      // funcion p el mapa
      vm.placeChanged = function() {
        vm.place = this.getPlace();
        console.log(vm.place);
        vm.map.setCenter(vm.place.geometry.location);
        vm.map.setZoom(18);
        console.log(vm.place.name);
        console.log(vm.place.geometry);
      }
      NgMap.getMap().then(function(map) {
        vm.map = map;
        console.log(vm.map);
      });

      vm.checkInfoEvent = function(pEvent){
        for (var i = 0; i < vm.events.length; i++) {
          if (vm.events[i].eventName === pEvent) {
            vm.consultEvent = vm.events[i];
          }
        }
        // vm.event.place = vm.consultEvent.place.eventName;
      };

       // Función para devolverse al landing
       vm.return = function(event){
        event.preventDefault();
        $location.path('/landing');
      };

       // Función para filtrar la tabla de consulta de eventos
       function acceptedEvents() {
        vm.events = eventService.getEvents();
        for (var i = 0; i < vm.events.length; i++) {
          if (vm.events[i].eventState === 'aprobado') {
            vm.acceptedEvents.push(vm.events[i]);
          }
        }
      }

      // funcion para salir del modal de consulta de eventos
      vm.cancel = function() {
        $mdDialog.cancel();
      };

  }

     //se establece un objeto de angular normal

   })();
