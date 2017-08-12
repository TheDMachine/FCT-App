(function() {
  'use strict'
  angular
  .module('app')
  .controller('adminCtrl', adminCtrl);

  adminCtrl.$inject = ['$scope', '$mdDialog', '$http', '$state', '$cookies','$location', 'eventService', 'imageService', 'Upload', 'academyServices', 'logService', 'userService', 'sponsorService', 'AuthService', 'estabInfoService', 'ticketService', 'settingsService'];

  function adminCtrl($scope, $mdDialog, $http, $state, $cookies, $location, eventService, imageService, Upload, academyServices, logService, userService, sponsorService, AuthService, estabInfoService,ticketService, settingsService) {

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
    vm.cloudObj = imageService.getConfiguration();
    vm.weights = estabInfoService.getWeight();
    vm.categories = estabInfoService.getCategories();
    vm.acceptedEvents = [];
    vm.updateDisable = true;
    vm.nameSponsorEdit = false;
    vm.showCompetition = false;
    vm.competitionsToShow = [];
    vm.fights = [];
    vm.pairFights = [];
    vm.ready = false;
    vm.today = new Date();
    vm.consultEvent = {};
    vm.customFullscreen = false;

    

    function init(){
    // función que se llama así misma para indicar que sea lo primero que se ejecute
        // Inicio Daniel
        vm.stt = settingsService.getSettings();
        vm.editMem = {};
        vm.modDisplay = false;
        vm.isEdit = false;
        vm.isNew = false;
        // Fin Daniel
        vm.currentUser = userService.searchAdmin(userService.getCookie());
        console.log(vm.currentUser);
        vm.originatorEv;
        vm.academy = academyServices.getAcademy();
        vm.weights = estabInfoService.getWeight();
        vm.events = eventService.getEvents();
        console.log(vm.events);
        vm.competitions = eventService.getCompetitions();
        acceptedEvents();
        vm.event = {};
        sponsorService.getSponsors().then(function(response) {
          vm.sponsors = response.data;
        });
        console.log(vm.sponsors);
        vm.teacher = {};
        vm.teachers = userService.getTeachers();
        vm.sponsor = {};
        vm.users = userService.getUsers();
        vm.log = logService.showLog();
        vm.belts = estabInfoService.getBelts();
        vm.to = new Date();
        console.log(vm.to);
        vm.to2 = new Date();
        vm.weights = estabInfoService.getWeight();
        vm.categoriesAge = estabInfoService.getCategories();
        estabInfoService.getCountries().then(function (data) {vm.countries = data.data.countries;});
        vm.teacher.status = "Activo";
        vm.userActive = false;
        vm.reservations = ticketService.getsReservations();
        vm.status = "Activo"
      }init();

    /*Sidenav*/
    vm.openMenu = function ($mdMenu, ev) {
      vm.originatorEv = ev;
      $mdMenu.open(ev);
    };

    vm.notificationsEnabled = true;
    vm.toggleNotifications = function () {
      vm.notificationsEnabled = !this.notificationsEnabled;
    };

    vm.redial = function () {
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

    vm.checkVoicemail = function () {
      // This never happens.
    };
    /*Final sidenav
    -->>*/

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

    //Alertas de Registro de alumnos
  vm.studentAlert = function() {
  // Appending dialog to document.body to cover sidenav in docs app
  // Modal dialogs should fully cover application
  // to prevent interaction outside of dialog
  $mdDialog.show(
    $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('Registo correcto')
      .textContent('¡Registro de alumno realizado!')
      .ariaLabel()
      .ok('¡Gracias!')
      .targetEvent()
    );
  };

  //cambiar estado del usuario
    vm.state = function(user) {
      if (user.status == 'activo' ) {
        user.status = 'inactivo';
        userService.updateUsers(user);
        userService.updateTeacher(user)
        vm.stateInactive(user);
        init();
      }else {
        user.status = 'activo';
        userService.updateUsers(user);
        userService.updateTeacher(user)
        vm.stateActive(user);
        init();
      }
    }

  //mensaje de inactivar
    vm.stateInactive = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Control de usuarios')
          .textContent('El usuario ha sido inactivado')
          .ariaLabel()
          .ok('Aceptar')
          .targetEvent()
      );
    }

    //mensaje de activar
    vm.stateActive = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Control de usuarios')
          .textContent('El usuario ha sido activado')
          .ariaLabel()
          .ok('Aceptar')
          .targetEvent()
      );
    }
  //Alertas de Registro de academias
  vm.academyAlert = function() {
  // Appending dialog to document.body to cover sidenav in docs app
  // Modal dialogs should fully cover application
  // to prevent interaction outside of dialog
  $mdDialog.show(
    $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('Registo correcto')
      .textContent('¡Registro de academia realizado')
      .ariaLabel()
      .ok('¡Gracias!')
      .targetEvent()
    );
  };

  vm.academyDuplicateAlert = function() {
  // Appending dialog to document.body to cover sidenav in docs app
  // Modal dialogs should fully cover application
  // to prevent interaction outside of dialog
  $mdDialog.show(
    $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('La academia ya existe')
      .textContent('La academia ya existe, registre otra')
      .ariaLabel()
      .ok('¡Gracias!')
      .targetEvent()
    );
  };

  vm.studentDuplicateAlert = function() {
  // Appending dialog to document.body to cover sidenav in docs app
  // Modal dialogs should fully cover application
  // to prevent interaction outside of dialog
  $mdDialog.show(
    $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('Alumno ya existe')
      .textContent('El alumno ya existe, registre otro')
      .ariaLabel()
      .ok('¡Gracias!')
      .targetEvent()
    );
  };

    // funcion para salir del modal de consulta de eventos
    vm.cancel = function() {
      $mdDialog.cancel();
    };

    vm.showAlertEditParams= function(pMessage, pFeedback) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title(pFeedback)
          .textContent(pMessage)
          .ariaLabel()
          .ok('Gracias!')
          .targetEvent()
      );
    };
    vm.editParam= function(pParamToEdit) {
      vm.showPrompt(pParamToEdit);
    }

    vm.showPrompt = function(pParamToEdit) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('!Actualización de parametro del sistema!')
      .textContent('Actualizando de ' +pParamToEdit)
      .placeholder('Escribe la nueva dirreción')
      .ariaLabel(pParamToEdit)
      .ok('Actualizar')
      .cancel('Cancelar');

    $mdDialog.show(confirm).then(function(result) {
      //settingsService.e
      console.log(result);
      settingsService.editParamToSystem(pParamToEdit, result);
      init();
    }, function() {
      vm.status = 'You didn\'t name your dog.';
    });
  }

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

    // Función para pre guardar datos del evento

    vm.presaveEvent = function (pNewEvent) {
      console.log(pNewEvent);
      vm.cloudObj.data.file = document.getElementById("photo").files[0];
      Upload.upload(vm.cloudObj)
        .success(function (data) {
          pNewEvent.photo = data.url;
          vm.createNewEvent(pNewEvent);
        });
    };

    // Función para guardar
    vm.createNewEvent = function (pNewEvent) {
      var bError = false;
      var newEvent = pNewEvent;
      // newEvent.map = createMap(newEvent.latitude, newEvent.length);
      // console.log(newEvent);

      if (vm.events.length == 0) {
        eventService.setEvents(newEvent);
        vm.showEventAlert();
        clean();
        init();
      } else {
        for (var i = 0; i < vm.events.length; i++) {
          if (newEvent.eventName == vm.events[i].eventName) {
            bError = true;
          }
        }
        if (bError == false) {
          eventService.setEvents(newEvent);
          vm.showEventAlert();
          clean();
          init();
        } else {
          vm.showEventDuplicateAlert();
        }
      }
    };
      // Funciones para guardar patrocinadores

    // Función para crear mapa
    // function createMap(pLat, pLeng) {

    // }

    // Función para mensaje de registro de evento satisfactorio
    vm.showEventAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('¡Registro exitoso!')
        .textContent('¡El evento se registró correctamente!')
        .ariaLabel()
        .ok('¡Gracias!')
        .targetEvent()
    );
  };

    // Función para mensaje de evento duplicado
    vm.showEventDuplicateAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('¡El Evento ya existe!')
        .textContent('Por favor ingrese otro')
        .ariaLabel()
        .ok('¡Gracias!')
        .targetEvent()
    );
  };

      // Funciones para guardar patrocinadores

    vm.saveSponsor= function(pNewSponsor) {
      if(sponsorService.findSponsor(pNewSponsor.sponsorName) !== false){
        vm.showSponsorDuplicateAlert();
      }
      else{
        sponsorService.setSponsors(pNewSponsor)
        .then(function(response){
          var responseObj = response;
          console.log(response);
          sponsorService.getSponsors().then(function(response) {
            vm.sponsors = response.data;
          });
        }).catch(function(err){
          console.log(err);
        });
        vm.showSponsorAlert();
      }
      vm.error = false;
      /*if (vm.error === true) {
        document.querySelector('.ErrorMessage').innerHTML = 'El patrocinador ya existe';
        }else{
        document.querySelector('.SuccessMessage').innerHTML = 'El patrocinador se registró exitosamente';
      }*/
      clean();
      init();

      }
      // Función para guardar

    vm.presaveSponsor = function (pNewSponsor) {
        console.log(pNewSponsor);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function (data) {
            pNewSponsor.photo = data.url;
            vm.saveSponsor(pNewSponsor);
          });
      }
      // vm.error = false;
    vm.preSaveConsul = function (pNewConsult) {
      console.log(pNewConsult);
      vm.cloudObj.data.file = document.getElementById("photo").files[0];
      Upload.upload(vm.cloudObj)
        .success(function (data) {
          pNewConsult.photo = data.url;
          vm.createNewConsult(pNewConsult);
        });
    }

    // Función para imprimir datos en el formulario de patrocinadores
    vm.getSponsorInfo = function(pSponsor) {
      vm.sponsor.id = pSponsor._id,
      vm.sponsor.sponsorName = pSponsor.sponsorName,
      vm.sponsor.sponsorCompany = pSponsor.sponsorCompany,
      vm.sponsor.sponsorType = pSponsor.sponsorType,
      vm.sponsor.sponsorMoney = pSponsor.sponsorMoney,
      vm.sponsor.description = pSponsor.description,
      vm.sponsor.photo = pSponsor.photo

      vm.selected = 2;
      vm.imageActive = true;
      vm.nameSponsorEdit = true;


      vm.updateDisable = false;
      vm.submitDisable = true;
    }

    vm.updateSponsor = function () {
      var modSponsor = {
      _id : vm.sponsor.id,
      sponsorName : vm.sponsor.sponsorName,
      sponsorCompany : vm.sponsor.sponsorCompany,
      sponsorType : vm.sponsor.sponsorType,
      sponsorMoney : vm.sponsor.sponsorMoney,
      description : vm.sponsor.description,
      photo : vm.sponsor.photo
      }

      vm.submitDisable = false;
      vm.updateDisable = true;
      sponsorService.updateSponsor(modSponsor)
      .then(function(response){
        console.log(response);
        sponsorService.getSponsors().then(function(response) {
          vm.sponsors = response.data;
        });
      })
      .catch(function(err){
        console.log(err);
      })
      init();
      clean();
    }

    vm.showSponsorAlert = function() {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('¡Registro correcto!')
        .textContent('¡Registro de patrocinador correcto!')
        .ariaLabel()
        .ok('Gracias!')
        .targetEvent()
    );
  };

  vm.showEventAlert = function() {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('¡Registro correcto!')
        .textContent('¡Registro de evento correcto!')
        .ariaLabel()
        .ok('¡Gracias!')
        .targetEvent()
    );
  };

    vm.showProfesorAlert = function() {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('¡Registro correcto!')
        .textContent('¡Registro de profesor correcto!')
        .ariaLabel()
        .ok('¡Gracias!')
        .targetEvent()
    );
  };

    vm.showProfesorDuplicateAlert = function() {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Profesor ya existe')
        .textContent('El profesor ya existe, porfavor ingrese otro')
        .ariaLabel()
        .ok('¡Gracias!')
        .targetEvent()
    );
  };

    vm.showSponsorDuplicateAlert = function() {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Patrocinador ya existe')
        .textContent('El patrocinador ya existe, porfavor ingrese otro')
        .ariaLabel()
        .ok('¡Gracias!')
        .targetEvent()
    );
  };

  //Modald para cargar el Modald
  vm.showConsulAlert = function(pMessage, pFeedback) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(pFeedback)
        .textContent(pMessage)
        .ariaLabel()
        .ok('Gracias!')
        .targetEvent()
    );
  };

    // Función para imprimir datos en el formulario
    vm.getInfo = function (pEvent) {
      vm.event.eventName = pEvent.eventName;
      vm.event.invitedName = pEvent.invitedName;
      vm.event.eventType = pEvent.eventType;
      vm.event.eventState = pEvent.eventState;
      vm.event.photo = pEvent.photo;
      vm.event.date1 = pEvent.date1;
      vm.event.time1 = new Date(pEvent.time1);
      vm.event.date2 = pEvent.date2;
      vm.event.time2 = new Date(pEvent.time2);
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
      vm.event.ticketPrice = pEvent.ticketPrice;
      vm.event.contactName = pEvent.contactName;
      vm.event.contactPhone = pEvent.contactPhone;
      vm.event.charityEvent = pEvent.charityEvent;
      vm.event.orgType = pEvent.orgType;
      vm.event.orgName = pEvent.orgName;
      vm.event.description = pEvent.description;
      vm.updateDisable = false;
    };

    // Función para actualizar datos de evento
    vm.updateEvent = function () {
      var modEvent = {
        eventName: vm.event.eventName,
        invitedName: vm.event.invitedName,
        eventType: vm.event.eventType,
        eventState: vm.event.eventState,
        photo: vm.event.photo,
        date1: vm.event.date1,
        time1: vm.event.time1,
        date2: vm.event.date2,
        time2: vm.event.time2,
        selectAcademies: vm.event.selectAcademies,
        selectCategories: vm.event.selectCategories,
        costInsc: vm.event.costInsc,
        selectSponsors: vm.event.selectSponsors,
        placeName: vm.event.placeName,
        location: vm.event.location,
        latitude: vm.event.latitude,
        length: vm.event.length,
        seats: vm.event.seats,
        tickets: vm.event.tickets,
        ticketPrice: vm.event.ticketPrice,
        contactName: vm.event.contactName,
        contactPhone: vm.event.contactPhone,
        charityEvent: vm.event.charityEvent,
        orgName: vm.event.orgName,
        orgType: vm.event.orgType,
        description: vm.event.description
      }
      $scope.updateDisable = true;
      eventService.updateEvent(modEvent);
      vm.showEditEventAlert();
      init();
      clean();
    };

    // Función para mensaje de registro de evento satisfactorio
    vm.showEditEventAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('¡Actualización exitosa!')
        .textContent('¡El evento se actualizó correctamente!')
        .ariaLabel()
        .ok('¡Gracias!')
        .targetEvent()
    );
  };

    // Función para cancelar un evento
    vm.cancelEvent = function (pEvent) {
      pEvent.eventState = 'cancelado';
      eventService.updateEvent(pEvent);
      vm.showCxlEventAlert();
      acceptedEvents();
      init();
    };

    // Función para mensaje de registro de evento satisfactorio
    vm.showCxlEventAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('¡Cancelación exitosa!')
        .textContent('¡El evento se canceló correctamente!')
        .ariaLabel()
        .ok('¡Gracias!')
        .targetEvent()
    );
  };

    // Función para filtrar la tabla de consulta de eventos
    function acceptedEvents() {
      var today = new Date();
      vm.events = eventService.getEvents();
        for (var i = 0; i < vm.events.length; i++) {
          if (vm.events[i].eventState === 'aprobado') {
            vm.acceptedEvents.push(vm.events[i]);
          }
        }
      }

    vm.createNewConsult = function (pNewConsul) {
      console.log("El objeto con imagen es %o", pNewConsul);
      console.log("Gracias, ha sido creado un nuevo represetante de consejo %o", pNewConsul);
      var bFlag = userService.createConsul(pNewConsul);
      var temDataZero = $cookies.get('currentUserActive');
      if (bFlag == false) {
        document.getElementById('errorConsul').innerHTML = 'El represetante de consejo ya existe';
        //te manda a la página uno del registro.
        $state.go('admin.partOne');
        var tempDataOne = 'fallo al crear a ' + pNewConsul.firstName;
        vm.showConsulAlert('!Registro fallido!','¡Registro de representante de consejo fallida!');
        logService.createLog(false, temDataZero, tempDataOne);
      } else {
        vm.showConsulAlert('!Registro exitoso!','¡Registro de representante de consejo exitosamente!');
        logService.createLog(0, temDataZero, tempDataOne);
      }
    }

    // Función para pre guardar datos del profesor

    vm.presaveTeacher = function (pNewTeacher) {
      console.log(pNewTeacher);
      vm.cloudObj.data.file = document.getElementById("photo").files[0];
      Upload.upload(vm.cloudObj)
        .success(function (data) {
          pNewTeacher.photo = data.url;
          vm.createNewTeacher(pNewTeacher);
        })
    }

    // Función para guardar profesores
    vm.createNewTeacher = function (pNewTeacher) {
      if(userService.findUserTeacher(pNewTeacher.id) !== false){
        vm.showProfesorDuplicateAlert();
      }
      else{
        userService.setTeachers(pNewTeacher);
        vm.showProfesorAlert();
        init();
        cleanTeacher();
      }
    };

    // Función para imprimir datos del profesor en la lista
    vm.getInfoTeacher = function (pTeacher) {
      vm.teacher.id = pTeacher.id;
      vm.teacher.firstName = pTeacher.firstName;
      vm.teacher.secondName = pTeacher.secondName;
      vm.teacher.firstLastName = pTeacher.firstLastName;
      vm.teacher.secondLastName = pTeacher.secondLastName;
      vm.teacher.phone = pTeacher.phone;
      vm.teacher.email = pTeacher.email;
      vm.teacher.bornDate = pTeacher.bornDate;
      vm.teacher.gender = pTeacher.gender;
      vm.teacher.nationality = pTeacher.nationality;
      vm.teacher.academy = pTeacher.academy;
      vm.teacher.photo = pTeacher.photo;
      vm.teacher.status = pTeacher.status;
    }

     function cleanTeacher() {
      vm.teacher.id = '';
      vm.teacher.firstName = '';
      vm.teacher.secondName = '';
      vm.teacher.firstLastName = '';
      vm.teacher.secondLastName = '';
      vm.teacher.phone = '';
      vm.teacher.email = '';
      vm.teacher.bornDate = '';
      vm.teacher.gender = '';
      vm.teacher.nationality= '';
      vm.teacher.academy = '';
      vm.teacher.photo = '';
      vm.teacher.status = '';
    }
    // Función para limpiar campos

    function clean() {
      vm.event = '';
    }

      // Función para actualizar datos del profesor
    vm.updateTeacher = function () {
      var editTeacher = {
        id: vm.teacher.id,
        firstName: vm.teacher.firstName,
        secondName: vm.teacher.secondName,
        firstLastName: vm.teacher.firstLastName,
        secondLastName: vm.teacher.secondLastName,
        phone: vm.teacher.phone,
        email: vm.teacher.email,
        bornDate: vm.teacher.bornDate,
        gender: vm.teacher.gender,
        nationality: vm.teacher.nationality,
        academy: vm.teacher.academy,
        photo: vm.teacher.photo,
        status: vm.teacher.status
      }
      userService.updateTeacher(editTeacher);
      init();
      cleanTeacher();
    };

    //funcion para guardar informacion de academia

    vm.createAcademy = function () {
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
    function cleanAcademy() {
      vm.name = '',
        vm.address = '',
        vm.manager = '',
        vm.competitors = '',
        vm.phone = '',
        vm.email = ''
    }

    //funcion para editar academia
    vm.getAcademy = function (academy) {
      vm.name = academy.name;
      vm.address = academy.address;
      vm.manager = academy.manager;
      vm.competitors = academy.competitors;
      vm.phone = academy.phone;
      vm.email = academy.email;
    }

    //funcion para guardar la academia editada
    vm.updateAcademy = function () {
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

    // funcion para presave de alumno
    vm.presaveStudent = function(pNewStudent) {
        console.log(pNewStudent);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            pNewStudent.photo = data.url;
            vm.createStudent(pNewStudent);
          })
          .catch(function(error){
            console.log(error);
          })
      }


    //funcion para guardar informacion del alumno
    vm.createStudent = function(pNewStudent){
      if (userService.searchUser(pNewStudent.id) !== false) {
        vm.studentDuplicateAlert();
      }else {
        console.log(pNewStudent);
        pNewStudent.role = 'Competidor';
        userService.setUsers(pNewStudent);
        vm.studentAlert();
        clean();
        init();
      }
    }


    //funcion para editar alumno
    vm.getStudent = function(user) {
      vm.student.id = user.id;
      vm.student.birthday = user.birthday;
      vm.student.firstName = user.firstName;
      vm.student.secondName = user.secondName;
      vm.student.firstLastName = user.firstLastName;
      vm.student.secondLastName = user.secondLastName;
      vm.student.genre = user.genre;
      vm.student.weight = user.weight;
      vm.student.height = user.height;
      vm.student.nationality = user.nationality;
      vm.student.phone = user.phone;
      vm.student.email = user.email;
      vm.student.attendAcademy = user.attendAcademy;
      vm.student.teacher = user.teacher;
      vm.student.belt = user.belt;
      vm.student.category = user.category;
      vm.student.tournaments = user.tournaments;
      vm.student.tournamentsWins = user.tournamentsWins;
      vm.student.role = user.role;
    }

    //funcion para guardar alumno editada
    vm.updateStudent = function () {
      var editstudent = {
        id: vm.id,
        birthday: vm.birthday,
        firstName: vm.firstName,
        secondName: vm.secondName,
        firstLastName: vm.firstLastName,
        secondLastName: vm.secondLastName,
        genre: vm.genre,
        weight: vm.weight,
        height: vm.height,
        nationality: vm.nationality,
        phone: vm.phone,
        email: vm.email,
        attendAcademy: vm.attendAcademy,
        teacher: vm.teacher,
        belt: vm.belt,
        category: vm.category,
        tournaments: vm.tournaments,
        tournamentsWins: vm.tournamentsWins,
        status : vm.status,
        role : vm.role
      }
      userService.updateUsers(editstudent);
      init();
      clean();
    }


    //funcion para guardar competencia
    vm.createCompetition = function () {
      var newCompetition = {
        competitionNumber: vm.competitionNumber,
        eventBelongs: vm.eventBelongs,
        competitionAge : vm.competitionAge,
        competitionGenre: vm.competitionGenre,
        competitionBelt: vm.competitionBelt,
        competitionWeight: vm.competitionWeight,
      }
      newCompetition.competitors = [];
      console.log(newCompetition);
      console.log(newCompetition.competitors)
      eventService.setCompetitions(newCompetition);
      cleanStudent();
      init();
    }

      vm.changeViews = function(){
        vm.userActive = true;
        vm.selected = 2;
      }

    //Registrar alumnos en competencia

      vm.registerUsersCompetitions = function(competition){
        vm.competitor;
        for(var i = 0; i < vm.competitions.length; i++){
          if(competition == vm.competitions[i].competitionNumber){
            for(var j = 0; j < vm.competitions[i].competitors.length; j++){
              if(vm.competitor.attendAcademy == vm.competitions[i].competitors[j].attendAcademy){
                var duplicate = true;
              }
            }
            if(duplicate !== true){
              vm.competitions[i].competitors.push(vm.competitor);
              eventService.updateCompetition(vm.competitions[i]);
              return;
            }
          }
        console.log(eventService.getCompetitions());
      }
    }

    vm.showCompetition = function(competition){
      for(var i = 0; i < vm.competitions.length; i++){
        if(competition.competitionNumber == vm.competitions[i].competitionNumber){
          vm.competitionsToShow.push(competition);
          for(var j = 0; j < vm.competitionsToShow[i].competitors.length; j++){
            vm.competitionsToShow[i].competitors[j].points = 0;
          }
        }
      }
      for(var i = 0; i < vm.competitionsToShow.length; i++){
        for(var j = 0; j < vm.competitionsToShow[i].competitors.length; j++){
          if(vm.competitionsToShow[i].competitors.length == 5){
            kLoop:
            for(var k = 0; k < 5; k++){
              vm.pairFights = [];
              vm.pairFights.push(vm.competitionsToShow[i].competitors[j]);
              vm.pairFights.push(vm.competitionsToShow[i].competitors[k + 1])
              if(vm.pairFights.length == 2){
                if(vm.fights.length == 0){
                  vm.fights.push(vm.pairFights);
                }
                if(vm.pairFights.length == 2){
                  for(var x = 0; x < vm.fights.length; x++){
                    if(vm.pairFights == vm.fights[x]){
                      continue kLoop;
                    }
                  }
                  for(var x = 0; x < vm.fights.length; x++){
                    if((vm.pairFights[0] == vm.fights[x][1]) && (vm.pairFights[1] == vm.fights[x][0])){
                      continue kLoop;
                    }
                  }
                  for(var x = 0; x < vm.fights.length; x++){
                    if((vm.pairFights[0] == vm.pairFights[1])){
                      continue kLoop;
                    }
                  }
                  vm.fights.push(vm.pairFights);
                  if(vm.fights.length == 20){
                    break;
                  }
                }
              }
            }
          }
        }
        vm.competitionsToShow[i].fights = vm.fights;
      }
      console.log(vm.fights);
      vm.selected = 8;
    }

    vm.updateOptions = function(competition){
      vm.competitorsEvent = [];
      for(var i = 0; i < vm.competitions.length; i++){
        if(competition == vm.competitions[i].competitionNumber){
          for(var j = 0; j < vm.users.length; j++){
            if(vm.currentUser.id == vm.users[j].teacher){
              if(vm.users[j].category == vm.competitions[i].competitionAge){
                if(vm.users[j].belt == vm.competitions[i].competitionBelt){
                  vm.competitorsEvent.push(vm.users[j]);
                }
              }
            }
          }
        }
      }
    }

    // Inicia Daniel

