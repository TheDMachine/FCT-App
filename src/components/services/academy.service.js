(function(){
  angular
  .module('app')
  .service('academyServices', academyServices);

  function academyServices() {
    var academy = [];
    var publicAPI = {
      setAcademy: _setAcademy,
      getAcademy: _getAcademy,
      updateAcademy : _updateAcademy,
      searchAcademy: _searchAcademy
    };
    return publicAPI;
    //Guardar academia
    function _setAcademy(newAcademy){
      var academyList = _getAcademy();
        academyList.push(newAcademy);
        localStorage.setItem('lsAcademyList', JSON.stringify(academyList));
    }
    //buscar si la academia se repite
    function _searchAcademy(nameAcademy){
      var academyList = _getAcademy();
      for (var i = 0; i < academyList.length; i++) {
        if (nameAcademy == academyList[i].name) {
          return academyList[i];
        }
      }
      return false;
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
