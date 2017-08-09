var Sponsor = require('./sponsor.model.js');

module.exports.save = function(req, res){
  var newSponsor = new Sponsor({
    sponsorName: req.body.sponsorName,
    sponsorCompany : req.body.sponsorCompany,
    sponsorType : req.body.sponsorType,
    sponsorMoney : req.body.sponsorMoney,
    sponsorDescription : req.body.sponsorDescription,
    sponsorPhoto : req.body.sponsorPhoto
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
  Sponsor.find().then(function(sponsors){
    res.send(sponsors);
  })
};