angular.module('app')
  .controller('loginCtrl', loginCtrl)
    function loginCtrl(AuthService, $scope){
    var vm = this;
    vm.changePassword = false;
    vm.successRecovery = false;
    function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
      vm.email = '';
      vm.id = '';
      vm.password = '';
    }init();
    vm.login = function(){
      AuthService.getCredencials(vm.id,vm.password);
    }

    vm.recoverPassword = function(id){
      AuthService.recoverPassword(id);
        /*vm.changePassword = false;
        vm.successRecovery = true;*/
    }
  };