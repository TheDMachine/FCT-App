(function(){
  'use strit'
  angular
  .module('app')
  .controller('adminCtrl', adminCtrl);
  //adminCtrl.$inyector = ['eventService','imageService','Upload','userService','academyServices'];
  function adminCtrl($scope, $http, $state, $cookies, eventService, imageService, Upload, academyServices, logService, userService, sponsorService, AuthService, estabInfoService) {

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
    vm.events = eventService.getEvents();
    vm.weights = estabInfoService.getWeight();
    vm.categories = estabInfoService.getCategories();
    vm.acceptedEvents = [];

    function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        vm.originatorEv;
        vm.academy = academyServices.getAcademy();
        vm.weights = estabInfoService.getWeight();
        vm.events = eventService.getEvents();
        vm.competitions = eventService.getCompetitions();
        aceptedEvents();
        vm.event = {};
        vm.sponsors = sponsorService.getSponsors();
        vm.teacher = {};
        vm.teachers = userService.getTeachers();
        vm.sponsor = {};
        vm.users = userService.getUsers();
        vm.log = logService.showLog();
        vm.belts = estabInfoService.getBelts();
        vm.to = new Date();
        vm.to2 = new Date();
        vm.weights = estabInfoService.getWeight();
        vm.categoriesAge = estabInfoService.getCategories();
        vm.sponsor = {
          sponsorName : vm.sponsorName,
          sponsorCompany : vm.sponsorCompany,
          sponsorType : vm.sponsorType,
          sponsorMoney : vm.sponsorMoney,
          sponsorPhoto : vm.sponsorPhoto
        };
        vm.events = eventService.getEvents();
        vm.teachers = userService.getTeachers();
        vm.countries;
        $http.get('http://api.population.io:80/1.0/countries').then(function(data){
          console.log(data);
          vm.countries = data.data.countries;
        },function(err){
          console.log(err);
        })
      }init();


      /*Sidenav*/
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
      var bError = false;
      console.log(pNewEvent.time1);
      if (vm.events.length == 0) {
        eventService.setEvents(pNewEvent);
        document.querySelector('.ErrorMessage').innerHTML = 'El evento se registró exitosamente';
        clean();
        init();
      }else{
        for (var i = 0; i < vm.events.length; i++) {
          if (pNewEvent.eventName == vm.events[i].eventName) {
            bError =true;
          }
        }
        if(bError == false){
           eventService.setEvents(pNewEvent);
          document.querySelector('.SuccessMessage').innerHTML = 'El evento se registró exitosamente';
          clean();
          init();
        }else{
          document.querySelector('.ErrorMessage').innerHTML = 'El evento ya existe';
        }
      }
    };

      // Funciones para guardar patrocinadores

    vm.saveSponsor= function(pNewSponsor) {
      sponsorService.setSponsors(pNewSponsor);
      vm.error = false;
      /*if (vm.error === true) {
        document.querySelector('.ErrorMessage').innerHTML = 'El patrocinador ya existe';
        }else{
        document.querySelector('.SuccessMessage').innerHTML = 'El patrocinador se registró exitosamente';
      }*/
      console.log(sponsorService.getSponsors());
      clean();
      init();

    }
    // Función para guardar

      vm.presaveSponsor = function(pNewSponsor) {
        console.log(pNewSponsor);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
        .success(function(data){
        pNewSponsor.photo = data.url;
        vm.saveSponsor(pNewSponsor);
         });
      }
      // vm.error = false;
      vm.preSaveConsul = function(pNewConsult) {
        console.log(pNewConsult);
        // vm.cloudObj.data.file = document.getElementById("photo").files[0];
        // Upload.upload(vm.cloudObj)
        //   .success(function(data){
        //     pNewConsult.photo = data.url;
             vm.createNewEvent(pNewConsult);
        //   });
        }

          // Función para imprimir datos en el formulario de patrocinadores
    vm.getSponsorInfo = function(pSponsor) {
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

    vm.updateSponsor = function() {
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
      vm.event.orgType = pEvent.orgType;
      vm.event.orgName = pEvent.orgName;
      vm.event.description = pEvent.description;

      vm.updateDisable = false;
      vm.submitDisable = true;
    }

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

      vm.submitDisable = false;
      vm.updateDisable = true;
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
      // && vm.events[i].date1 => new Date()
        for (var i = 0; i < vm.events.length; i++) {
          if (vm.events[i].eventState === 'aprobado') {
            vm.acceptedEvents.push(vm.events[i]);
          }
        }
      }

    vm.createNewConsult = function(pNewConsul){
      console.log("El objeto con imagen es %o",pNewConsul);
      console.log("Gracias, ha sido creado un nuevo represetante de consejo %o",pNewConsul);
      var bFlag = userService.createConsul(pNewConsul); //Crea el nuevo represetante de consejo.
      // var temDataZero = $cookies.get('currentUserActive'); // Obtiene el usuario logeado.
      // if(bFlag == false){// si retorna algun boleano implica que fallo que en su defecto seria que ya existe el represetante de consejo.
      //   document.getElementById('errorConsul').innerHTML = 'El represetante de consejo ya existe';
      //   //te manda a la página uno del registro.
      //   $state.go('admin.partOne');
      //   var tempDataOne = 'fallo al crear a '+pNewConsul.firstName;
      //   logService.createLog(false,temDataZero,tempDataOne);
      // }else{
      //   var tempDataOne = 'Creado con exito '+pNewConsul.firstName;
      //   logService.createLog(0,temDataZero,tempDataOne);
      //   document.getElementById('feedbackMesage').innerHTML = 'El represesante ha sido creado exitoxamente';
      // }
    }

    // Función para pre guardar datos del profesor

    vm.presaveTeacher = function(pNewTeacher) {
        console.log(pNewTeacher);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            pNewTeacher.photo = data.url;
            vm.createNewTeacher(pNewTeacher);
          })
          .catch(function(error){
            console.log(error);
          })
      }

    // Función para guardar profesores

    vm.createNewTeacher = function(pNewTeacher){
      userService.setTeachers(pNewTeacher);
      clean();
      init();
    }

 // Función para imprimir datos del profesor en la lista
    vm.getInfoTeacher = function(teacher) {
      vm.teacher.id = teacher.id;
      vm.teacher.firstName = teacher.firstName;
      vm.teacher.secondName = teacher.secondName;
      vm.teacher.firstLastName = teacher.firstLastName;
      vm.teacher.secondLastName = teacher.secondLastName;
      vm.teacher.phone = teacher.phone;
      vm.teacher.email = teacher.email;
      vm.teacher.bornhDate = teacher.bornhDate;
      vm.teacher.gender = teacher.gender;
      vm.teacher.nationality = teacher.nationality;
      vm.teacher.academy = teacher.academy;
      vm.teacher.grade = teacher.grade;
      vm.teacher.photo = teacher.photo;

      init()
    }

    // Función para limpiar campos

    function clean() {
      vm.event='';
    }

    /*Final sidenav
    -->>*/

     //funcion para guardar informacion de academia

     vm.createAcademy = function(){
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
    //funcion para guardar informacion del alumno
    vm.createStudent = function(){
      var newUser = {
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
        tournamentsWins: vm.tournamentsWins
      };
      console.log(newUser);
      userService.setUsers(newUser);
      cleanStudent();
      init();
    }

    //funcion para limpiar los input del alumno
    function cleanStudent(){
      vm.id = '',
      vm.birthday = '',
      vm.firstName = '',
      vm.secondName = '',
      vm.firstLastName = '',
      vm.secondLastName = '',
      vm.genre = '',
      vm.weight = '',
      vm.height = '',
      vm.nationality = '',
      vm.phone = '',
      vm.email = '',
      vm.attendAcademy = '',
      vm.teacher = '',
      vm.belt = '',
      vm.category = '',
      vm.tournaments = '',
      vm.tournamentsWins = ''
    }

    //funcion para editar alumno
    vm.getStudent = function(student){
      vm.id = student.id,
      vm.birthday = student.birthday,
      vm.firstName = student.firstName,
      vm.secondName = student.secondName,
      vm.firstLastName = student.firstLastName,
      vm.secondLastName = student.secondLastName,
      vm.genre = student.genre,
      vm.weight = student.weight,
      vm.height = student.height,
      vm.nationality = student.nationality,
      vm.phone = student.phone,
      vm.email = student.email,
      vm.attendAcademy = student.attendAcademy,
      vm.teacher = student.teacher,
      vm.belt = student.belt,
      vm.category = student.category,
      vm.tournaments = student.tournaments,
      vm.tournamentsWins = student.tournamentsWins
    }

    //funcion para guardar alumno editada
    vm.updateStudent = function(){
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
        tournamentsWins: vm.tournamentsWins
      }
      userService.updateUsers(editstudent);
      init();
      cleanStudent();
    }

    //funcion para guardar competencia
    vm.createCompetition = function(){
      var newCompetition = {
        competitionNumber: vm.competitionNumber,
        eventBelongs: vm.eventBelongs,
        competitionGenre: vm.competitionGenre,
        competitionBelt: vm.competitionBelt,
        competitionWeight: vm.competitionWeight,
        arrayObject : [vm.competitors]
      }
      newCompetition.competitors = [];
      newCompetition.competitors.push(newCompetition.arrayObject[0]['0']);
      newCompetition.competitors.push(newCompetition.arrayObject[0]['1']);
      newCompetition.competitors.push(newCompetition.arrayObject[0]['2']);
      newCompetition.competitors.push(newCompetition.arrayObject[0]['3']);
      newCompetition.competitors.push(newCompetition.arrayObject[0]['4']);
      console.log(newCompetition);
      console.log(newCompetition.competitors)
      eventService.setCompetitions(newCompetition);
      cleanStudent();
      init();
    }

  }

})();
