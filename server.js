//Require y inyecta express.
var express = require('express');
var index = require('./index');
//Ejecuta y guarda el servidor de express en app.
var app = express();
//Requiere y inyecta bodyparser para parsear las solicitudes a json.
var bodyParser = require('body-parser');
//utiliza body parse para parsear las req y res a json.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//configura el puerto de escucha del servidor
app.listen('8040', function() {
  console.log(' Server corriendo en 8040');
});
