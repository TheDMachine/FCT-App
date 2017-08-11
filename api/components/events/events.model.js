var mongoose = require('mongoose');

var states = ['aprobado','cancelado','banned'];

var EventSchema = new mongoose.Schema({
  // Aqui va el modelo de eventos
});

module.exports = mongoose.model('events', EventSchema);