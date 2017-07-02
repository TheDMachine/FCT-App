(function(){
  'use strict';
  angular
  .module('app')
  .controller('adminCtrl', adminCtrl);
//adminCtrl.$inyector = [Upload, eventService, userService, imageService, logService, academyServices];
  function adminCtrl($scope, $state, Upload, eventService, userService, imageService, logService, academyServices) {
    var originatorEv;
    var vm = this;
    vm.cloudObj = imageService.getConfiguration();
    vm.selected = 0;
    vm.updateDisable = true;
    vm.submitDisable = false;
    vm.stepTwoConsult = false;
    vm.stepThreeConsult = false;
    vm.stepOneConsult = true;
    vm.user = {};
    vm.log = {};
    function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        vm.academy = academyServices.getAcademy();
        vm.events = eventService.getEvents();
        vm.event = {};
        vm.log = logService.showLog();
      }init();
    vm.openMenu = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    };

    vm.notificationsEnabled = true;
    vm.toggleNotifications = function() {
      vm.notificationsEnabled = !this.notificationsEnabled;
    };

    vm.redial = function() {
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

    vm.checkVoicemail = function() {
      // This never happens.
    };
    /*Final sidenav
    -->>*/

    // Función para pre guardar datos del evento

      vm.preSaveConsult = function(pNewConsult){
        console.log(pNewConsult);
        vm.cloudObj.data.file = document.querySelector("#photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            pNewConsult.photo = data.url;
            vm.createNewConsult(pNewConsult);
          });
        }
    // Función para guardar

    vm.save= function(pNewEvent){
      // vm.error = eventService.setEvents(pNewEvent);
      // if (vm.error === true) {
      //   document.querySelector('.ErrorMessage').innerHTML = 'El evento ya existe';
      //   }else{
      //   document.querySelector('.SuccessMessage').innerHTML = 'El evento se registró exitosamente';
      // }

      clean();
      init();
      }

    // Función para imprimir datos en el formulario
    vm.getInfo = function(pEvent){
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
      vm.event.orgType = pEvent.orgType;
      vm.event.orgName = pEvent.orgName;
      vm.event.description = pEvent.description;

      vm.updateDisable = false;
      vm.submitDisable = true;
    }

    // Función para actualizar datos de evento
    vm.update = function(){
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

      vm.submitDisable = false;
      vm.updateDisable = true;
      eventService.updateEvent(modEvent);
      init();
      clean();
    }
    vm.createNewConsult = function(pNewConsul){
      //var rawImg =  document.getElementById("photo").files[0];
      console.log("El objeto con imagen es %o",pNewConsul);
      //userService.newcONSULT(ObjWithImg);
      console.log("Gracias, ha sido creado un nuevo represetante de consejo %o",pNewConsul);
      var bFlag = userService.createNewConsult(pNewConsul);
      if(bFlag == false){
        document.getElementById('errorConsul').innerHTML = 'El represetante de consejo ya existe';
        $state.go(admin.partOne);
      }else{
        document.getElementById('feedbackMesage').innerHTML = 'El represesante ha sido creado exitoxamente';
      }
    }
    // Función para limpiar campos

    function clean(){
      vm.event='';
    };
      //funcion para guardar informacuon de academia
     vm.createNewAcademy = function(){
       var newAcademy = {
         name: vm.name,
         address: vm.address,
         manager: vm.manager,
         competitors: vm.competitors,
         phone: vm.phone,
         email: vm.email
       };
       console.log(newAcademy);
       academyServices.setAcademy(newAcademy);
       cleanAcademy();
       init();
     };
    //funcion para limpiar los input  de academia
    function cleanAcademy(){
      vm.name = '',
      vm.address = '',
      vm.manager = '',
      vm.competitors = '',
      vm.phone = '',
      vm.email = ''
    }
    //funcion para editar academia
    vm.getAcademy = function(academy){
      vm.name = academy.name;
      vm.address = academy.address;
      vm.manager = academy.manager;
      vm.competitors = academy.competitors;
      vm.phone = academy.phone;
      vm.email =academy.email;
    }
    //funcion para guardar la academia editada
    vm.updateAcademy = function(){
      var editAcademy = {
        name: vm.name,
        address: vm.address,
        manager: vm.manager,
        competitors: vm.competitors,
        phone: vm.phone,
        email: vm.email
      }
      academyServices.updateAcademy(editAcademy);
      init();
      cleanAcademy();
    }
};
})();
