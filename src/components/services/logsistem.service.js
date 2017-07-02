(function(){
angular
  .module('app')
  .service('logService', logService);

  function logService(){
    var publicApi ={
      createLog:_newLog,
      showLog:_getLog
    }
    return publicApi;
    function _getLog(){
      return JSON.parse(localStorage.getItem('logStorage'));
    }
    function _setLog(newData){
      var log = _getLog();
      if(log == undefined){
        log = [];
      }
      log.push(newData);
      localStorage.setItem('logStorage',JSON.stringify(log));
    }
    function _newLog(pFlag, pWhoMake, pWhatDo){
      var objToPush;
      switch (pFlag) {
        case 0://Crear.
        objToPush = {
          action: 'Crear',
          actionBy:pWhoMake,
          resultAction: pWhatDo,
          timestamp: new Date()
        }
        _setLog(objToPush);
        break;
        case 1://Modificar.
        objToPush = {
          action: 'Modificar',
          actionBy:pWhoMake,
          resultAction: pWhatDo,
          timestamp: new Date()
        }
        break;
        case 2://Eliminar de forma logica.
        objToPush = {
          action: 'Eliminar',
          actionBy:pWhoMake,
          resultAction: pWhatDo,
          timestamp: new Date()
        }
        break;
      }
    }
}
})();
