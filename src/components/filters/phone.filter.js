(function() {
  'use strict';
  angular
  .module('app')
  .filter('telFilter', telFilter);
  function telFilter() {
      return function (tel) {
          console.log(tel);
          if (!tel) { return ''; }

          var value = tel.toString().trim().replace(/^\+/, '');

          if (value.match(/[^0-9]/)) {
              return tel;
          }

          var country, city, number;

          switch (value.length) {
              case 1:
              case 2:
              case 3:
                  city = value;
                  break;

              default:
                  city = value.slice(0, 4);
                  number = value.slice(4);
          }

          if(number){
              if(number.length>4){
                  number = number.slice(0, 4) + '-' + number.slice(4,7);
              }
              else{
                  number = number;
              }

              return (+ city  + number).trim();
          }
          else{
              return "(" + city;
          }

      };
}());
