(function() {
  'use strict';
  angular
  .module('app')
  .controller('globalConfigCtrl',globalConfigCtrl);
  function globalConfigCtrl(settingsService, $mdDialog) {
    var vm = this;
    vm.showAlert= function(pMessage, pFeedback) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title(pFeedback)
          .textContent(pMessage)
          .ariaLabel()
          .ok('Gracias!')
          .targetEvent()
      );
    };
    function init() {
      vm.stt = settingsService.getSettings();
      vm.editMem = {};
      vm.modDisplay = false;
      vm.isEdit = false;
      vm.isNew = false;
      console.log(vm.stt);
    }init();
    vm.editMember = function(pMemberToEdit) {
      console.log(pMemberToEdit);
      console.log(vm);
      vm.editMem.name = pMemberToEdit.name;
      vm.editMem.position = pMemberToEdit.position;
      vm.editMem.email = pMemberToEdit.email;
      vm.editMem.phone = pMemberToEdit.phone;
      vm.isEdit = true;
      vm.modDisplay = true;
    }
    //Limpia el formulario de actualización y /o creación de miembro
    function clearForm(pObjectToFrm) {
      for (var index in pObjectToFrm) {
        pObjectToFrm[index] = '';
      }
    }
    //Abre el formulario
    vm.addNewDirect = function() {
      vm.modDisplay = true;
      vm.isNew = true;
    }
    //crea el miembro nuevo de la junta directiva
    vm.createMember = function(pNewMember) {
      settingsService.updateDirect(pNewMember);
      vm.showAlert('El miembro llamado '+ pNewMember.name+' ha sido creado exitosamente.','¡Nuevo miembro de la junta directiva!');
      init();
      clearForm(vm.editMem);
    }
    vm.editParams = function() {

    }
    vm.updateMember = function(pMemberToUpdate) {
      settingsService.updateDirect(pMemberToUpdate);
      vm.showAlert('El miembro llamado '+ pMemberToUpdate.name+' ha sido actualizado exitosamente.','¡Actualización de miembro en la junta directiva!');
      init();
      clearForm(vm.editMem);
    }
  }
}());
