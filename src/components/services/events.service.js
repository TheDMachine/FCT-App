(function(){
  'use strict';
  angular
  .module('app')
  .service('eventService', eventService);

  function eventService(logService){
    var events = [];
    var proposes = [];
    var publicAPI = {
      setEvents : _setEvents,
      getEvents : _getEvents,
      updateEvent : _updateEvent,
      setPropose: _setProposeEvent,
      getPropose: _getProposeEvent,
      findPropose: _findProposeEvent
    };
    return publicAPI; // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que cuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones
    function _findProposeEvent(pEventToFind) {
      var proposesEvents = _getProposeEvent();
      for (var i = 0; i < proposesEvents.length; i++) {
        if(proposesEvents[i].eventName == pEventToFind){
          return proposesEvents[i];
        }
      }
    }
    //Functión para crear una propouesta de evento
    function _setProposeEvent(pObject) {
      var proposesStorage = _getProposeEvent();
      for (var i = 0; i < proposesStorage.length; i++) {
        if(proposesStorage[i].eventName == pObject.eventName) {
            logService.createLog(false, 'Usuario no registrado', 'Propuesta de evento ' +oObject.eventName + 'repetida.');
            return true;
        } else {
          proposesStorage.push(pObject);
          localStorage.setItem('lsProposeEvents', JSON.stringify(proposesStorage));
          logService.createLog(0, 'Usuario no registrado', 'Propuesta de evento ' +oObject.eventName);
          return false;
        }
      }
    }
    //Función para obtener las propuestas ya registradas con la función setProposeEvent
    function _getProposeEvent() {
      var proposeSrg = JSON.parse(localStorage.getItem('lsProposeEvents'));
      if(proposeSrg == null) {
        proposeSrg = proposes;
      }
      return proposeSrg;
    }

    // Función para guardar eventos
    function _setEvents(pEvent){
      var eventsList = _getEvents();

      eventsList.push(pEvent);
      localStorage.setItem('lsEventsList', JSON.stringify(eventsList));
    }

    // Función para extraer información de eventos
    function _getEvents(){
      var eventsList = JSON.parse(localStorage.getItem('lsEventsList'));
      if(eventsList == null){
        eventsList = events;
      }
      return eventsList;
    }

    // Función para guardar modificación de información de eventos
    function _updateEvent(pModEvent){
      var eventsList = _getEvents();
      for(var i = 0; i < eventsList.length; i++){
        if(eventsList[i].eventName == pModEvent.eventName){
          eventsList[i] = pModEvent;
        }
      }
      localStorage.setItem('lsEventsList', JSON.stringify(eventsList));
    }

  }

})();
