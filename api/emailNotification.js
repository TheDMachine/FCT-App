var pug = require('pug');
var nodemailer = require('nodemailer');
var  transporter = nodemailer.createTransport({
    host: 'mail.google.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'dcamposa@ucenfotec.ac.cr',
        pass:'dibblesmileplaygoer'
    }
});
// verify connection configuration
transporter.verify(function(error, success) {
   if (error) {
        console.log('Sigue teniendo problemas con el correo.'+error);
   } else {
        console.log('Server is ready to take our messages yass');
   }
});
var mailSt = {mailOpts: {
  from:'"DanielCArce" <daniel.camposarce@gmail.com>',
  to:'daniel.camposarce@gmail.com',
  text:'Yass work correctly'
}};
module.exports = mailSt;
transporter.sendMail(mailSt.mailOpts,function(err, info){
  if(err){
    console.log('Its a bug')
  }
  console.log(info);
});
