(function(){
  angular
  .module('app')
  .service('academyServices', academyServices);

  function academyServices() {
    var academy = [];
    var publicAPI = {
      setAcademy: _setAcademy,
      getAcademy: _getAcademy,
      updateAcademy : _updateAcademy
    };
    return publicAPI;
    //Guardar informacion
    function _setAcademy(newAcademy){
      var academyList = _getAcademy();
      var position = searchAcademy(newAcademy);
      if (position == -1) {
        academyList.push(newAcademy);
        localStorage.setItem('lsAcademyList', JSON.stringify(academyList));
      }
    }
    //buscar si la academia se repit
    function searchAcademy(newAcademy){
      var academyList = _getAcademy();
      var position = -1;

      for (var i = 0; i < academyList.length; i++) {
        if (newAcademy.name == academyList[i].name) {
          position = i;
        }
      }
      return position;
    }
    //muestra la informacion mas actual
    function _getAcademy(){
      var academyList = JSON.parse(localStorage.getItem('lsAcademyList'));
      if(academyList == null){
        academyList = academy;
      }
      return academyList;
    }
    //editar la informacion de la academian ya registrada
    function _updateAcademy(editAcademy){
      var academyList = _getAcademy();
      for(var i = 0; i < academyList.length; i++){
        if(academyList[i].name == editAcademy.name){
          academyList[i] = editAcademy;
        }
      }
      localStorage.setItem('lsAcademyList', JSON.stringify(academyList));
    }
  }
})();
