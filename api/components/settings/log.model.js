var mongoose = require('mongoose');
var logScheme = new mongoose.Schema({
    action:String,
    actionBy: String,
    resultAction:String,
    timestamp:Date
});
module.ecports = mongoose.model('Log', logScheme);
