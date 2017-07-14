// (function(){
//   angular
//     .module('app')
//     .filter('dateRange', function() {
//     return function(records, from, to) {
//         if(from ==undefined || to==undefined){
//           from = new Date('01/01/1900');
//           to = new Date();
//         }else{
//           from = new Date(from);
//           to = new Date(to);
//         }

//         return records.filter(function(record) {
//             var dates = new Date(record.dates)
//             return dates >= from && dates <= to;
//         });
//     }
// });
// })();
