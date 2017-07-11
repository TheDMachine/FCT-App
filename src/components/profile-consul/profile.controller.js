(function() {
  'use strict';
  angular
  .module('app')
  .controller('profileCtrl',profileConsulCtrl);

//Función constructura de profile
  function profileConsulCtrl(userService, AuthService, $stateParams) {
    var vm = this;
    //función para iniciar el controlador.
    function init(){
      vm.currentUser = $stateParams.cuser;
   }init();
   vm.updateProfile = function (vmUserToUpdate) {
    var fotoEdit = document.querySelect('#photo').files[0];
     if(fotoEdit == undefined && fotoEdit ==  null){
       vmUserToUpdate.photo = vm.currentUser.photo;
     }
     userService.updateConsul(vmUserToUpdate);
     init();
     $location.path('/admin');
   }
  }
}());