vm.editMember = function(pMemberToEdit) {
  console.log(pMemberToEdit);
  console.log(vm);
  vm.editMem.name = pMemberToEdit.name;
  vm.editMem.position = pMemberToEdit.position;
  vm.editMem.email = pMemberToEdit.email;
  vm.editMem.phone = pMemberToEdit.phone;
  vm.isEdit = true;
  vm.modDisplay = true;
}
//Limpia el formulario de actualización y /o creación de miembro
function clearForm(pObjectToFrm) {
  for (var index in pObjectToFrm) {
    pObjectToFrm[index] = '';
  }
}
//Abre el formulario
vm.addNewDirect = function() {
  vm.modDisplay = true;
  vm.isNew = true;
}
//crea el miembro nuevo de la junta directiva
vm.createMember = function(pNewMember) {
  settingsService.updateDirect(pNewMember);
  vm.showAlertEditParams('El miembro llamado '+ pNewMember.name+' ha sido creado exitosamente.','¡Nuevo miembro de la junta directiva!');
  init();
  vm.modDisplay = false;
  clearForm(vm.editMem);
}
vm.updateMember = function(pMemberToUpdate) {
  settingsService.updateDirect(pMemberToUpdate);
  vm.showAlertEditParams('El miembro llamado '+ pMemberToUpdate.name+' ha sido actualizado exitosamente.','¡Actualización de miembro en la junta directiva!');
  init();
  vm.modDisplay= false;
  clearForm(vm.editMem);
}
// Termina dANIEL

  }

})();