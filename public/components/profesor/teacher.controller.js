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
    vm.userActive = false;
    vm.showCompetition = false;
    vm.competitionsToShow = [];
    vm.fights = [];
    vm.pairFights = [];
    vm.ready = false;
    vm.editTeacherProfile = false;
    vm.today = new Date();
    vm.acceptedEvents = [];

  function init() {
    vm.currentUser = $cookies.get('currentUserActive');
    vm.currentUser = JSON.parse(vm.currentUser);
    vm.selected = 2;
        vm.academy = academyServices.getAcademy();
        vm.weights = estabInfoService.getWeight();
        vm.events = eventService.getEvents();
        vm.competitions = eventService.getCompetitions();
        acceptedEvents();
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
      userService.updateTeacher(vm.currentUser)
      .then(function(response){
        console.log(response);
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

    // Función para filtrar la tabla de consulta de eventos
    function acceptedEvents() {
      vm.events = eventService.getEvents();
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
        attendAcademy: vm.academy,
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
      vm.academy = '',
      vm.teacher = '',
      vm.belt = '',
      vm.category = '',
      vm.tournaments = '',
      vm.tournamentsWins = ''
    }

    //funcion para editar alumno
    vm.getStudent = function(student){
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
      vm.student.academy = user.academy;
      vm.student.teacher = user.teacher;
      vm.student.belt = user.belt;
      vm.student.category = user.category;
      vm.student.tournaments = user.tournaments;
      vm.student.tournamentsWins = user.tournamentsWins;
      vm.student.role = user.role;
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
        attendAcademy: vm.academy,
        teacher: vm.teacher,
        belt: vm.belt,
        category: vm.category,
        tournaments: vm.tournaments,
        tournamentsWins: vm.tournamentsWins,
        status: vm.status,
        role: vm.role
      }
      userService.updateUsers(editstudent);
      init();
      cleanTeacher();
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

    vm.showCompetition = function(competition, $index){
      for(var i = 0; i < vm.competitions.length; i++){
        if(competition.competitionNumber == vm.competitions[i].competitionNumber){
          vm.competitionsToShow[$index] = competition;
          for(var j = 0; j < vm.competitionsToShow[i].competitors.length; j++){
            vm.competitionsToShow[i].competitors[j].points = 0;
          }
        }
      }
      for(var i = 0; i < vm.competitionsToShow.length; i++){
        for(var j = 0; j < vm.competitionsToShow[i].competitors.length; j++){
          if(vm.competitionsToShow[i].competitors.length == 5){
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
        }
        vm.competitionsToShow[i].fights = vm.fights;
      }
      console.log(vm.fights);
      vm.selected = 8;
    }
    /*Editar profesor en perfil*/

    vm.getCurrentTeacher = function(teacher){
      vm.editTeacherProfile = true;
      vm.currentUser.password = teacher.password;
      vm.currentUser.email = teacher.email;
      vm.currentUser.phone = teacher.phone;
    }

    vm.updateCurrentTeacher = function(){
      var editTeacher = {
      _id : vm.currentUser._id,
      password : vm.currentUser.password,
      id : vm.currentUser.id,
      firstName : vm.currentUser.firstName,
      secondName : vm.currentUser.secondName,
      firstLastName : vm.currentUser.firstLastName,
      bornhDate : vm.currentUser.bornhDate,
      gender : vm.currentUser.gender,
      nationality : vm.currentUser.nationality,
      academy : vm.currentUser.academy,
      grade : vm.currentUser.grade,
      phone : vm.currentUser.phone,
      email : vm.currentUser.email,
      photo : vm.currentUser.photo,
      newUser : vm.currentUser.newUser
      }
      userService.updateTeacher(editTeacher)
      .then(function(response){
        console.log(response);
        $http.get('http://localhost:3000/api/get_all_teachers')
        .then(function(response){
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i].id == vm.currentUser.id){
              $cookies.putObject('currentUserActive', response.data[i]);
              vm.currentUser = $cookies.get('currentUserActive');
              vm.currentUser = JSON.parse(vm.currentUser);
            }
          }
        })
        .catch(function(err){
          console.log(err);
        });
      })
      .catch(function(err){
        console.log(err);
      });
      vm.editTeacherProfile = false;
    }

    vm.updatePoints = function(competitor, $index){
      if(competitor.points == 5){
        return
      }else{
        competitor.points += 1;
        vm.ready = true;
        vm.fights[$index].push(vm.ready);
        console.log(vm.fights);
      }
    }
  };
})();
