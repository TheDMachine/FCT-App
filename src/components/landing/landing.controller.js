(function(){
  angular
    .module('app')
    .controller('landingCtrl', landingCtrl);
    function landingCtrl($scope, $location){ //se inyecta el service userService en el controlador para que se tenga acceso
      //controlador
      var vm = this; //binding del controlador con el html, solo en el controlador

      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        
       }init();

       vm.logIn = function(event){
        event.preventDefault();
        $location.path('/login');
       }

       vm.reserve = function(event){
        event.preventDefault();
        $location.path('/reserve');
       }

       vm.cancel = function(event){
        event.preventDefault();
        $location.path('/cancelRsv');
       }

       vm.events = function(event){
        event.preventDefault();
        $location.path('/events');
       }

    }

     //se establece un objeto de angular normal

})();
