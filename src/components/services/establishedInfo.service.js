(function(){
  'use strict';
  angular
  .module('app')
  .service('estabInfoService', estabInfoService);

  function estabInfoService($http){
    var belts = [
      {belt: 'blanco'}, 
      {belt: 'amarillo'}, 
      {belt: 'verde'}, 
      {belt: 'azul'}, 
      {belt: 'rojo'}, 
      {belt: 'negro'}];
    var weights = [
      {weightName: 'il-Yang', aliasName:'pluma', minweightRange : '0', maxweightRange : '51'}, 
      {weightName: 'i-Yang', aliasName:'gallo', minweightRange : '52', maxweightRange : '59'},
      {weightName: 'o-Yang', aliasName:'supergallo', minweightRange : '60', maxweightRange : '65'},
      {weightName: 'sam-Yang', aliasName:'wélter', minweightRange : '66', maxweightRange : '74'},
      {weightName: 'siu-Yang', aliasName:'pesado', minweightRange : '75', maxweightRange : 'en adelante'}];
    var categories = [
      {categorieName: 'Infantil o Junior', minAgeRange : '4 años', maxAgeRange : '11 años'}, 
      {categorieName: 'Cadete', minAgeRange : '12 años', maxAgeRange : '16 años'}, 
      {categorieName: 'Élite', minAgeRange : '17 años', maxAgeRange : '23 años'}, 
      {categorieName: 'Senior', minAgeRange : '24 años', maxAgeRange : 'en adelante'}];

    var publicAPI = {
      getBelts : _getBelts,
      getWeight : _getWeight,
      getCategories : _getCategories,
      getCountries : _getCountries
    };
    return publicAPI; // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que cuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones

    // Función para extraer información de eventos
    function _getBelts(){
      var beltsList = JSON.parse(localStorage.getItem('lsBeltsList'));
      if(beltsList == null){
        beltsList = belts;
      }
      return beltsList;
    }

    // Función para extraer información de eventos
    function _getWeight(){
      var weightsList = JSON.parse(localStorage.getItem('lsWeightsList'));
      if(weightsList == null){
        weightsList = weights;
      }
      return weightsList;
    }

    // Función para extraer información de eventos
    function _getCategories(){
      var categoriesList = JSON.parse(localStorage.getItem('lsCategoriesList'));
      if(categoriesList == null){
        categoriesList = categories;
      }
      return categoriesList;
    }

    //Función para select countries
    function _getCountries() {
      $http.get('http://api.population.io:80/1.0/countries').then(function(data){
          console.log(data);
          return data.data.countries;
        },function(err){
          console.log(err);
        })
    }
  }
})();
