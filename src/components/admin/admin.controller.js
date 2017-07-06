(function(){
  'use strit'
  angular
  .module('app')
  .controller('adminCtrl', adminCtrl);

  function adminCtrl($scope, academyServices, userServices, estabInfoService, eventService){
    var vm = this;
    var originatorEv;
    vm.selected = 0;

    /*Inicio Sidenav*/

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

    function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        vm.academy = academyServices.getAcademy();
        vm.user = userServices.getUsers();
        vm.belts = estabInfoService.getBelts();
        vm.weights = estabInfoService.getWeight();
        vm.categoriesAge = estabInfoService.getCategories();
      }init();

     //funcion para guardar informacuon de academia
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
      userServices.setUsers(newUser);
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
      userServices.updateUsers(editstudent);
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
        competitor1: vm.competitor1,
        competitor2: vm.competitor2,
        competitor3: vm.competitor3,
        competitor4: vm.competitor4,
        competitor5: vm.competitor5
      }
      console.log(newCompetition);
      eventService.setCompetitions(newCompetition);
      cleanStudent();
      init();
    }

  }
})();
