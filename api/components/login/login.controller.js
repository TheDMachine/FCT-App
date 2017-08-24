var User = require('../users/users.model');
var bcrypt = require('bcrypt');
var email = require('./../notifications/email');

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

module.exports.recoverPassword = function(req, res){
  var salt = 15;
  User.find({'id': req.body.id}, function(err, user){
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      console.log(hash);
      console.log(err);
      if(err){
          res.json({
              success:false,
              msg:"No se pudo cifrar la contraseña"
          })
        }else{
          console.log(user); 
        User.findByIdAndUpdate(user[0]._id, {$set:user[0]}).then(function(data){
          email.sEmail('successRecoveryPassword', user[0].email, 'Cambio de contraseña exitoso', {name: user[0].name, password: req.body.password});
          console.log(req.body.password);
          console.log(user); 
          req.body.password = hash;
          user[0].password = req.body.password;
          user[0].newUser = 1;
          console.log(user);
          return res.send(user[0]);
          //return res.json({success:true,msg:'Se ha actualizado correctamente.', data});
        })
        .catch(function(err){
          return;
        })
      }
    })
  })
}