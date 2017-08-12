(function(){
  'use strict';
  angular
  .module('app')
  .service('sponsorService', sponsorService);

  function sponsorService($http){
    var sponsors = [];
    var publicAPI = {
      setSponsors : _setSponsors,
      getSponsors : _getSponsors,
      updateSponsor : _updateSponsor,
      findSponsor : _findSponsor
    };
    return publicAPI; // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que cuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones

    // Función para guardar patrocinadores
    function _setSponsors(pSponsor){
      /*var sponsorsList = _getSponsors();
      var error = false;

      for (var i = 0; i < sponsorsList.length; i++) {
        if (sponsorsList[i].sponsorName == pSponsor.sponsorName) {
          error = true;
        }
      }
      sponsorsList.push(pSponsor);
      //localStorage.setItem('lsSponsorsList', JSON.stringify(sponsorsList));*/
      return $http.post('http://localhost:3000/api/save_sponsor',pSponsor)
    }

    // Función para extraer información de patrocinadores
    function _getSponsors(){
      //var sponsorsList = JSON.parse(localStorage.getItem('lsSponsorsList'));
      //if(sponsorsList == null || sponsorsList == undefined){
        //sponsorsList = sponsors;
      //}
      return $http.get('http://localhost:3000/api/get_all_sponsors');
    }

    // Función para guardar modificación de información de patrocinadores
    function _updateSponsor(pModSponsor){
      /*var sponsorsList = _getSponsors();
      for(var i = 0; i < sponsorsList.length; i++){
        if(sponsorsList[i].sponsorName == pModSponsor.sponsorName){
          sponsorsList[i] = pModSponsor;
        }
      }*/
      return $http.put('http://localhost:3000/api/get_all_sponsors', pModSponsor);
    }

    function _findSponsor(pSponsorName){
      var sponsorStorage = _getSponsors();
     for (var i = 0; i < sponsorStorage.length; i++) {
       if(sponsorStorage[i].sponsorName == pSponsorName){
         return sponsorStorage[i];
       }
     }
     return false;
   }
    
  }

})();