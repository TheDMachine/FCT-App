(function(){
  angular
    .module('app')
    .filter('dateRange', function() {
    return function(records, from, to) {
        if(from ==undefined || to==undefined || from =='' || to == ''){
          from = new Date('01/01/1900');
          to = new Date('01/01/2100');
        }else{
          from = new Date(from);
          to = new Date(to);
        }

        return records.filter(function(record) {
            var date1 = new Date(record.date1);
            var date2 = new Date(record.date2);
            return date1 >= from && date2 <= to;
        });
    }
});
})();

(function(){
  angular
    .module('app')
    .filter('eventFrom', function() {
    return function(records, from, to) {
        if(from ==undefined || to==undefined || from =='' || to == ''){
          from = new Date();
          
        }else{
          from = new Date(from);
          to = new Date(to);
        }

        return records.filter(function(record) {
            var date1 = new Date(record.date1);
            return date1 >= from ;
        });
    }
});
})();
