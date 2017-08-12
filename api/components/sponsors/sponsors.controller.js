var sponsor = require('./sponsors.model');

module.exports.save = function(req, res){
  var newSponsor = new sponsor({
    sponsorName: req.body.sponsorName,
    sponsorCompany : req.body.sponsorCompany,
    sponsorType : req.body.sponsorType,
    sponsorMoney : req.body.sponsorMoney,
    description : req.body.description,
    photo : req.body.photo
  });

  newSponsor.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo registrar el patrocinador' + err});
    }else{
      res.json({success:true, msg:'Se registró el patrocinador correctamente'});
    }
  });
}

module.exports.findAll = function(req,res){
  sponsor.find().then(function(sponsors){
    res.send(sponsors);
  })
};

module.exports.update = function(req,res){
  sponsor.update(req.body.name).then(function(sponsor){
    res.send(sponsor);
  });
};