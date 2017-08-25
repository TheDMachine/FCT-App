var User = require('./users.model');
var bcrypt = require('bcrypt');
var email = require('./../notifications/email');



// Funciones Josué

// Backend Actualizar cinturon de alumno

module.exports.updateBelt = function(req,res){

  User.findByIdAndUpdate(req.body._id, { $set: {'belt': req.body.belt}}, function (err, user) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }

  });

}

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

module.exports.updateTemporalPassword = function(req, res){
    var salt = 15;
  // console.log(req.body.id);
  // User.findByIdAndUpdate(req.body._id,{$set:req.body}).then(function(data){
  //   res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
  // });

  bcrypt.hash(req.body.password, salt, function(err, hash){
    if(err){
    res.json({
        success:false,
        msg:"No se pudo cifrar la contraseña"
    });
    }else{
      email.sEmail('successPassword', req.body.email, 'Cambio de contraseña temporal exitoso', {name: req.body.name, password: req.body.password});
      req.body.password = hash;
      User.findByIdAndUpdate(req.body._id, { $set: req.body}).then(function(data){
        res.json({success:true,msg:'Se ha actualizado correctamente.'});
      });
    }
  })
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
    points : req.body.points,
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
    email.sEmail('newPassword',req.body.email, 'Nueva cuenta creada', {
        name:req.body.name,
        username:req.body.id,
        password:req.body.password
    });
    var salt = 15;
    var newConsul = new User({
        id:req.body.id,
        name:req.body.name,
        surName:req.body.surName,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        genre:req.body.genre,
        birthday:req.body.birthday,
        nationality:req.body.nationality,
        phone:req.body.phone,
        email:req.body.email,
        photo:req.body.photo,
        status:req.body.status,
        role:req.body.role,
        newUser:req.body.newUser,
        academy : "No procede",
        belt : "No procede",
        weight : "No procede",
        height : "No procede",
        tournaments : "No procede",
        tournamentsWins : "No procede",
        category : "No procede",
        teacher : "No procede"
    });
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        console.log(hash);
        if(err){
            res.json({
                success:false,
                msg:"No se pudo cifrar la contraseña"
            })
        }else{

        newConsul.password = hash;
        newConsul.save(function(e) {
            if(e){
                res.json({
                    success:false,
                    msg:"Hubo un problema al guardar el usuario"
                })
            }
            else{
                res.json({
                    success:true,
                    msg:"Usuario registrado correctamente"
                })
            }
        })
    }
    })
};
