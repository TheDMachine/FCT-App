var reservation = require('./reservations.model.js');

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
	reservation.findByIdAndUpdate(req.body._id, {$set:req.body}).then(function(data){
			res.json({succes:true, msg: 'Se ha actualizado el estado de la reservation correctamente.' });
	});
};