(function(){
  angular
  .module('app')
  .service('imageService', imageService);

  function imageService($http){

    var cloudObj = {
      url:'https://api.cloudinary.com/v1_1/thedmachine/image/upload',
      data:{
        upload_preset: 'thedmachine',
        tags:'TDM',
        context:'photo=test'
      }
    };

    var public_API = {
      getConfiguration:_getConfiguration
    }
    return public_API;

    function _getConfiguration(){
      return cloudObj;
    }

  }

})();
