(function(){
angular
  .module('app')
  .service('logService', logService);
  //Funcion costructora del servicio logService
  function logService(){
    var publicApi ={
      createLog:_newLog,
      showLog:_getLog
    }
    //retorna los metodos del servicio del log.
    return publicApi;

    //Se obitene todos los logs que tiene el local storage
    function _getLog(){
      return JSON.parse(localStorage.getItem('logStorage'));
    }
    //Guarda el nuevo log en el local storage
    function _setLog(newData){
      var log = _getLog();
      if(log == null){
        log = [];
      }
      log.push(newData);
      localStorage.setItem('logStorage',JSON.stringify(log));
    }
    //Crea un nuevo log para ser visualizado por el administrador
    function _newLog(pFlag, pWhoMake, pWhatDo){
      var objToPush;
      //Depende del vlaor de la bandera númerica no booleana crea el log dependiendo de ello.
      //Si la bandera es un false implica que va al default y eso realizara un log de que fallo realizar la acción.
      switch (pFlag) {
        case 0://Crear.
        objToPush = {
          action: 'Crear',
          actionBy:pWhoMake,
          resultAction: pWhatDo,
          timestamp: new Date();
        }
        //Guarda el objeto en el localStorage por el momento.
        _setLog(objToPush);
        break;
        case 1://Modificar.
        objToPush = {
          action: 'Modificar',
          actionBy:pWhoMake,
          resultAction: pWhatDo,
          timestamp: new Date();
        }
        //Guarda el objeto en el localStorage por el momento.
        _setLog(objToPush);
        break;
        case 2://Eliminar de forma logica.
        objToPush = {
          action: 'Eliminar',
          actionBy:pWhoMake,
          resultAction: pWhatDo,
          timestamp: new Date();
        }
        //Guarda el objeto en el localStorage por el momento.
        _setLog(objToPush);
        break;
        default:
        objToPush = {
          action: 'Error',
          actionBy:pWhoMake,
          resultAction: pWhatDo,
          timestamp: new Date();
        }
        //Guarda el objeto en el localStorage por el momento.
        _setLog(objToPush);
      }
    }
}
})();
