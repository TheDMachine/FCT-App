(function() {
  'use strict';
  angular
  .module('app')
  .filter('idFilter', idFilter);
  function idFilter() {
      return function (id) {
          console.log(id);
          if (!id) { return ''; }

          var value = id.toString().trim().replace(/^\+/, '');

          if (value.match(/[^0-9]/)) {
              return id;
          }

          var country, city, number;

          switch (value.length) {
              case 1:
              case 2:
              case 3:
                  city = value;
                  break;

              default:
                  city = value.slice(0, 0);
                  number = value.slice(3);
          }

          if(number){
              if(number.length>3){
                  number = number.slice(1, 3) + '-' + number.slice(4,7);
              }
              else{
                  number = number;
              }

              return (+ city  + number).trim();
          }
          else{
              return  city;
          }

      };
}());
