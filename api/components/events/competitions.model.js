var mongoose = require('mongoose');

var CompetitionSchema = new mongoose.Schema({
  competitionNumber:{type: String, required: true, unique: true},
  eventBelongs:     {type: String, required: true},
  competitionGenre: {type: String, required: true},
  competitionAge:   {type: String, required: true},
  competitionWeight:{type: String, required: true},
  status:           {type: String, required: false},
  competitors:      [],
  fights:			[]
});

module.exports = mongoose.model('competitions', CompetitionSchema);
