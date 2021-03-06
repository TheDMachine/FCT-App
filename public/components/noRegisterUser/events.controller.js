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
      vm.openCard = false;
      
      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        eventService.getEvents().then(function(response) {
          vm.events = response.data;
        });
        acceptedEvents();
        vm.to = new Date();
      }init();

      // funcion p el mapa
      vm.placeChanged = function(pPlace) {
        pPlace = this.getPlace();
        console.log(vm.place);
        vm.map.setCenter(pPlace.coords);
        vm.map.setZoom(18);
        console.log(pPlace.name);
        console.log(pPlace.geometry);
      }
      NgMap.getMap().then(function(map) {
        vm.map = map;
        console.log(vm.map);
      });

      vm.checkInfoEvent = function(pEvent){
        vm.openCard = true;
        for (var i = 0; i < vm.events.length; i++) {
          if (vm.events[i].eventName === pEvent) {
            vm.consultEvent = vm.events[i];
          }
        }     
        vm.placeChanged(vm.consultEvent); 
      };

       // Función para devolverse al landing
       vm.return = function(event){
        event.preventDefault();
        $location.path('/landing');
        vm.openCard = false;
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
