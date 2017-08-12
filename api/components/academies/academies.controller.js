var academies = require('./academies.model.js');

// module.exports.save = function(req, res){
//   var newAcademy = new academy({
//     name: req.body.name,
//     address : req.body.address,
//     manager : req.body.manager,
//     competitors : req.body.competitors,
//     phone : req.body.phone,
//     email : req.body.email,
//     status: req.body.status
//   });

//   newAcademy.save(function(err){
//     if(err){
//       res.json({success:false, msg:'No se pudo registrar el academia' + err});
//     }else{
//       res.json({success:true, msg:'Se registró el academia correctamente'});
//     }
//   });
// }

// module.exports.findAll = function(req,res){
//   academy.find().then(function(academy){
//     res.send(academy);
//   })
// };

// module.exports.update = function(req,res){
//   console.log(req.body.id);
//   academy.findByIdAndUpdate(req.body._id, {$set:req.body}).then(function(data){
//     res.json({success:true,msg:'Se ha actualizado correctamente.'});
//   });
// }