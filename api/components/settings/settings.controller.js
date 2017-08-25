var Setting = require('./settings.model');
var Log = require('./log.model');
var Direct = require('./directive.model');
module.exports.saveDirect = function(req,res){
    var newDirect = Direct({
        name:req.body.name,
        position:req.body.position,
        email:req.body.email,
        phone:req.body.phone
    })
    newDirect.save(function(er){
        if(er){
            res.json({success:false, msg:"Oups no se pudo registrar"});
        }else{
            res.json({success:true, msg:"Nuevo directivo creado exitoxamente"});
        }
    })
}


module.exports.getAllDirect = function(req,res) {
    Direct.find({},function(err, directivesObj){
        if(err){
            res.json({success:false, msg:"Hubo un problema al obtener toda la junta directiva."});
        }
        res.json({success:true, members:directivesObj});
    })
}


module.exports.updateDirective = function(req,res) {
    Direct.findByIdAndUpdate(req.body._id, {$set:req.body}, function(err, ud) {
        if(err) {
            res.json({success:false, msg:"Oups no se pudo actualizar"});
        }
        res.json({success:true, user:ud});
    })
}

module.exports.deleteDirective = function(req,res) {
    Direct.findByIdAndUpdate(req.body._id, {$set:req.body}, function(err, ud) {
        if(err) {
            res.json({success:false, msg:"Oups no se pudo actualizar"});
        }
        res.json({success:true, user:ud});
    })
}

module.exports.getParam = function(req,res) {
    Setting.find({}, function(err, data) {
        if(err){
            res.json({success:false, msg:"Oups no se encontraron."});
        }
        res.json({success:true, setups: data});
    })
}
module.exports.updateParam = function(req,res) {
    Setting.findByIdAndUpdate(req.body._id, {$set:req.body},function(er, us){
        if(er){
            res.json({success:false, msg:"Hubo un error al actualizar"})
        }
        res.json({success:true, msg:"Se actualizo correctamente."});
    })
}
module.exports.setLog = function(req,res) {
    console.log(req.body);
    var newLog = new Log({
        action:req.body.action,
        actionBy:req.body.actionBy,
        resultAction:req.body.resultAction,
        timestamp:req.body.timestamp
    })
    newLog.save(function(e) {
        if(e){
            res.json({success:false, msg:"Hubo un problema al registrar"});
        }else{
            res.json({success:true, msg:"Yeah new Updated"});
        }
    })
}
module.exports.getLog = function(req, res) {
    Log.find({}, function(e, LogFinded) {
        if(e){
            res.json({success:false, msg:"Hubo un problem al registrar"});
        }
        res.json({success:true, msg:"Yeah new Updated", logs:LogFinded});
    })
}
