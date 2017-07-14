(function(){
  angular
    .module('app')
    .controller('eventsCtrl', eventsCtrl);
    function eventsCtrl($scope, $location, eventService){ //se inyecta el service userService en el controlador para que se tenga acceso
      //controlador
      var vm = this; //binding del controlador con el html, solo en el controlador
      vm.today = new Date();

      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        vm.events = eventService.getEvents();
        vm.to = new Date();
       }init();

       // Función para devolverse al landing
        vm.return = function(event){
        event.preventDefault();
        $location.path('/landing');
       };


    }

     //se establece un objeto de angular normal

})();
