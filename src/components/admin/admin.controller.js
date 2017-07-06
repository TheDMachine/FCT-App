(function(){
  'use strict';
  angular
  .module('app')
  .controller('adminCtrl', ['$scope', 'eventService', 'imageService', 'Upload', 'estabInfoService', function ($scope, eventService, imageService, Upload, estabInfoService) {
    var originatorEv;
    var vm = this;
    vm.cloudObj = imageService.getConfiguration();
    vm.events = eventService.getEvents();
    vm.weights = estabInfoService.getWeight();
    vm.categories = estabInfoService.getCategories();
    vm.acceptedEvents = [];
    $scope.selected = 0;
    

    function init() { // función que se llama así misma para indicar que sea lo primero que se ejecute
        vm.weights = estabInfoService.getWeight();
        vm.categories = estabInfoService.getCategories();
        vm.events = eventService.getEvents();
        aceptedEvents();
        vm.event = {};
      }init();
    
      /*Sidenav*/

    $scope.openMenu = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    };

    $scope.notificationsEnabled = true;
    $scope.toggleNotifications = function() {
      $scope.notificationsEnabled = !this.notificationsEnabled;
    };

    $scope.redial = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
      );

      originatorEv = null;
    };

    $scope.checkVoicemail = function() {
      // This never happens.
    };
    /*Final sidenav
    -->>*/  

    // Función para pre guardar datos del evento

    vm.presaveEvent = function(pNewEvent) {
        console.log(pNewEvent);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            pNewEvent.photo = data.url;
            vm.createNewEvent(pNewEvent);
          });
      };

    // Función para guardar

    vm.createNewEvent= function(pNewEvent) {
      console.log(pNewEvent.time1);
      if (vm.events.length == 0) {
        eventService.setEvents(pNewEvent);
        document.querySelector('.ErrorMessage').innerHTML = 'El evento se registró exitosamente';
        clean();
        init();
      }else{
        for (var i = 0; i < vm.events.length; i++) {
          if (pNewEvent.eventName == vm.events[i].eventName) {
            document.querySelector('.ErrorMessage').innerHTML = 'El evento ya existe';
          }
        }
        eventService.setEvents(pNewEvent);
        document.querySelector('.SuccessMessage').innerHTML = 'El evento se registró exitosamente';
        clean();
        init();
      }
    };

    // Función para imprimir datos en el formulario
    vm.getInfo = function(pEvent) {
      vm.event.eventName = pEvent.eventName;
      vm.event.invitedName = pEvent.invitedName;
      vm.event.eventType = pEvent.eventType;
      vm.event.eventState = pEvent.eventState;
      vm.event.photo = pEvent.photo;
      vm.event.date1 = pEvent.date1;
      vm.event.time1 = pEvent.time1;
      vm.event.date2 = pEvent.date2;
      vm.event.time2 = pEvent.time2;
      vm.event.selectAcademies = pEvent.selectAcademies;
      vm.event.selectCategories = pEvent.selectCategories;
      vm.event.costInsc = pEvent.costInsc;
      vm.event.selectSponsors = pEvent.selectSponsors;
      vm.event.placeName = pEvent.placeName;
      vm.event.location = pEvent.location;
      vm.event.latitude = pEvent.latitude;
      vm.event.length = pEvent.length;
      vm.event.seats = pEvent.seats;
      vm.event.tickets = pEvent.tickets;
      vm.event.contactName = pEvent.contactName;
      vm.event.contactPhone = pEvent.contactPhone;
      vm.event.charityEvent = pEvent.charityEvent;
      vm.event.orgName = pEvent.orgName;
      vm.event.orgType = pEvent.orgType;
      vm.event.description = pEvent.description; 
    };

    // Función para actualizar datos de evento
    vm.updateEvent = function() {
      var modEvent = {
      eventName : vm.event.eventName,
      invitedName : vm.event.invitedName,
      eventType : vm.event.eventType,
      eventState : vm.event.eventState,
      photo : vm.event.photo,
      date1 : vm.event.date1,
      time1 : vm.event.time1,
      date2 : vm.event.date2,
      time2 : vm.event.time2,
      selectAcademies : vm.event.selectAcademies,
      selectCategories : vm.event.selectCategories,
      costInsc : vm.event.costInsc,
      selectSponsors : vm.event.selectSponsors,
      placeName : vm.event.placeName,
      location : vm.event.location,
      latitude : vm.event.latitude,
      length : vm.event.length,
      seats : vm.event.seats,
      tickets : vm.event.tickets,
      contactName : vm.event.contactName,
      contactPhone : vm.event.contactPhone,
      charityEvent : vm.event.charityEvent,
      orgName : vm.event.orgName,
      orgType : vm.event.orgType,
      description : vm.event.description
      }

      
      eventService.updateEvent(modEvent);
      init();
      clean();
    };

    vm.cancelEvent = function(pEvent) {
      pEvent.eventState = 'cancelado';
      eventService.updateEvent(pEvent);
      init();
      aceptedEvents();
    };

    function aceptedEvents() {
        for (var i = 0; i < vm.events.length; i++) {
          if (vm.events[i].eventState === 'aprobado') {
            vm.acceptedEvents.push(vm.events[i]);
          }
        }
      }

    // Función para limpiar campos

    function clean() {
      vm.event='';
    }


  }]);
})();