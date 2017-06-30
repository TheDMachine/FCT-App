(function(){
  angular
  .module('app')
  .service('academyServices', academyServices);

  function academyServices() {
    var academy = [];
    var publicAPI = {
      setAcademy: _setAcademy,
      getAcademy: _getAcademy
      //updateAcademy : _updateAcademy
    };
    return publicAPI;

    function _setAcademy(newAcademy){
      var academyList = _getAcademy();
      var position = searchAcademy(newAcademy);
      if (position == -1) {
        academyList.push(newAcademy);
        localStorage.setItem('lsAcademyList', JSON.stringify(academyList));
      }
    }

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

    function _getAcademy(){
      var academyList = JSON.parse(localStorage.getItem('lsAcademyList'));
      if(academyList == null){
        academyList = academy;
      }
      return academyList;
    }
  }
})();
