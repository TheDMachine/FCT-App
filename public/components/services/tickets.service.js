(function(){
  'use strict';
  angular
  .module('app')
  .service('ticketService', ticketService);

  function ticketService($http){
    var reservations = [];
    var publicAPI = {
      setReservations : _setReservations,
      getsReservations : _getsReservations,
      updateReservation : _updateReservation
    };
    return publicAPI; // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que cuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones

    // Función para guardar eventos
    function _setReservations(pReservation){
      // var reservationsList = _getsReservations();
      // reservationsList.push(pReservation);
      // localStorage.setItem('lsReservationsList', JSON.stringify(reservationsList));
      // console.log(reservationsList);
      return $http.post('http://localhost:3000/api/save_reservations',pReservation);
    }

    // Función para extraer información de eventos
    function _getsReservations(){
      // var reservationsList = JSON.parse(localStorage.getItem('lsReservationsList'));
      // if(reservationsList == null){
      //   reservationsList = reservations;
      // }
      // return reservationsList;
      return $http.get('http://localhost:3000/api/get_all_reservations');
    }

    // Función para guardar modificación de información de eventos
    function _updateReservation(pCxlRsv){
      // var reservationsList = _getsReservations();
      // for(var i = 0; i < reservationsList.length; i++){
      //   if(reservationsList[i].confirmationNum == pCxlRsv.confirmationNum){
      //     reservationsList[i] = pCxlRsv;
      //   }
      // }
      // console.log(reservationsList);
      // localStorage.setItem('lsReservationsList', JSON.stringify(reservationsList));
      return $http.put('http://localhost:3000/api/update_reservations',pCxlRsv);
    }
    
  }

})();
