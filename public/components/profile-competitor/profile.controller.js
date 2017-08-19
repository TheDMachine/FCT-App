(function() {
  'use strict';
  angular
  .module('app')
  .controller('profileCtrl',profileCtrl);

//Función constructura de profile
  function profileCtrl(userService, AuthService, $stateParams, $mdDialog, $location, $cookies) {
    var vm = this;
    //función para iniciar el controlador.
    function init(){
      vm.isMod = false;
      vm.currentUser = $stateParams.cuser;
      if(vm.currentUser == 'No encontrado el competitor'){
        vm.currentUser = $cookies.getObject('currentUserActive');
        console.log(vm.currentUser);
      }
   }init();
   vm.updateProfile = function (vmUserToUpdate) {
    var fotoEdit = document.getElementById('#photo').files[0];
     if(fotoEdit == undefined && fotoEdit ==  null){
       vmUserToUpdate.photo = vm.currentUser.photo;
     }
     userService.updateUser(vmUserToUpdate);
     init();
     $location.path('/profile');
   }
   vm.editProfile = function(pUserToUpdate,pParamToEdit) {
   // Appending dialog to document.body to cover sidenav in docs app
   var confirm = $mdDialog.prompt()
     .title('Actualizando información')
     .textContent('Actualizando' -pParamToEdit)
     .placeholder('Escribe el nuevo dato.')
     .ariaLabel(pParamToEdit)
     .ok('Actualizar')
     .cancel('Cancelar');

   $mdDialog.show(confirm).then(function(result) {
     //settingsService.e
     console.log(result);
     vm.updateUser(pUserToUpdate,result);
     init();
   }, function() {
     vm.status = 'Noo Hubo un problema.';
   });
 };
  //Función para actualizar el peso
   vm.updateWeigth = function(pUserToWeight) {
     userService.updateWeigth(pUserToWeight);
   }
  }
}());
