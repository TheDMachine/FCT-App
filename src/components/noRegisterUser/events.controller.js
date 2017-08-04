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
      }
      NgMap.getMap().then(function(map) {
        vm.map = map;
        console.log(vm.map);
        createMarker(vm.map);
      });

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          title: "Posición actual"
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }

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

      // Función para mostrar la consulta de eventos
      vm.showEventConsult = function(pEvent, ev) {
        checkConsultEvent(pEvent);
        $mdDialog.show({
          contentElement: '#myDialog',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
        });
      };

      // funcion para salir del modal de consulta de eventos
      vm.cancel = function() {
        $mdDialog.cancel();
      };

      // función para imprimir el evento a consultar
      function checkConsultEvent(pEvent) {
       vm.consultEvent = {
        eventName: pEvent.eventName,
        invitedName: pEvent.invitedName,
        eventType: pEvent.eventType,
        eventState: pEvent.eventState,
        photo: pEvent.photo,
        date1: pEvent.date1,
        time1: pEvent.time1,
        date2: pEvent.date2,
        time2: pEvent.time2,
        selectAcademies: pEvent.selectAcademies.toString(),
        selectCategories: pEvent.selectCategories.toString(),
        costInsc: pEvent.costInsc,
        selectSponsors: pEvent.selectSponsors.toString(),
        placeName: pEvent.placeName,
        location: pEvent.location,
        latitude: pEvent.latitude,
        length: pEvent.length,
        seats: pEvent.seats,
        tickets: pEvent.tickets,
        ticketPrice: pEvent.ticketPrice,
        contactName: pEvent.contactName,
        contactPhone: pEvent.contactPhone,
        charityEvent: pEvent.charityEvent,
        orgName: pEvent.orgName,
        orgType: pEvent.orgType,
        description: pEvent.description
      }
    }
  }

     //se establece un objeto de angular normal

   })();
