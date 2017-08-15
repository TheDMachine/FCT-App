var user = require('./users.model');
var bcrypt = require('bcrypt');

module.exports.save = function(req, res){
    bcrypt.hash(req.body.password,10, function(err,hash){
      req.body.password = hash;
      mUser= new user({
        "id": req.body.id,
     "name": req.body.name,
     "surName": req.body.surname,
     "firstName": req.body.firstName,
     "lastName": req.body.lastName,
     "genre": req.body.genre,
     "birthday": req.body.birthday,
     "nationality":req.body.nationality,
     "phone": req.body.phone,
     "email": req.body.email,
     "photo": req.body.photo,
     "role": req.body.role,
     "password": req.body.password
   });
   mUser.save(function(err){
     if(err){
       res.json({success:false,msj:"El usuario no se pudo crear exitosamente."})
     }
     res.json({success:true,msj:"El usuario se pudo crear exitosamente."});
   })

    })
};
module.exports.findAll = function(req, res){
  User.find({},function(err, data){
    if(err){res.json({success:false, msg:'No existen usuarios en la base de datos.'})}
    res.json({success:true,data});
  });

}
