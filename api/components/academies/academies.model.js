var mongoose = require('mongoose');

var AcademySchema = new mongoose.Schema({
  // Aqui va el modelo de academias
});

module.exports = mongoose.model('academies', AcademySchema);