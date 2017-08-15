(function(){
  'use strict';
  angular
  .module('app')
  .service('eventService', eventService);

  function eventService(logService, $http){
    var events = [];
    var competitions = [];
    var reservations = [];
    var proposes = [];
    var publicAPI = {
      setEvents : _setEvents,
      getEvents : _getEvents,
      updateEvent : _updateEvent,
      findEvent: _findEvent,
      setCompetitions : _setCompetitions,
      getCompetitions : _getCompetitions,
      updateCompetition : _updateCompetition,
      //updateCompetition : _updateCompetition
      setPropose: _setProposeEvent,
      getPropose: _getProposeEvent,
      findPropose: _findProposeEvent,
      updateProposeToEvent: _updateProposeToEvent,
      updateReject: _updateReject
    };
    return publicAPI; // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que cuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones

    //Función para actualizar las propuestas rechazadas.
    function _updateReject(pProposeToRemove) {
      _removePropose(pProposeToRemove,2);
      return;
    }

    //funcion para procesar una propuesta y hacerla evento.
    function _updateProposeToEvent(pProposeNewEvent) {
      _removePropose(pProposeNewEvent,1);
      _setEvents(pProposeNewEvent);
    }

    //Remueve la propuesta
    function _removePropose(pProposeToDelete, pFlag) {
      var proposesList = _getProposeEvent();
      if(pFlag == 1) {
        for (var i = 0; i < proposesList.length; i++) {
          if(proposesList[i].proposeName == pProposeToDelete.eventName) {
            var index = proposesList.indexOf(proposesList[i]);
            console.log(index);
            var pListToSave = proposesList.slice(index,1);
            console.log(proposesList[i]);
            console.log(pListToSave);
            localStorage.setItem('lsProposeEvents', JSON.stringify(pListToSave));
            return;
          }
        }
      }
      if(pFlag === 2) {
        for (var i = 0; i < proposesList.length; i++) {
          if(proposesList[i].proposeName == pProposeToDelete.proposeName) {
            var index = proposesList.indexOf(proposesList[i]);
            console.log(index);
            var pListToSave = proposesList.slice(index,1);
            console.log(proposesList[i]);
            console.log(pListToSave);
            localStorage.setItem('lsProposeEvents', JSON.stringify(pListToSave));
            return;
          }
        }
      }
    }
    //Encuentra una propuesta de evento
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
      var proposeStorage = _getProposeEvent();
      for (var i = 0; i < proposeStorage.length; i++) {
        if(proposeStorage[i].proposeName == pObject.proposeName) {
            logService.createLog(false, 'Usuario no registrado', 'Propuesta de evento ' +oObject.proposeName + 'repetida.');
            return true;
        }
      }
          proposeStorage.push(pObject);
          localStorage.setItem('lsProposeEvents', JSON.stringify(proposeStorage));
          logService.createLog(0, 'Usuario no registrado', 'Propuesta de evento ' +pObject.proposeName);
          return false;
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
      console.log(eventsList);
      // return $http.post('http://localhost:3000/api/save_events',pEvent);
    }

    // Función para extraer información de eventos
    function _getEvents(){
      var eventsList = JSON.parse(localStorage.getItem('lsEventsList'));
      if(eventsList == null){
        eventsList = events;
      }
      return eventsList;
      // return $http.get('http://localhost:3000/api/get_all_events');
    }

    // Función para guardar modificación de información de eventos
    function _updateEvent(pModEvent){
      var eventsList = _getEvents();
      for(var i = 0; i < eventsList.length; i++){
        if(eventsList[i].eventName == pModEvent.eventName){
          eventsList[i] = pModEvent;
        }
      }
      console.log(eventsList);
      localStorage.setItem('lsEventsList', JSON.stringify(eventsList));
      // return $http.put('http://localhost:3000/api/update_events',pModEvent);
    }

    // Función para encontrar el evento
    function _findEvent(pEventName){
      var eventsList = _getEvents();
     for (var i = 0; i < eventsList.length; i++) {
       if(eventsList[i].eventName == pEventName){
         return eventsList[i];
       }
     }
     return false;
   }



    //funcion para guardar competencias
    function _setCompetitions(newCompetition){
      var competitionsList = _getCompetitions();
      competitionsList.push(newCompetition);
      localStorage.setItem('lsCompetitionsList', JSON.stringify(competitionsList));
    }

    //funcion para mostrar competencia acatuales
    function _getCompetitions(){
      var competitionsList = JSON.parse(localStorage.getItem('lsCompetitionsList'));
      if(competitionsList == null){
        competitionsList = competitions;
      }
      return competitionsList;
    }

    function _updateCompetition(pModCompetition){
      var competitionsList = _getCompetitions();
      for(var i = 0; i < competitionsList.length; i++){
        if(competitionsList[i].competitionNumber == pModCompetition.competitionNumber){
          competitionsList[i] = pModCompetition;
        }
      }
      console.log(competitionsList);
      localStorage.setItem('lsCompetitionsList', JSON.stringify(competitionsList));
    }
  }

})();
