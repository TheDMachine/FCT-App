(function(){
  'use strict';
  angular
  .module('app')
  .service('eventService', eventService);

  function eventService(){
    var events = [];
    var competitions = [];
    var publicAPI = {
      setEvents : _setEvents,
      getEvents : _getEvents,
      updateEvent : _updateEvent,
      setCompetitions : _setCompetitions,
      getCompetitions : _getCompetitions,
      //updateCompetition : _updateCompetition
    };
    return publicAPI; // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que cuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones

    // Función para guardar eventos
    function _setEvents(pEvent){
      var eventsList = _getEvents();

      eventsList.push(pEvent);
      localStorage.setItem('lsEventsList', JSON.stringify(eventsList));
      console.log(eventsList);
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
      console.log(eventsList);
      localStorage.setItem('lsEventsList', JSON.stringify(eventsList));
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
  }

})();
