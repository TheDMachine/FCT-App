(function() {
  'use strict';
  angular
    .module('app')
    .service('meetingService', meetingService);
    function meetingService(authService, logService) {
      var publicApi, appointments, userActive;
      appointments = [];
      publicApi = {
        setAppointment: _setAppointment,
        getAppointment : _getAppointment
      }
      return publicApi;
      //obtengo el usuario logeado
      userActive = authService.getCookie();
      //funcion que valida la existencia con la fecha
      function _validDate(pDateToCheck) {
        var apt = _getAppointment;
        for (var i = 0; i < apt.length; i++) {
          if(apt[i].time == pDateToCheck) {
            return true;
          }else {
            return false;
          }
        }
      }//Función para establacer una reunión del consejo
      function _setAppointment(pNewAppointment) {
        var isValidDate = _validDate(pNewAppointment.time);
        if(isValidDate) {
          logService.createLog(false,'Represetante de consejo'+userActive, 'Fecha ya registrada');
          return true;
        } else{
          //crea el log de la cita
          logService.createLog(0,'Represetante de consejo'+userActive, pNewAppointment.time +'registrado');
          //guarda la cita
          localStorage.setItem('LSAppointments', JSON.stringify(pNewAppointment));
          return false;
        }
      }//Función para obtener las reuiones ya establecidas
      function _getAppointment() {
        var apt = JSON.parse(localStorage.getItem('LSAppointments'));
        if(apt == null) {
          apt = appointments;
        }
        return apt;
      }
    }
}());
