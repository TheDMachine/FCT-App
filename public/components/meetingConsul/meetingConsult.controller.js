(function() {
  'use strict';
  angular
  .module('app')
  .controller('meetingCtrl', meetingCtrl);
  function meetingCtrl(eventService) {
    var vm = this;
    vm.propList = eventService.getPropose();
    vm.newAppointment = function(pNewAppointment) {
      pNewAppointment.dateToMeet = new Date(pNewAppointment.dateToMeet);
      console.log(pNewAppointment);
    }
  }
}());
