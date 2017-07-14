var express = require("express");
var app = express();
//var mongoose = require('mongoose'); //Se requiere el ORM para cargar mongo , segunda iteración.
app.use(express.static('src'));
app.listen('3030', function(){ 
    console.log("Servidor corriendo en http://127.0.0.1:3030");
});
