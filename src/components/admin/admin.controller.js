(function(){
  'use strict';
  angular
  .module('app')
<<<<<<< HEAD
  .controller('adminCtrl', adminCtrl);
  //adminCtrl.$inyector = ['eventService','imageService','Upload','userService','academyServices'];
  function adminCtrl($scope, $state, $cookies, eventService, imageService, Upload, academyServices, logService, userService, sponsorService, AuthService) {
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
    vm.imageActive = false;

    function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        vm.originatorEv;
        vm.academy = academyServices.getAcademy();
        vm.events = eventService.getEvents();
        vm.event = {};
        vm.sponsors = sponsorService.getSponsors();
        vm.teacher = {};
        vm.teachers = userService.getTeachers();
        vm.sponsor = {
          sponsorName : vm.sponsorName,
          sponsorCompany : vm.sponsorCompany,
          sponsorType : vm.sponsorType,
          sponsorMoney : vm.sponsorMoney,
          sponsorPhoto : vm.sponsorPhoto
        };
        vm.log = logService.showLog();
      }init();

    vm.openMenu = function($mdMenu, ev) {
     vm.originatorEv = ev;
      $mdMenu.open(ev);
    };

    vm.notificationsEnabled = true;
    vm.toggleNotifications = function() {
      vm.notificationsEnabled = !this.notificationsEnabled;
    };

    vm.redial = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(vm.originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
      );

      vm.originatorEv = null;
    };

    vm.checkVoicemail = function() {
      // This never happens.
    };
    /*Final sidenav*/

    // Función para pre guardar datos del evento

    vm.presaveEvent = function(pNewEvent){
        console.log(pNewEvent);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            pNewEvent.photo = data.url;
            vm.createNewEvent(pNewEvent);
          });
      }

// Función para guardar
    vm.createNewEvent= function(pNewEvent){
      eventService.setEvents(pNewEvent);
      vm.error = false;
      if (vm.error === true) {
        document.querySelector('.ErrorMessage').innerHTML = 'El evento ya existe';
        }else{
        document.querySelector('.SuccessMessage').innerHTML = 'El evento se registró exitosamente';
      }
      console.log(eventService.getEvents());
      clean();
      init();
      }

      // Funciones para guardar patrocinadores

    vm.saveSponsor= function(pNewSponsor){
      sponsorService.setSponsors(pNewSponsor);
      vm.error = false;
      /*if (vm.error === true) {
        document.querySelector('.ErrorMessage').innerHTML = 'El evento ya existe';
        }else{
        document.querySelector('.SuccessMessage').innerHTML = 'El evento se registró exitosamente';
      }*/
      console.log(sponsorService.getSponsors());
      clean();
      init();
      }

      vm.presaveSponsor = function(pNewSponsor){
        /*vm.cloudObj.data.file = document.getElementById("photoSponsor").files[0];
        Upload.upload(vm.cloudObj)
        .success(function(data){
        pNewSponsor.sponsorPhoto = vm.data.url;
         });*/
         vm.saveSponsor(pNewSponsor);
      }
      // vm.error = false;
      vm.preSaveConsul = function(pNewConsult){
        console.log(pNewConsult);
       vm.cloudObj.data.file = document.getElementById("photo").files[0];
       Upload.upload(vm.cloudObj)
         .success(function(data){
           pNewConsult.photo = data.url;
            vm.createNewConsult(pNewConsult);
        });
        }

          // Función para imprimir datos en el formulario de patrocinadores
    vm.getSponsorInfo = function(pSponsor){
      vm.sponsor.sponsorName = pSponsor.sponsorName,
      vm.sponsor.sponsorCompany = pSponsor.sponsorCompany,
      vm.sponsor.sponsorType = pSponsor.sponsorType,
      vm.sponsor.sponsorMoney = pSponsor.sponsorMoney,
      vm.sponsor.sponsorDescription = pSponsor.sponsorDescription

      vm.selected = 5;
      vm.imageActive = true;


      $scope.updateDisable = false;
      $scope.submitDisable = true;
    }

    vm.updateSponsor = function(){
      var modSponsor = {
      sponsorName : vm.sponsor.sponsorName,
      sponsorCompany : vm.sponsor.sponsorCompany,
      sponsorType : vm.sponsor.sponsorType,
      sponsorMoney : vm.sponsor.sponsorMoney,
      sponsorDescription : vm.sponsor.sponsorDescription,
      }

      $scope.submitDisable = false;
      $scope.updateDisable = true;
      sponsorService.updateSponsor(modSponsor);
      init();
      clean();
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
    vm.updateEvent = function(){
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
      console.log("El objeto con imagen es %o",pNewConsul);
      console.log("Gracias, ha sido creado un nuevo represetante de consejo %o",pNewConsul);
      var bFlag = userService.createConsul(pNewConsul);
      var temDataZero = $cookies.get('currentUserActive');
      if(bFlag == false){
        document.getElementById('errorConsul').innerHTML = 'El represetante de consejo ya existe';
        $state.go('admin.partOne');
        var tempDataOne = 'fallo al crear a '+pNewConsul.firstName;
        logService.createLog(false,temDataZero,tempDataOne);
      }else{
        var tempDataOne = 'Creado con exito '+pNewConsul.firstName;
        logService.createLog(0,temDataZero,tempDataOne);
        document.getElementById('feedbackMesage').innerHTML = 'El represesante ha sido creado exitoxamente';
      }
    }

    // Función para pre guardar datos del profesor

    vm.presaveTeacher = function(pNewTeacher){
        console.log(pNewTeacher);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            pNewTeacher.photo = data.url;
            vm.createNewTeacher(pNewTeacher);
          });
      }

    // Función para guardar profesores

    vm.createNewTeacher = function(pNewTeacher){
      userService.setTeachers(pNewTeacher);
     

      clean();
      init();
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
     }
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

    vm.logOut = function(){
      AuthService.logOut();
    }
  }
})();
