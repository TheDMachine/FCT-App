var express = require('express');
var http = require('http');
// var io = require('socket.io');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var port = "3000";
// var notification = require('./emailNotification');
var db = mongoose.connection;
var mlabServer = "mongodb://thedmachine:thedmachine@ds111922.mlab.com:11922/db_fct";
mongoose.connect(mlabServer);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'src')));
app.use( function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
db.on('error', console.error.bind(console, 'error de conexión:'));
db.on('open', function(d){
  console.log('Se ha logrado conectar a la base de datos');
})
// obtención de rutas
var indexRouting = require('./index');

// Falta el routing
app.use('/',indexRouting);
// Aranca el servidor
app.listen(port, _serverInfo);

function _serverInfo(){
  console.log('Server corriento en '+ port);
}
module.exports = app;
