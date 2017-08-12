var mongoose = require('mongoose');

var SponsorSchema = new mongoose.Schema({
  // Aqui va el modelo de patrocinadores
  sponsorName:String,
  sponsorCompany:String,
  sponsorType:String,
  sponsorMoney:String,
  description:String,
  photo:String
});

module.exports = mongoose.model('sponsors', SponsorSchema);