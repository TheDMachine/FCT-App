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
// Funciones Josué
module.exports.update = function(req,res){

  User.findByIdAndUpdate(req.body._id, { $set: {'belt': req.body.belt}}, function (err, user) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }

  });

}

module.exports.saveTeacher = function(req, res){
  var newUser = new User({
    id: req.body.id,
    name : req.body.name,
    surName: req.body.surName,
    firstName : req.body.firstName,
    lastName: req.body.lastName,
    genre : req.body.genre,
    birthday: req.body.birthday,
    nationality : req.body.nationality,
    phone: req.body.phone,
    email : req.body.email,
    photo: req.body.photo,
    status: req.body.status,
    role : req.body.role,
    password : req.body.password,
    academy : req.body.academy
  });

  newUser.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo registrar el profesor' + err});
    }else{
      res.json({success:true, msg:'Se registró el profesor correctamente'});
    }
  });
}
module.exports.findAllTeachers = function(req,res){
  User.find({'role': 'teacher'}).then(function(teacher){
    res.send(teacher);
  })
};

module.exports.updateTeacher = function(req,res){
  // console.log(req.body.id);
  // User.findByIdAndUpdate(req.body._id,{$set:req.body}).then(function(data){
  //   res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
  // });

  User.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, user) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + err});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }

  });

}
