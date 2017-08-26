(function() {
    'use strict'
    angular
      .module('app')
      .controller('adminCtrl', adminCtrl);

    adminCtrl.$inject = ['$scope', '$mdDialog', '$http', '$state', '$cookies', '$location', 'eventService', 'imageService', 'Upload', 'academyServices', 'logService', 'userService', 'sponsorService', 'AuthService', 'estabInfoService', 'ticketService', 'settingsService', 'NgMap'];

    function adminCtrl($scope, $mdDialog, $http, $state, $cookies, $location, eventService, imageService, Upload, academyServices, logService, userService, sponsorService, AuthService, estabInfoService, ticketService, settingsService, NgMap) {

      var vm = this;
      vm.currentUser = '';
      vm.cloudObj = imageService.getConfiguration();
      vm.selected = 0;
      vm.updateDisable = true;
      vm.submitDisable = false;
      vm.showButtonUpDate = false;
      vm.showButtonSubmit = true;
      vm.stepTwoConsult = false;
      vm.stepThreeConsult = false;
      vm.stepOneConsult = true;
      vm.user = {};
      vm.student = {};
      vm.students = {};
      vm.log = {};
      vm.imageActive = false;
      vm.weights = estabInfoService.getWeight();
      vm.categories = estabInfoService.getCategories();
      // vm.acceptedEvents = [];
      vm.nameSponsorEdit = false;
      vm.showCompetition = false;
      vm.competitionsToShow = [];
      vm.fights = [];
      vm.pairFights = [];
      vm.ready = false;
      vm.today = new Date();
      vm.consultEvent = {};
      vm.customFullscreen = false;
      vm.infowindow;
      vm.consultTeacher = {};
      vm.teachers = {};
      loadTeachers();
      loadStudents();

      function loadTeachers(){
        userService.getTeachers().then(function (response) {
          vm.teachers = response.data;

          });
          }
          function loadStudents(){
            userService.getUsers().then(function (response) {
              vm.students = response.data;

              });
              }

      function init() {
        vm.currentUser = $cookies.getObject('currentUserActive');
        // función que se llama así misma para indicar que sea lo primero que se ejecute
        // Inicio Daniel
        vm.stt = settingsService.getSettings();
        vm.editMem = {};
        vm.modDisplay = false;
        vm.isEdit = false;
        vm.isNew = false;
        // Fin Daniel
        vm.currentUser = $cookies.getObject('currentUserActive');
        console.log(vm.currentUser);
        vm.originatorEv;
        vm.weights = estabInfoService.getWeight();
        eventService.getCompetitions()
        .then(function(response){
          vm.competitions = response.data;
        })
        .catch(function(err){
          console.log(err);
        });
        // acceptedEvents();
        vm.event = {};
        sponsorService.getSponsors().then(function(response) {
          vm.sponsors = response.data;
          console.log(vm.sponsors);
        });
        
        academyServices.getAcademy().then(function(response) {
          vm.academies = response.data;
        });
        eventService.getEvents().then(function(response) {
          vm.events = response.data;
          console.log(vm.events);
        });
        vm.teacher = {};
        vm.sponsor = {};

        logService.showLog().then(function(response){
            vm.log = response.data;
        });
        vm.belts = estabInfoService.getBelts();
        vm.to = new Date();
        console.log(vm.to);
        vm.to2 = new Date();
        vm.users = userService.getUsers()
          .then(function(response){
            vm.users = response.data;
          })
          .catch(function(err){
            console.log(err);
          });
        vm.weights = estabInfoService.getWeight();
        vm.categoriesAge = estabInfoService.getCategories();
        estabInfoService.getCountries().then(function(data) {
          vm.countries = data.data.countries;
        });
        vm.teacher.status = "activo";
        vm.userActive = false;
        ticketService.getsReservations().then(function(response) {
          vm.reservations = response.data;
        });
        vm.status = "activo";
        vm.roleFilter = "";
        vm.stateFilter = "";
      }
      init();

  $scope.showPrompt = function() {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('Bienvenido ' + vm.currentUser.id + '!')
      .textContent('Modifica tu contraseña temporal')
      .placeholder('Nueva contraseña')
      .ariaLabel('New password')
      .initialValue('')
      .targetEvent()
      .ok('Cambiar')
      .cancel('');

    $mdDialog.show(confirm).then(function(result) {
      vm.currentUser.password =  result;
      vm.currentUser.newUser = 0;
      userService.updateTemporalPassword(vm.currentUser)
      .then(function(response){
        console.log(response);
        $cookies.putObject('currentUserActive', vm.currentUser);
      })
      .catch(function(err){
        console.log(err);
      });
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
  };

 if(vm.currentUser.newUser == 1) {
    $scope.showPrompt();
  }

      /*Sidenav*/
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
      /*Final sidenav
      -->>*/

      // funcion p el mapa
      vm.placeChanged = function() {
        vm.place = this.getPlace();
        console.log(vm.place);
        vm.map.setCenter(vm.place.geometry.location);
        vm.map.setZoom(18);
        console.log(vm.place.name);
        console.log(vm.place.geometry);
        vm.event.coords = vm.place.geometry.location;
      }
      NgMap.getMap().then(function(map) {
        vm.map = map;
        console.log(vm.map);
      });

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

      // Función para mostrar la consulta de profesores
      vm.showTeacherConsult = function(pTeacher, te){
        checkConsultTeacher(pTeacher);
        $mdDialog.show({
          contentElement: '#infoTeacher',
          parent: angular.element(document.body),
          targetEvent: te,
          clickOutsideToClose: true,
        });
      };

      // Función para mostrar academias
      vm.consultAcademy = function(academy, ac) {
        checkConsultAcademy(academy);
        $mdDialog.show({
          contentElement: '#infoAcademy',
          parent: angular.element(document.body),
          targetEvent: ac,
          clickOutsideToClose: true,
        });
      };

      //funcion para imprimir datos de academia
      function checkConsultAcademy(academy){
        vm.academy ={
          name: academy.name,
          address: academy.address,
          manager: academy.manager,
          competitors: academy.competitors,
          phone: academy.phone,
          email: academy.email
        }
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
        if (user.status == 'activo') {
          user.status = 'inactivo';
          userService.updateUsers(user);
          userService.updateTeacher(user)
          vm.stateInactive(user);
          init();
        } else {
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


    //   Función para actualizar parametros del sistema.
      vm.showAlertEditParams = function(pMessage, pFeedback) {
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
      vm.editParam = function(pParamToEdit) {
        vm.showPrompt(pParamToEdit);
      }

      vm.showPrompt = function(pParamToEdit) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
          .title('!Actualización de parametro del sistema!')
          .textContent('Actualizando de ' + pParamToEdit)
          .placeholder('Escribe el nuevo dato')
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
          coords: pEvent.coords,
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

      //Profesor a consultar
      function checkConsultTeacher(pTeacher) {
        vm.consultTeacher = {
          id: pTeacher.id,
          name: pTeacher.name,
          surName: pTeacher.surName,
          firstName: pTeacher.firstName,
          lastName: pTeacher.lastName,
          phone: pTeacher.phone,
          email: pTeacher.email,
          birthday: pTeacher.birthday,
          genre: pTeacher.genre,
          nationality: pTeacher.nationality,
          academy: pTeacher.academy,
          photo: pTeacher.photo,
          status: pTeacher.status
        }
      }

      // Función para pre guardar datos del evento


      vm.presaveEvent = function(pNewEvent) {
        console.log(pNewEvent);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data) {
            pNewEvent.photo = data.url;
            vm.createNewEvent(pNewEvent);
          });
      };

    // Función para guardar
    vm.createNewEvent = function (pNewEvent) {
      if (eventService.findEvent(pNewEvent.eventName) != false) {
        vm.showEventDuplicateAlert();
      }
      else{
        eventService.setEvents(pNewEvent)
        .then(function(response){
          var responseObj = response;
          console.log(response);
          eventService.getEvents().then(function(response){
            vm.events = response.data;
          });
        }).catch(function(err){
          console.log(err);
        });
        vm.showEventAlert();
      }
      clean();
      init();
      };

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

      vm.saveSponsor = function(pNewSponsor) {
        if (sponsorService.findSponsor(pNewSponsor.sponsorName) !== false) {
          vm.showSponsorDuplicateAlert();
        } else {
          sponsorService.setSponsors(pNewSponsor)
            .then(function(response) {
              var responseObj = response;
              console.log(response);
              sponsorService.getSponsors().then(function(response) {
                vm.sponsors = response.data;
              });
            }).catch(function(err) {
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

      vm.presaveSponsor = function(pNewSponsor) {
        console.log(pNewSponsor);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data) {
            pNewSponsor.photo = data.url;
            vm.saveSponsor(pNewSponsor);
          });
      }
      // vm.error = false;
      vm.preSaveConsul = function(pNewConsult) {
        console.log(pNewConsult);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data) {
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

      vm.updateSponsor = function() {
        var modSponsor = {
          _id: vm.sponsor.id,
          sponsorName: vm.sponsor.sponsorName,
          sponsorCompany: vm.sponsor.sponsorCompany,
          sponsorType: vm.sponsor.sponsorType,
          sponsorMoney: vm.sponsor.sponsorMoney,
          description: vm.sponsor.description,
          photo: vm.sponsor.photo
        }

        vm.submitDisable = false;
        vm.updateDisable = true;
        sponsorService.updateSponsor(modSponsor)
          .then(function(response) {
            console.log(response);
            sponsorService.getSponsors().then(function(response) {
              vm.sponsors = response.data;
            });
          })
          .catch(function(err) {
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

      // Mnesaje para promover de grado a un alumno
      vm.showStudentUpdateBelt = function() {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('¡Grado ascendido!')
          .textContent('¡Se ha ascendido el grado del alumno correctamente!')
          .ariaLabel()
          .ok('¡Gracias!')
          .targetEvent()
        );
      };

      // Mnesaje cuando no se pudede promover de grado a un alumno
      vm.showStudentWithoutRequirements = function() {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('¡Sin ascender!')
          .textContent('¡El estudiante no cumple con los requisitos para poder ser ascendido!')
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
      vm.getInfo = function(pEvent) {
        console.log(pEvent);
        vm.event._id = pEvent._id;
        vm.event.eventName = pEvent.eventName;
        vm.event.invitedName = pEvent.invitedName;
        vm.event.eventType = pEvent.eventType;
        vm.event.eventState = pEvent.eventState;
        vm.event.photo = pEvent.photo;
        vm.event.date1 =new Date(pEvent.date1);
        vm.event.time1 = new Date(pEvent.time1);
        vm.event.date2 = new Date(pEvent.date2);
        vm.event.time2 = new Date(pEvent.time2);
        vm.event.selectAcademies = pEvent.selectAcademies;
        vm.event.selectCategories = pEvent.selectCategories;
        vm.event.costInsc = Number(pEvent.costInsc);
        vm.event.selectSponsors = pEvent.selectSponsors;
        vm.event.placeName = pEvent.placeName;
        vm.event.coords = pEvent.coords.lat + ' ' +pEvent.coords.lng;
        vm.event.seats = Number(pEvent.seats);
        vm.event.tickets = Number(pEvent.tickets);
        vm.event.ticketPrice = Number(pEvent.ticketPrice);
        vm.event.contactName = pEvent.contactName;
        vm.event.contactPhone = pEvent.contactPhone;
        vm.event.charityEvent = pEvent.charityEvent;
        vm.event.orgType = pEvent.orgType;
        vm.event.orgName = pEvent.orgName;
        vm.event.description = pEvent.description;

        vm.showButtonUpDate = true;
        vm.showButtonSubmit = false;
      };

      // Función para actualizar datos de evento
      vm.updateEvent = function() {
        var modEvent = {
          _id: vm.event._id,
          eventName: vm.event.eventName,
          invitedName: vm.event.invitedName,
          eventType: vm.event.eventType,
          eventState: vm.event.eventState,
          photo: vm.event.photo,
          date1: vm.event.date1,
          date2: vm.event.date2,
          time1: vm.event.time1,
          time2: vm.event.time2,
          selectAcademies: vm.event.selectAcademies,
          selectCategories: vm.event.selectCategories,
          costInsc: vm.event.costInsc,
          selectSponsors: vm.event.selectSponsors,
          placeName: vm.event.placeName,
          coords: vm.event.coords,
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
        vm.submitDisable = false;
        vm.updateDisable = true;
      // eventService.updateEvent(modEvent);
      // vm.showEditEventAlert();
      // init();
      // clean();
      eventService.updateEvent(modEvent)
      .then(function(response){
        console.log(response);
        eventService.getEvents().then(function(response) {
          vm.events = response.data;
        });
      }).catch(function(err){
        console.log(err);
      });
      vm.showEditEventAlert();
      clean();
      init();
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
      vm.cancelEvent = function(pEvent) {
        pEvent.eventState = 'cancelado';
        eventService.updateEvent(pEvent)
        .then(function(response){
          console.log(response);
          eventService.getEvents().then(function(response) {
            vm.events = response.data;
          });
        }).catch(function(err){
          console.log(err);
        });
        vm.showCxlEventAlert();
        // acceptedEvents();
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
      // function acceptedEvents() {
      //   var today = new Date();
      //   vm.events = eventService.getEvents();
      //   for (var i = 0; i < vm.events.length; i++) {
      //     if (vm.events[i].eventState === 'aprobado') {
      //       vm.acceptedEvents.push(vm.events[i]);
      //     }
      //   }
      // }

      vm.createNewConsult = function(pNewConsul) {
        pNewConsul.role = 'consul';
        pNewConsul.status = 'activo';
        pNewConsul.newUser = 1;
        var bFlag;
        userService.createConsul(pNewConsul).then(function(response){
            bFlag = response.data.success;
            console.log(response.data.success);
        });
        if (bFlag == false) {
          document.getElementById('errorConsul').innerHTML = 'El represetante de consejo ya existe';
          //te manda a la página uno del registro.
          $state.go('admin.partOne');
          var tempDataOne = 'fallo al crear a ' + pNewConsul.firstName;
          vm.showConsulAlert('!Registro fallido!', '¡Registro de representante de consejo fallida!');
          logService.createLog(false, temDataZero, tempDataOne);
        } else {
          vm.showConsulAlert('!Registro exitoso!', '¡Registro de representante de consejo exitosamente!');
          logService.createLog(0, temDataZero, tempDataOne);
        }
      }

      // Función para pre guardar datos del profesor

      vm.presaveTeacher = function(pNewTeacher) {
        console.log(pNewTeacher);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data) {
            pNewTeacher.photo = data.url;
            vm.createNewTeacher(pNewTeacher);
          })
      }

      // Función para guardar profesores
      vm.createNewTeacher = function(pNewTeacher) {

        //vm.showProfesorDuplicateAlert();
        pNewTeacher.role = 'teacher';
        pNewTeacher.status = 'activo';
        pNewTeacher.newUser = 1;
        userService.setTeachers(pNewTeacher);
        vm.showProfesorAlert();
        init();
        cleanTeacher();
      }


    // Función para imprimir datos del profesor en la lista
    vm.getInfoTeacher = function(pTeacher) {
      vm.teacher._id = pTeacher._id;
      vm.teacher.id = pTeacher.id;
      vm.teacher.name = pTeacher.name;
      vm.teacher.surName = pTeacher.surName;
      vm.teacher.firstName = pTeacher.firstName;
      vm.teacher.lastName = pTeacher.lastName;
      vm.teacher.phone = pTeacher.phone;
      vm.teacher.email = pTeacher.email;
      vm.teacher.birthday = pTeacher.birthday;
      vm.teacher.genre = pTeacher.genre;
      vm.teacher.nationality = pTeacher.nationality;
      vm.teacher.academy = pTeacher.academy;
      vm.teacher.photo = pTeacher.photo;
      vm.teacher.status = pTeacher.status;
    }

    function cleanTeacher() {
      vm.teacher.id = '';
      vm.teacher.name = '';
      vm.teacher.surName = '';
      vm.teacher.firstName = '';
      vm.teacher.lastName = '';
      vm.teacher.phone = '';
      vm.teacher.email = '';
      vm.teacher.birthday = '';
      vm.teacher.genre = '';
      vm.teacher.nationality = '';
      vm.teacher.academy = '';
      vm.teacher.photo = '';
      vm.teacher.status = '';
    }
    // Función para limpiar campos

    function clean() {
      vm.event = '';
    }

    // Función para actualizar datos del profesor
    vm.updateTeacher = function() {
      var editTeacher = {
        _id: vm.teacher._id,
        id: vm.teacher.id,
        name: vm.teacher.name,
        surName: vm.teacher.surName,
        firstName: vm.teacher.firstName,
        lastName: vm.teacher.lastName,
        phone: vm.teacher.phone,
        email: vm.teacher.email,
        birthday: vm.teacher.birthday,
        genre: vm.teacher.genre,
        nationality: vm.teacher.nationality,
        academy: vm.teacher.academy,
        photo: vm.teacher.photo,
        status: vm.teacher.status
      }
      userService.updateTeacher(editTeacher)
      .then(function(response){
        $http.get('http://localhost:3000/api/get_all_teachers')
        .then(function(response){
          vm.teachers = response.data
        })
      })
      .catch(function(err) {
        console.log(err);
      })
      init();
      cleanTeacher();
    };

// Funcion para actualizar competición
vm.updateCompetition = function() {
var pModCompetition = {
    _id: vm._id,
    competitionNumber: vm.competitionNumber,
    eventBelongs: vm.eventBelongs,
    competitionAge: vm.competitionAge,
    competitionGenre: vm.competitionGenre,
    competitionBelt: vm.competitionBelt,
    competitionWeight: vm.competitionWeight,
  }
  eventService.updateCompetition(pModCompetition)
  init();
  cleanCompetition();
  }

  // Funcion para actualizar estado de competición
  vm.deleteCompetition = function(pModCompetition) {
    pModCompetition.status = 'inactivo';
    eventService.deleteCompetition(pModCompetition)
    init();
    cleanCompetition();
    }

//Funcion para limpiar campos de academias
  function cleanCompetition() {
    vm._id = '',
    vm.competitionNumber = '',
    vm.eventBelongs = '',
    vm.competitionAge ='',
    vm.competitionGenre = '',
    vm.competitionBelt = '',
    vm.competitionWeight = ''

  }

    //funcion para guardar informacion de academia

    vm.createAcademy = function() {
      var newAcademy = {
        name: vm.name,
        address: vm.address,
        manager: vm.manager,
        competitors: vm.competitors,
        phone: vm.phone,
        email: vm.email
      };
      console.log(newAcademy);
      // academyServices.setAcademy(newAcademy);
      // cleanAcademy();
      // init();

      if (academyServices.findAcademy(newAcademy.name) !== false) {
          vm.academyDuplicateAlert();
        } else {
          academyServices.setAcademy(newAcademy)
            .then(function(response) {
              var responseObj = response;
              console.log(response);
              academyServices.getAcademy().then(function(response) {
                vm.academies = response.data;
              });
            }).catch(function(err) {
              console.log(err);
            });
          vm.academyAlert();
        }
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
    vm.getAcademy = function(academy) {
      vm._id = academy._id;
      vm.name = academy.name;
      vm.address = academy.address;
      vm.manager = academy.manager;
      vm.competitors = academy.competitors;
      vm.phone = academy.phone;
      vm.email = academy.email;
    }

    //funcion para guardar la academia editada
    vm.updateAcademy = function() {
      var editAcademy = {
        _id: vm._id,
        name: vm.name,
        address: vm.address,
        manager: vm.manager,
        competitors: vm.competitors,
        phone: vm.phone,
        email: vm.email
      }

      academyServices.updateAcademy(editAcademy)
      .then(function(response){
        console.log(response);
        academyServices.getAcademy().then(
          function(response){
            vm.academies = response.data;
          });
      })
      .catch(function(err){
        console.log(err);
      })
      vm.academyAlert();
      init();
      cleanAcademy();
    }

    vm.logOut = function() {
      AuthService.logOut();
    }

    // funcion para presave de alumno
    vm.presaveStudent = function(pNewStudent) {
      console.log(pNewStudent);
      vm.cloudObj.data.file = document.getElementById("photo").files[0];
      Upload.upload(vm.cloudObj)
        .success(function(data) {
          pNewStudent.photo = data.url;
          vm.createStudent(pNewStudent);
        })
        .catch(function(error) {
          console.log(error);
        })
    }


    //funcion para guardar informacion del alumno
    vm.createStudent = function(pNewStudent) {
    //   if (userService.searchUser(pNewStudent.id) !== false) {
    //     vm.studentDuplicateAlert();
    //   } else {
    //     console.log(pNewStudent);
    //     pNewStudent.role = 'student';
    //     userService.setUsers(pNewStudent);
    pNewStudent.role = 'student';
    pNewStudent.status = 'activo';
    pNewStudent.newUser = 1;
    userService.setUsers(pNewStudent)
    .then(function(response){
        vm.studentAlert();
        cleanStudent();
        init();
      })
      .catch(function(err){
        console.log(err);
      });
    //   }
     }

     function cleanAcademy() {
       vm.student._id= '';
       vm.student.id = '';
       vm.student.birthday = '';
       vm.student.name = '';
       vm.student.surName = '';
       vm.student.firstName = '';
       vm.student.lastName = '';
       vm.student.genre = '';
       vm.student.weight = '';
       vm.student.height = '';
       vm.student.nationality = '';
       vm.student.phone = '';
       vm.student.email = '';
       vm.student.academy = '';
       vm.student.teacher = '';
       vm.student.belt = '';
       vm.student.category = '';
       vm.student.tournaments = '';
       vm.student.tournamentsWins = '';
       vm.student.role = '';

     }

    //funcion para editar alumno
    vm.getStudent = function(pStudent) {
      vm.student._id= pStudent._id;
      vm.student.id = pStudent.id;
      vm.student.birthday = pStudent.birthday;
      vm.student.name = pStudent.name;
      vm.student.surName = pStudent.surName;
      vm.student.firstName = pStudent.firstName;
      vm.student.lastName = pStudent.lastName;
      vm.student.genre = pStudent.genre;
      vm.student.weight = Number(pStudent.weight);
      vm.student.height = Number(pStudent.height);
      vm.student.nationality = pStudent.nationality;
      vm.student.phone = pStudent.phone;
      vm.student.email = pStudent.email;
      vm.student.academy = pStudent.academy;
      vm.student.teacher = pStudent.teacher;
      vm.student.belt = pStudent.belt;
      vm.student.category = pStudent.category;
      vm.student.tournaments = Number(pStudent.tournaments);
      vm.student.tournamentsWins = Number(pStudent.tournamentsWins);
      vm.student.role = pStudent.role;
    }

    //funcion para guardar alumno editada
    vm.updateStudent = function() {
      var editstudent = {
        _id: vm.student._id,
        id: vm.student.id,
        birthday: vm.student.birthday,
        name: vm.student.name,
        surName: vm.student.surName,
        firstName: vm.student.firstName,
        lastName: vm.student.lastName,
        genre: vm.student.genre,
        weight: vm.student.weight,
        height: vm.student.height,
        nationality: vm.student.nationality,
        phone: vm.student.phone,
        email: vm.student.email,
        attendAcademy: vm.student.academy,
        teacher: vm.student.teacher,
        belt: vm.student.belt,
        category: vm.student.category,
        tournaments: vm.student.tournaments,
        tournamentsWins: vm.student.tournamentsWins,
        status: vm.student.status,
        role: vm.student.role
      }
      userService.updateUsers(editstudent)
      .then(function(response){
        $http.get('http://localhost:3000/api/get_all_students')
        .then(function(response){
          vm.students = response.data
        })
      })
      .catch(function(err) {
        console.log(err);
      })
      init();
      cleanStudent();
    }


    //funcion para guardar competencia
    vm.createCompetition = function() {
      var newCompetition = {
        status: 'activo',
        competitionNumber: vm.competitionNumber,
        eventBelongs: vm.eventBelongs,
        competitionAge: vm.competitionAge,
        competitionGenre: vm.competitionGenre,
        competitionBelt: vm.competitionBelt,
        competitionWeight: vm.competitionWeight
      }
      newCompetition.competitors = [];
      newCompetition.fights = [];

      if (eventService.findCompetition(newCompetition.competitionNumber) !== false) {
        vm.competitionDuplicateAlert();
      }else {
        eventService.setCompetitions(newCompetition)
          .then(function(response){
            var responseObj = response;
            console.log(response);
            eventService.getCompetitions().then(function(response){
              vm.competitions = response.data;
            });
          })
          .catch(function(err) {
            console.log(err);
          });
        vm.competitionAlert();
      }
      cleanCompetition();
      init();
    }

    function cleanCompetition() {
      vm.competitionNumber = '',
      vm.eventBelongs = '',
      vm.competitionAge = '',
      vm.competitionGenre = '',
      vm.competitionBelt = '',
      vm.competitionWeight = ''
    }

    vm.competitionDuplicateAlert = function() {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('La competicia ya existe')
          .textContent('La competicia ya existe, registre otra')
          .ariaLabel()
          .ok('¡Gracias!')
          .targetEvent()
        );
      };

      vm.competitionAlert = function() {
          // Appending dialog to document.body to cover sidenav in docs app
          // Modal dialogs should fully cover application
          // to prevent interaction outside of dialog
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Registo correcto')
            .textContent('Registro de la competecia realizado')
            .ariaLabel()
            .ok('¡Gracias!')
            .targetEvent()
          );
        };

    vm.changeViews = function() {
      vm.userActive = true;
      vm.selected = 2;
    }

    //Registrar alumnos en competencia

    //Bianco9

      vm.registerUsersCompetitions = function(competition) {
        vm.competitor;
        for(var i = 0; i < vm.competitions.length; i++){
          if(competition == vm.competitions[i].competitionNumber){
            for(var j = 0; j < vm.competitions[i].competitors.length; j++){
              if(vm.competitor.academy == vm.competitions[i].competitors[j].academy){
                var duplicate = true;
              }
              else if(vm.competitions[i].competitors.length == 5){
                vm.maxLengthCompetition();
                return;
              }
            }
            if(duplicate !== true){
              vm.competitions[i].competitors.push(vm.competitor);
              eventService.updateCompetition(vm.competitions[i])
              .then(function(response){
                console.log(response);
                vm.successCompetitorCompetition();
              })
              .catch(function(err){
                console.log(err);
              });
              return;
            }
            else{
              vm.duplicateAcademyCompetition();
            }
          }
        console.log(eventService.getCompetitions());
      }
    }

    vm.successCompetitorCompetition = function() {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Registro correcto')
        .textContent('Registro exitoso!')
        .ariaLabel()
        .ok('¡Gracias!')
        .targetEvent()
      );
    };

    vm.duplicateAcademyCompetition = function() {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Error')
        .textContent('Ya existe un usuario de esta academia en la competición')
        .ariaLabel()
        .ok('¡Gracias!')
        .targetEvent()
      );
    };

    vm.maxLengthCompetition = function() {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Error')
        .textContent('La competición ya tiene un máximo de competidores registrados')
        .ariaLabel()
        .ok('¡Gracias!')
        .targetEvent()
      );
    };

    vm.changeViews = function() {
      vm.userActive = true;
      vm.selected = 5;
    }

    vm.showCompetition = function(competition, $index){
      for(var i = 0; i < vm.competitionsToShow.length; i++){
        if(vm.competitionsToShow[i] == undefined){
          vm.competitionsToShow[i] = {};
        }
        vm.competitionsToShow[i].show = false;
      }
      for(var i = 0; i < vm.competitions.length; i++){
        if(competition.competitionNumber == vm.competitions[i].competitionNumber){
          vm.competitionsToShow[$index] = competition;
          for(var j = 0; j < vm.competitionsToShow[$index].competitors.length; j++){
            if(vm.competitionsToShow[$index].competitors[j].points == undefined){
              vm.competitionsToShow[$index].competitors[j].points = 0;
            }
          }
        }
      }
      for(var i = 0; i < vm.competitionsToShow.length; i++){
        for(var j = 0; j < vm.competitionsToShow[$index].competitors.length; j++){
          if(vm.competitionsToShow[$index].competitors.length == 5 && vm.competitionsToShow[$index].fights.length !== 10){
            kLoop:
            for(var k = 0; k < 4; k++){
              vm.pairFights = [];
              vm.pairFights.push(vm.competitionsToShow[$index].competitors[j]);
              vm.pairFights.push(vm.competitionsToShow[$index].competitors[k + 1])
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
                  if(vm.fights.length == 10){
                    if(vm.competitionsToShow[$index]._id == competition._id){
                      vm.competitionsToShow[$index].fights = vm.fights;
                      eventService.updateCompetition(vm.competitionsToShow[$index])
                      .then(function(response){
                        console.log(response)
                        eventService.getCompetitions()
                        .then(function(response){
                          vm.competitions = response.data;
                        })
                        .catch(function(err){
                          console.log(err);
                        })
                      })
                      .catch(function(err){
                        console.log(err);
                      })
                    }
                    break;
                  }
                }
              }
            }
            vm.competitionsToShow[$index].fights = vm.fights;
          }
          else{
            vm.fights = vm.competitionsToShow[$index].fights;
          }
        }
        vm.competitionsToShow[$index].show = true;
        break;
      }
      console.log(vm.fights);
      vm.selected = 8;
    }

    vm.updateOptions = function(competition){
      vm.competitorsEvent = [];
      for(var i = 0; i < vm.competitions.length; i++){
        if(competition == vm.competitions[i].competitionNumber){
          for(var j = 0; j < vm.users.length; j++){
            if(vm.users[j].genre == vm.competitions[i].competitionGenre){
              if(vm.users[j].category == vm.competitions[i].competitionAge){
                if(vm.users[j].weight == vm.competitions[i].competitionWeight){
                  //if(vm.users[j].belt == vm.competitions[i].competitionBelt){
                    vm.competitorsEvent.push(vm.users[j]);
                  //}
                }
              }
            }
          }
        }
      }
    }

    vm.updateOptionsTeachers = function(academyName){
      vm.teachersFromAcademy = [];
      for(var i = 0; i < vm.teachers.length; i++){
        if(vm.teachers[i].role == 'teacher'){
          if(vm.teachers[i].academy == academyName){
            //if(vm.users[j].belt == vm.competitions[i].competitionBelt){
              vm.teachersFromAcademy.push(vm.teachers[i]);
            //}
          }
        }
      }
    }

    vm.updatePoints = function(competitor, $index, competition){

      for(var i = 0; i < vm.competitions.length; i++){
        for(var j = 0; j < vm.competitions[i].competitors.length; j++){
          if(vm.competitions[i].competitors[j].id == competitor.id){
            competitor.points = vm.competitions[i].competitors[j].points;
          }
        }
      }
      competitor.points += 1;
      vm.ready = true;
      vm.fights[$index].push(vm.ready);
      console.log(vm.fights);

      for(var i = 0; i < vm.competitions.length; i++){
        for(var j = 0; j < vm.competitions[i].competitors.length; j++){
          if(vm.competitions[i]._id == competition._id){
            if(vm.competitions[i].competitors[j]._id == competitor._id){
              vm.competitions[i].competitors[j].points = competitor.points;
              vm.competitions[i].fights = vm.fights;
              eventService.updateCompetition(vm.competitions[i])
                .then(function(response){
                    vm.competitionsToShow[i] = vm.competitions[i];
                    vm.selected = 8;
                  /*eventService.getCompetitions()
                  .then(function(response){
                    vm.competitions = response.data;
                  })
                  .catch(function(err){
                    console.log(err);
                  })*/
                })
                /*.catch(function(err){
                  console.log(err);
                });*/
            }
          }
        }
      }
    }

    // Fin Bianco9

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
      vm.showAlertEditParams('El usuario  ' + pNewMember.name + ' ha sido creado exitosamente.', '¡Nuevo miembro de la junta directiva!');
      init();
      vm.modDisplay = false;
      clearForm(vm.editMem);
    }
    vm.updateMember = function(pMemberToUpdate) {
      settingsService.updateDirect(pMemberToUpdate);
      vm.showAlertEditParams('El usuario  ' + pMemberToUpdate.name + ' ha sido actualizado exitosamente.', '¡Actualización de miembro en la junta directiva!');
      init();
      vm.modDisplay = false;
      clearForm(vm.editMem);
    }
    // Termina dANIEL
    // Inicia Josué

    vm.updateBelt = function(pStudent) {
      var bError = false;

      switch (pStudent.belt) {
        case 'blanco':
          if (pStudent.tournaments >= 3) {
            pStudent.belt = 'amarillo';
          } else {
            // Mensaje de retroalimentacion
            bError = true;
          }
          break;
        case 'amarillo':
          if (pStudent.tournaments >= 4) {
            pStudent.belt = 'verde';
          } else {
            // Mensaje de retroalimentacion
            bError = true;
          }
          break;
        case 'verde':
          if (pStudent.tournaments >= 5) {
            pStudent.belt = 'azul';
          } else {
            // Mensaje de retroalimentacion
            bError = true;
          }
          break;
        case 'azul':
          if (pStudent.tournaments >= 6) {
            pStudent.belt = 'rojo';
          } else {
            // Mensaje de retroalimentacion
            bError = true;
          }
          break;
        case 'rojo':
          if (pStudent.tournaments >= 7) {
            pStudent.belt = 'negro';
          } else {
            // Mensaje de retroalimentacion
            bError = true;
          }
          break;
        default:
          //mensaje no se puede promover un grado superior
          bError = true;
          break;
      }
      if (bError == true) {
        vm.showStudentWithoutRequirements();
      } else {
        userService.updateBelt(pStudent);
        vm.showStudentUpdateBelt ();
      }


  }
  vm.compareDate = function (competition){
    var edit = true;
    var fecha = new Date();
    for(var i = 0 ; i < vm.events.length ; i++){
      if(competition.eventBelongs == vm.events[i].eventName){
        if(new Date(vm.events[i].date1) > fecha){
          edit = true;
        }else{
          edit = false;
        }

      }
    }
    return edit;
  }
  vm.editCompetition = function(item){

      vm._id = item._id,
      vm.competitionNumber = Number(item.competitionNumber),
      vm.eventBelongs = item.eventBelongs,
      vm.competitionAge = item.competitionAge,
      vm.competitionGenre = item.competitionGenre,
      vm.competitionWeight = item.competitionWeight
  }

  //editar perfil de administrador
  vm.getCurrentAdmin = function(admin){
    console.log(admin);
    vm.editAdminProfile = true;
    vm.currentUser.password = admin.password;
    vm.currentUser.email = admin.email;
    vm.currentUser.phone = admin.phone;
  }

  vm.updateCurrentAdmin = function (){
    var editAdmin ={
      _id : vm.currentUser._id,
      id: vm.currentUser.id,
      name: vm.currentUser.name,
      surName: vm.currentUser.surName,
      firstName: vm.currentUser.firstName,
      lastName: vm.currentUser.lastName,
      genre: vm.currentUser.genre,
      birthday: vm.currentUser.birthday,
      nationality: vm.currentUser.nationality,
      phone: vm.currentUser.phone,
      status: vm.currentUser.status,
      email: vm.currentUser.email,
      photo: vm.currentUser.photo,
      role: vm.currentUser.role,
      password: vm.currentUser.password
    }
    console.log(editAdmin);
    userService.updateUsers(editAdmin).then(function(response){
      console.log(response);
      $http.get('http://localhost:3000/api/get_all_Users')
      .catch(function(err){
        console.log(err);
      });
    });
    vm.editAdminProfile = false;
  }

}

})();
