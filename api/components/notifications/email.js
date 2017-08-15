var pug = require('pug');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var path = require('path');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
    api_key: 'key-972648c2a88564dc16906fbb94aa405b',
    domain: 'sandbox1cd1aa440d914f8e8f3b4289f88fac35.mailgun.org'
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
  }
  else {
    console.log('Response: ' + info);
  }
});
};