var mongoose = require('mongoose');

var directiveScheme = new mongoose.Schema({
    name:String,
    position:String,
    email:String,
    phone:String
});
module.exports = mongoose.model('Directive', directiveScheme);


    // {name:'Wilmer Alvarado Castro',
    //     position:'Presidente',
    //   email:'info@tkdcr.com',
    // phone:'89829607'},
