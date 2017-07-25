(function(){
  'use strict';
  angular
  .module('app')
  .controller('consulCtrl', consulCtrl);
  function consulCtrl($scope, eventService, imageService, Upload, estabInfoService, $mdDialog, $location) {
 	var originatorEv;
  var vm = this;
  vm.cloudObj = imageService.getConfiguration();

  //Limpia el formulario.
  function clearForm(pObjectToFrm) {
    for (var index in pObjectToFrm) {
      pObjectToFrm[index] = '';
    }
  }
function init() {
  vm.proposes = eventService.getPropose();
  vm.propose = {};
  vm.categoriesAge = estabInfoService.getCategories();
}init();
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
      eventService.setEvents(newEvent);
      init();
    }
   }
})();
