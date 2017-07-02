(function(){
  angular
  .module('app')
  .service('imageService', imageService);

  function imageService($http){

    var cloudObj = {
      url:'https://api.cloudinary.com/v1_1/thedmachine/image/upload',
      data:{
        upload_preset: 'thedmachine',
        tags:'Any',
        context:'photo=test'
      }
    }; 

    var publicAPI = {
      getConfiguration : _getConfiguration
    }
    return publicAPI;

    function _getConfiguration(){
      return cloudObj;
    }

  }

})();
