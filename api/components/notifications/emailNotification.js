var pug = require('pug');
var nodemailer = require('nodemailer');
var googleapis = require('googleapis');
var  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      XOAuth2: {
              user: "wiziarce@gmail.com",
              clientId: "99490669044-mpcngkciqg7fgl9507v7plf9a7733clt.apps.googleusercontent.com",
              clientSecret: "vDVJXQiHqxOKYvdFokRm3E3r",
              refreshToken: "1/xEoDL4iW3cxlI7yDbSRFYNG01kVKM2C-259HOF2aQbI"
    }
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
