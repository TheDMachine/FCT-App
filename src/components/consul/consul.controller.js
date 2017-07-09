(function(){
  'use strict';
  angular
  .module('app')
  .controller('consulCtrl', consulCtrl);
  function consulCtrl($scope, eventService) {
 	var originatorEv;
  var vm = this;

function init() {
  vm.proposes = eventService.getPropose();
}init();
    //Funcion para guardar la  imagen
    vm.presavePropose = function(pNewPropose) {
        console.log(pNewPropose);
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data) {
            pNewPropose.photo = data.url;
            vm.createNewPropose(pNewPropose);
          })
          .catch(function(err) {
            console.log("Hubo problemas al subir la imagen de la propuesta %o",err);
          })
      }
      vm.processPropose= function(pProposeName, pFlag) {
        //pReceived es el usuario encontrado que
        var pReceived = eventService.findPropose(pProposeName);
        //true = aceptado
        // false = rechazado
        if(pFlag) {
          pReceived.status = 'Aceptado';
          eventService.setEvents(pReceived);
        }
      }
// Función para guardar
    vm.createNewPropose= function(pNewPropose) {
      pNewPropose.status = 'Pendiente';
      vm.error = false;
      vm.error = eventService.setPropose(pNewPropose);
      //Si es true implica que ya la propouesta de evento ya fue registrada.
      if (vm.error === true) {
        document.querySelector('.ErrorMessage').innerHTML = 'La propuesta ya fue registrada y esta en espera de ser revisada.';
      } else {//En caso contrario si es false implica que no existe y fue registrado correctamente el
        document.querySelector('.SuccessMessage').innerHTML = 'La propuesta se registro correctamente y esta pronta a ser revisada.';
      }
      console.log(eventService.getPropose());
      clean();
      init();
    }
   }
})();
