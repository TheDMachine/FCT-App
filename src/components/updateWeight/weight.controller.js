(function() {
  'use strict';
  angular
  .module('app')
  .controller('updateWeightController', updateWeightController);

  //Función del controlador
  function updateWeightController(userService) {
    var vm = this;
    function init(){
      vm.user = {};
    }

    //Función llama a actualizar peso en el service.
    vm.updateWeigth = function(pUserToUpdate) {
      userService.updateWeigth(pUserToUpdate);
    }
  }
})();
