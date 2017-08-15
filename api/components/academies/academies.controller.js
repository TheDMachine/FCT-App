var Academy = require('./academies.model');

module.exports.saveAcademy = function(req, res){
  var newAcademy = new Academy({
    name: req.body.name,
    address : req.body.address,
    manager : req.body.manager,
    competitors : req.body.competitors,
    phone : req.body.phone,
    email : req.body.email,
    status: req.body.status
  });

  newAcademy.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo registrar el academia' + err});
    }else{
      res.json({success:true, msg:'Se registró el academia correctamente'});
    }
  });
}

module.exports.findAllAcademies = function(req,res){
  Academy.find().then(function(academies){
    res.send(academies);
  })
};

// module.exports.update = function(req,res){
//   console.log(req.body.id);
//   Academy.findByIdAndUpdate(req.body._id, {$set:req.body}).then(function(data){
//     res.json({success:true,msg:'Se ha actualizado correctamente.'});
//   });
// }
