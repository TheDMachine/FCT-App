var User = require('./users.model');
var bcrypt = require('bcrypt');
// var email = require('./../notifications/email');

module.exports.updateBelt = function(req,res){

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
module.exports.saveStudent = function(req, res){
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
    belt : req.body.belt,
    weight : req.body.weight,
    height : req.body.height,
    tournaments : req.body.tournaments,
    tournamentsWins : req.body.tournamentsWins,
    category : req.body.category,
    teacher : req.body.teacher,
    newUser : req.body.newUser
  });

  newUser.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo registrar el alumno' + err});
    }else{
      res.json({success:true, msg:'Se registró el profesor correctamente'});
    }
  });
}
module.exports.findAllStudents = function(req,res){
  User.find({'role': 'student'}).then(function(student){
    res.send(student);
  })
};

module.exports.updateStudent = function(req,res){
  // console.log(req.body.id);
  // User.findByIdAndUpdate(req.body._id,{$set:req.body}).then(function(data){
  //   res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
  // });

  User.findByIdAndUpdate(req.body._id, { $set: req.body}).then(function(data){
    res.json({success:true,msg:'Se ha actualizado correctamente.'});
  });



}

module.exports.saveConsul = function(req,res) {
    var salt =10;
    // email.sEmail('newPassword', req.body.email,'Nuevo registro de fct-app', {name:req.body.name, username:req.body.id, password:req.body.password})
     var newConsul = new User({
         id:req.body.id,
         name:req.body.name,
         surName:req.body.surName,
         firstName:req.body.firstName,
         lastName:req.body.lastName,
         birthday:req.body.birthday,
         genre:req.body.genre,
         nationality:req.body.nationality,
         email:req.body.email,
         photo:req.body.photo,
         password:req.body.password,
         newUser : req.body.newUser,
         role:req.body.role,
         status:req.body.status
     });
     console.log(req.body.password);
     newConsul.save(function(err){
         if(err){
             console.log('Hubo un error al guardar el usuario');
             res.json({success:false, msg:'Hubo un problema al registrar Joder tio.'})
         }else{
             console.log('Yass');
         }
     })
};
