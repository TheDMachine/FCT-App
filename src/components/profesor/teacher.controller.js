(function(){
  'use strict';
  angular
  .module('app')
  .controller('teacherCtrl', teacherCtrl);

  function teacherCtrl ($scope, AuthService, $location, $cookies, userService, $mdDialog, imageService, eventService, estabInfoService, academyServices, sponsorService, logService, $http) {
  	/*Sidenav functionality*/
 	var originatorEv;
  var vm = this;
  vm.newPassword = false;
  vm.currentUser = '';
  vm.selected = 0;
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
    vm.userActive = false;
    vm.showCompetition = false;
    vm.competitionsToShow = [];
    vm.fights = [];
    vm.pairFights = [];
    vm.ready = false;


  function init() {
    vm.currentUser = userService.findUserTeacher(userService.getCookie());
    console.log(vm.currentUser);
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
        console.log(vm.competitions);
        console.log(vm.users)
        $http.get('http://api.population.io:80/1.0/countries').then(function(data){
          console.log(data);
          vm.countries = data.data.countries;
        },function(err){
          console.log(err);
        })
      }init();

    $scope.showPrompt = function() {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('Bienvenido ' + vm.currentUser.email + '!')
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
      userService.updateTeacher(vm.currentUser);
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
  };

  if(vm.currentUser.newUser == 1) {
    $scope.showPrompt();
  }

    // función que se llama así misma para indicar que sea lo primero que se ejecute

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
    /*End sidenav functionality
    -->>*/   

    vm.logOut = function() {
      AuthService.logOut();
    }
    function aceptedEvents() {
      // && vm.events[i].date1 => new Date()
        for (var i = 0; i < vm.events.length; i++) {
          if (vm.events[i].eventState === 'aprobado') {
            vm.acceptedEvents.push(vm.events[i]);
          }
        }
      }

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

      vm.changeViews = function(){
        vm.userActive = true;
        vm.selected = 5;
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
          kLoop:
          for(var k = 0; k < 4; k++){
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
        vm.competitionsToShow[i].fights = vm.fights;
      }
      console.log(vm.fights);
      vm.selected = 8;
    }

    vm.updatePoints = function(competitor, $index){
      if(competitor.points == 5){
        return
      }else{
        competitor.points += 1;
      }
    }
  };
})();
