var reservation = require('./reservations.model.js');
var email= require('./../notifications/email');
module.exports.save = function(req, res){
	var newReservation = new reservation({
		event:req.body.event,
		tktsQuantity:req.body.tktsQuantity,
		email:req.body.email,
		fullName:req.body.fullName,
		ced:req.body.ced,
		cardNumber:req.body.cardNumber,
		cardExpiration:req.body.cardExpiration,
		confirmationNum:req.body.confirmationNum,
		state:req.body.state
	});

	newReservation.save(function(err){
		if (err) {
			res.json({succes:false, msg:'No se pudo registrar la reservación' + err});
		}else{
			// pTemplate, pDestine, pSubject, pValues
			email.sEmail('confirmReservation',req.body.email, 'Confirmación de reserva',{"confirmationNum":req.body.confirmationNum,"tktsQuantity":req.body.tktsQuantity,"name":req.body.fullName, "event":req.body.event});
			res.json({succes:true, msg:'Se registró la reservación correctamente'});
		}
	});
}

module.exports.findAll = function(req, res) {
	reservation.find().then(function(reservations){
		res.send(reservations);
	})
};

module.exports.update = function(req, res) {
	console.log(req.body.id);
	console.log(req.body.email);
	reservation.findByIdAndUpdate(req.body._id, {$set:req.body}).then(function(data){
			email.sEmail('cancelReservation',req.body.email, 'Cancelación de reserva',{"confirmationNum":req.body.confirmationNum});
			res.json({succes:true, msg: 'Se ha actualizado el estado de la reservation correctamente.' });
	});
};