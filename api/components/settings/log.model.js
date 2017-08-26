var mongoose = require('mongoose');
var logScheme = new mongoose.Schema({
    action:String,
    actionBy: String,
    resultAction:String,
    timestamp:String
});
module.exports = mongoose.model('Log', logScheme);
