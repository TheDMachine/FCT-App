(function(){
angular
  .module('app')
  .service('logService', logService);
  //Funcion costructora del servicio logService
  function logService($http,$cookies){
    var publicApi ={
      createLog:_newLog,
      showLog:_getLog
    }
    //retorna los metodos del servicio del log.
    return publicApi;

    //Se obitene todos los logs que tiene el local storage
    function _getLog(){
    //   return JSON.parse(localStorage.getItem('logStorage'));
    return $http.get('http://localhost:3000/api/get_log');
    }
    //Crea un nuevo log para ser visualizado por el administrador
    function _newLog(pFlag,pWhatDo){
      var objToPush;
    //   var actionbyUser = $cookies.getOject('currentUserActive');
    //   if(actionbyUser == undefined || actionbyUser == null) {
          actionbyUser = 'User No Encontrado';
    //   }
      //Depende del vlaor de la bandera númerica no booleana crea el log dependiendo de ello.
      //Si la bandera es un false implica que va al default y eso realizara un log de que fallo realizar la acción.
      switch (pFlag) {
        case 0://Crear.
        objToPush = {
          action: 'Crear',
          actionBy:actionbyUser,
          resultAction: pWhatDo,
          timestamp: new Date()
        }
        //Guarda el objeto en el localStorage por el momento.
        return $http.post('http://localhost:3000/api/set_log', objToPush);
        break;
        case 1://Modificar.
        objToPush = {
          action: 'Modificar',
          actionBy:actionbyUser,
          resultAction: pWhatDo,
          timestamp: new Date()
        }
        //Guarda el objeto en el localStorage por el momento.
        return $http.post('http://localhost:3000/api/set_log', objToPush);
        break;
        case 2://Eliminar de forma logica.
        objToPush = {
          action: 'Eliminar',
          actionBy:actionbyUser,
          resultAction: pWhatDo,
          timestamp: new Date()
        }
        //Guarda el objeto en el localStorage por el momento.
        return $http.post('http://localhost:3000/api/set_log', objToPush);
        break;
        default:
        objToPush = {
          action: 'Error',
          actionBy:actionbyUser,
          resultAction: pWhatDo,
          timestamp: new Date()
        }
        //Guarda el objeto en el localStorage por el momento.
        return $http.post('http://localhost:3000/api/set_log', objToPush);
      }
    }
}
})();
