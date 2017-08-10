var mongoose = require('mongoose');
var schemaTemplate = {
	'sponsorName' : {type: String, required: true},
	'sponsorCompany' : {type: String, required: true},
	'sponsorType' : {type: String, required: true},
	'sponsorMoney' : {type: String, required: true},
	'sponsorDescription' : {type: String, required: true},
	'sponsorPhoto' : {type: String, required: true}
};
var sponsorSchema = new mongoose.Schema(schemaTemplate);
module.exports = mongoose.model('Sponsor', sponsorSchema);	

