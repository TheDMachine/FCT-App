(function() {
  'use strict';
  angular
  .module('app')
  .controller('globalConfigCtrl',globalConfigCtrl);
  function globalConfigCtrl(settingsService) {
    var vm = this;
    function init() {
      vm.stt = settingsService.getSettings();
    }init();

  }
}());
