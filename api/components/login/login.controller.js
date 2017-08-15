var User = require('../users/users.model');
//var bcrypt = require('bcrypt');

module.exports.getCredentials = function(req, res){

  User.find({id: req.body.id}, function(err, response){
    if(err){
      res.json({success:false, msg:'No se encontro usuario' + err});
    }
    else{
      res.json({success:true, msg:'Se encontro usuario', response});
    }

    /*bcrypt.compare(response.password, res.password, function(err, success){
      if(err){
         res.json({success:false, msg:'La contraseña no se encontro' + err});
      }
      else{
        response.password = undefined;
        res.json({success: true, msg:'La contraseña coincide', user: response});
      }
    })*/
  })
}