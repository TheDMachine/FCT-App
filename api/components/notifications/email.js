var pug = require('pug');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var path = require('path');
var mailSt = require('./mailgun.json');
var auth = {
  auth: {
    api_key:mailSt.api_key,
    domain:mailSt.domain
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));

module.exports.sEmail = function(pTemplate, pDestine, pSubject, pValues){
  contextObject = pValues;
nodemailerMailgun.sendMail({
  from: 'daniel.camposarce@gmail.com',
  to: pDestine, // An array if you have multiple recipients.
  subject: pSubject,
  template: {
    name:path.join(__dirname,'templates', pTemplate +'.pug'),
    engine: 'pug',
    context: contextObject
  }
}, function (err, info) {
  if (err) {
    console.log('Error: ' + err);
    console.log('Revisa que no te falta el archivo de configuracion.')
  }
  else {
    console.log(info.message);
  }
});
};
