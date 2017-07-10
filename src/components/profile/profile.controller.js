(function() {
  'use strict';
  angular
  .module('app')
  .controller('profileCtrl',profileCtrl);

//Función constructura de profile
  function profileCtrl(userService, AuthService, $stateParams) {
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
     userService.updateUser(vmUserToUpdate);
     init();
     $location.path('/profile');
   }
  }
}());
