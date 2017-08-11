var mongoose = require('mongoose');

var SponsorSchema = new mongoose.Schema({
  // Aqui va el modelo de patrocinadores
});

module.exports = mongoose.model('sponsors', SponsorSchema);