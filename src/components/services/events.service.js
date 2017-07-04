(function(){
  'use strict';
  angular
  .module('app')
  .service('eventService', eventService);

  function eventService(){
    var events = [];
    var publicAPI = {
      setEvents : _setEvents,
      getEvents : _getEvents,
      updateEvent : _updateEvent,
      setPropose: _setProposeEvent,
      getPropose: _getProposeEvent
    };
    return publicAPI; // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que cuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones

    //Functión para crear una propouesta de evento
    function _setProposeEvent(pObject){
      localStorage.setItem('lsProposeEvents',JSON.stringify(pObject));
    }
    function _getProposeEvent(){
      return JSON.parse(localStorage.getItem('lsProposeEvents'));
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
