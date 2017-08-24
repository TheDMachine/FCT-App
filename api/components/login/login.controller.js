var User = require('../users/users.model');
var bcrypt = require('bcrypt');

module.exports.getCredentials = function(req, res){
  var password = req.body.password;
  User.find({'id': req.body.id}, function(err, response){
    if(err){
      res.json({success:false, msg:'No se encontro usuario' + err});
    }
    else{
      //res.json({success:true, msg:'Se encontro usuario', response});
      console.log(password);
      console.log(response);
      bcrypt.compare(password, response[0].password, function(e, data){
      console.log(data);
      if(!data){
         res.json({success:false, msg:'La contraseña no se encontro' + data});
      }
      else{
        response[0].password = undefined;
        res.json({success: true, msg:'La contraseña coincide', user: response});
      }
    })
    }
  })
}