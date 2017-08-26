var mongoose = require('mongoose');

var settingScheme = new mongoose.Schema({
    address:String,
    phone:String,
    id:String,
    emailNotifications:String
});
module.exports = mongoose.model('Setting',settingScheme);

// var globalFieldSettings = {
//   address:'Pavas, San José, Costa Rica',
//   phone:'22314308',
//   idJ:'3-002-660565',
//   emailNotifications: 'no-reply@tckcr.org',
//   direct:[
//     {name:'Wilmer Alvarado Castro',
//     position:'Presidente',
//   email:'info@tkdcr.com',
// phone:'89829607'},
//     {name:'Ferdinardo Alfaro Jimenez',
// position:'Vicepresidente',
// email:'ferdinandoalfaro@gmail.com',
// phone:'89916463'}
// ,{name:'Kenneth Viquez Guevara',
// position:'Secretario',
// email:'prosema@racsa.co.cr',
// phone:'88561919'}
//   ]
// };
