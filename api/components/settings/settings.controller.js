var Setting = require('./settings.model');
var Log = require('./log.model');
module.exports.saveDirect = function(req,res){
    Setting.findByIdAndUpdate(
        {_id:req.body._id}
        ,{"$push":{
            name:req.body.name,
            position:req.body.position,
            email:req.body.email,
            phone:req.body.phone
        }
    },function(err, raw){
        if(err){res.json({success:false, msg:"Hubo un error al actualizar"})}
        else{
            res.json({success:true, msg:"Actualizado el dato correctamente", obj: raw});
        }
    })
};
module.exports.getAll = function(req,res){
    Setting.find({},function(err,raw){
        if(err){
            res.json({success:false, msg:"Hubo un error al actualizar"})
        }
        else{
            res.json({success:true, obj: raw});
        }
    })
};
module.exports.updateParam = function(req,res){
// Setting.findByIdAndUpdate({_id:req.body._id},{
//
// })
};
module.exports.setLogs = function(req, res){
    var newLog = new Log({
        action:req.body.action,
        actionby:req.body.actionBy,
        resultAction:req.body.resultAction,
        timestamp:req.body.timestamp
    });
    newLog.save(function(err){
        if(err){
            res.json({succes:false, msg:"Hubo un problema al registrar el log"});
        }else{
            res-json({succes:true, msg:"Se creo exito el log"});
        }
    })
}
module.exports.getLogs = function(req,res){
    // Log.find({},function(err, raw){
    //     if(err){res.json({success:false, msg:'Los logs no existen'});}
    //     else{
    //         res.json({success:true, logs:raw});
    //     }
    // })
}
