var mongoose = require('mongoose');

var states = ['cancelado', 'activo'];

var reservationSchema = new mongoose.Schema({
	event:             {type: String, required: true},
	tktsQuantity:      {type: String, required: true},
	email:             {type: String, required: true},
	fullName:          {type: String, required: true},
	ced:               {type: String, required: true},
	cardNumber:            {type: String, required: true},
	cardExpiration:        {type: String, required: true},
	confirmationNum:   {type: String, required: true},
	state:             {type: String, required: true}
});

module.exports = mongoose.model('reservations', reservationSchema);