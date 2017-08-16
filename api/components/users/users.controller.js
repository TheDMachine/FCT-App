var User = require('./users.model');
var bcrypt = require('bcrypt');

module.exports.update = function(req,res){

  User.findByIdAndUpdate(req.body._id, { $set: {'belt': req.body.belt}}, function (err, user) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }

  });

}

// Funciones Josué
//Backend Profesor

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
    academy : req.body.academy,
    newUser : req.body.newUser
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

  User.findByIdAndUpdate(req.body._id, { $set: req.body}).then(function(data){
    res.json({success:true,msg:'Se ha actualizado correctamente.'});
  });



}

//Backend Alumnos
