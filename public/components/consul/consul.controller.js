(function(){
  'use strict';
  angular
  .module('app')
  .controller('consulCtrl', consulCtrl);
  function consulCtrl($scope, eventService, imageService, Upload, estabInfoService, $mdDialog, $location, $cookies, userService, AuthService) {
 	var originatorEv;
  var vm = this;
  vm.cloudObj = imageService.getConfiguration();

  //Limpia el formulario.
  function clearForm(pObjectToFrm) {
    for (var index in pObjectToFrm) {
      pObjectToFrm[index] = '';
    }
  }
  vm.logOut = function() {
    AuthService.logOut();
  }
function init() {
  vm.currentUser = $cookies.getObject('currentUserActive');
  vm.proposes = eventService.getPropose();
  vm.propose = {};
  vm.categoriesAge = estabInfoService.getCategories();
  if(vm.proposes.length === 0) {
    vm.messageToHave = 'No existen propuestas de eventos para revisar';
  }
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
      userService.updateTemporalPassword(vm.currentUser)
      .then(function(response){
        console.log(response);
        $cookies.remove('currentUserActive');
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
//Modald para cargar el Modald
vm.showAlertPropose = function(pMessage, pFeedback) {
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
    //Funcion para guardar la  imagen
    vm.presavePropose = function(pNewPropose) {
        console.log(pNewPropose);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data) {
            pNewPropose.photo = data.url;
            vm.createNewPropose(pNewPropose);
          })
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
    //Funcion para crear la propuesta.
    vm.createNewPropose = function(pNewPropose) {
      pNewPropose.status ="En Revisión";
      var err= eventService.setPropose(pNewPropose);
      console.log(pNewPropose);
      //Comprueba si existe error o no
      if(err) {
        vm.showAlertPropose('¡Registro de Propuesta!','La propuesta ha fallado, ya existe la propuesta.');
        clearForm(vm.propose);
        init();
      } else {
        vm.showAlertPropose('¡Registro de Propuesta!','La propuesta ha sido registrada, esta a la espera de ser revisada.');
        clearForm(vm.propose);
        init();
      }
    }

    //Funcion para aceptar la propuesta
    vm.aceptedPropose = function(pAcceptedPropose) {
      // console.log("La propuesta del evento es %o", pAcceptedPropose);

      //Objeto para mandar el nuevo evento.
      var newEvent = {
        eventName: pAcceptedPropose.proposeName,
        eventType: pAcceptedPropose.proposeType,
        respPerson: pAcceptedPropose.respPerson,
        date1: pAcceptedPropose.date1,
        date2:pAcceptedPropose.date2,
        time1: pAcceptedPropose.time1,
        time2: pAcceptedPropose.time2,
        selectCategories: pAcceptedPropose.selectCategories,
        costInsc: pAcceptedPropose.costInsc,
        location: pAcceptedPropose.location,
        latitud: pAcceptedPropose.latitude,
        longitude: pAcceptedPropose.longitude,
        seats: pAcceptedPropose.seats,
        tickets: pAcceptedPropose.tickets,
        contactName: pAcceptedPropose.contactName,
        contactPhone: pAcceptedPropose.contactPhone,
        photo:  pAcceptedPropose.photo,
        status: 'Habilitado'

      };
      // console.log("El evento nuevo a de ser %o", newEvent);

      //Función para crear un nuevo evento.
      eventService.updateProposeToEvent(newEvent);
      init();
    }
    vm.showPrompt = function(pObjectToAddResult) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('!Propuesta rechazada!')
      .textContent('La propuesta rechazada es: ' +pObjectToAddResult.promoseName)
      .placeholder('Razón del rechazo.')
      .ariaLabel('Propuesta rechazada')
      .ok('Justificar rechazo')
      .cancel('Cancelar');

    $mdDialog.show(confirm).then(function(result) {
      //settingsService.e
      pObjectToAddResult.motivationRejected = result;
      console.log(result);
      vm.rejectedPropose(pObjectToAddResult);
      init();
    }, function() {
      vm.status = 'Mensaje no valido.';
    });
    };
    //Función para rechazar la propuesta.
    vm.rejectedPropose= function(pRejectedPropose) {
      pRejectedPropose.status ="Rechazada";
      eventService.updateReject(pRejectedPropose);
      init();
      console.log(pRejectedPropose);
    }
   }
})();
