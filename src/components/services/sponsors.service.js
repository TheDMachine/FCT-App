(function(){
  'use strict';
  angular
  .module('app')
  .service('sponsorService', sponsorService);

  function sponsorService(){
    var sponsors = [];
    var publicAPI = {
      setSponsors : _setSponsors,
      getSponsors : _getSponsors,
      updateSponsor : _updateSponsor
    };
    return publicAPI; // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que cuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones

    // Función para guardar patrocinadores
    function _setSponsors(pSponsor){
      var sponsorsList = _getSponsors();
      var error = false;

      for (var i = 0; i < sponsorsList.length; i++) {
        if (sponsorsList[i].sponsorName == pSponsor.sponsorName) {
          error = true;
        }
      }
      sponsorsList.push(pSponsor);
      return error;
      localStorage.setItem('lsSponsorsList', JSON.stringify(sponsorsList));
    }

    // Función para extraer información de patrocinadores
    function _getSponsors(){
      var sponsorsList = JSON.parse(localStorage.getItem('lsSponsorsList'));
      if(sponsorsList == null || sponsorsList == undefined){
        sponsorsList = sponsors;
      }
      return sponsorsList;
    }

    // Función para guardar modificación de información de patrocinadores
    function _updateSponsor(pModSponsor){
      var sponsorsList = _getSponsors();
      for(var i = 0; i < sponsorsList.length; i++){
        if(sponsorsList[i].sponsorName == pModSponsor.sponsorName){
          sponsorsList[i] = pModSponsor;
        }
      }
      localStorage.setItem('lsSponsorsList', JSON.stringify(sponsorsList));
    }
    
  }

})();