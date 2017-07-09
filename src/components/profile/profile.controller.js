(function() {
  'use strict';
  angular
  .module('app')
  .controller('profileCtrl',profileCtrl);

//Función constructura de profile
  function profileCtrl(userService, AuthService) {
    var vm = this;
    //función para iniciar el controlador.
    function init(){
     vm.currentUser =userService.searchUser(AuthService.getCookie());
   }init();
  }
}());
