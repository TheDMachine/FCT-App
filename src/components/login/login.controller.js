angular.module('app')
  .controller('loginCtrl', loginCtrl)
    function loginCtrl(AuthService, $scope){
    var vm = this;
    function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
      vm.email = '';
      vm.password = '';
    }init();
    vm.login = function(){
      AuthService.getCredencials(vm.email,vm.password);
    }
  };