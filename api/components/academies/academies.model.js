var mongoose = require('mongoose');

var AcademySchema = new mongoose.Schema({
  name: 	   {type: String, required: true, unique: true},
  address:     {type: String, required: true},
  manager:     {type: String, required: true},
  competitors: {type: String, required: true},
  phone:       {type: String, required: true, unique: true},
  email:       {type: String, required: true, unique: true}
});

module.exports = mongoose.model('academies', AcademySchema);