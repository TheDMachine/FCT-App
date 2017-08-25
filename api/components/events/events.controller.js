var event = require('./events.model.js');
var competition = require('./competitions.model.js');

module.exports.save = function(req, res){
	var newEvent = new event({
		eventName :req.body.eventName,
		eventType:req.body.eventType,
		eventState:req.body.eventState,
		invitedName:req.body.invitedName,
		charityEvent:req.body.charityEvent,
		selectAcademies:req.body.selectAcademies,
		selectCategories:req.body.selectCategories,
		selectSponsors:req.body.selectSponsors,
		costInsc:req.body.costInsc,
		photo:req.body.photo,
		orgName:req.body.orgName,
		orgType:req.body.orgType,
		description:req.body.description,
		date1:req.body.date1,
		date2:req.body.date2,
		time1:req.body.time1,
		time2:req.body.time2,
		placeName:req.body.placeName,
		coords:req.body.coords,
		seats:req.body.seats,
		tickets:req.body.tickets,
		ticketPrice:req.body.ticketPrice,
		contactName:req.body.contactName,
		contactPhone:req.body.contactPhone
	});

	newEvent.save(function(err){
		if (err){
			res.json({succes:false, msg:'No se pudo registrar el evento' + err});
		}else{
			res.json({succes:true, msg:'Se registró el evento correctamente'});
		}
	});
}

module.exports.findAll = function(req, res){
	event.find().then(function(events){
		res.send(events);
	})
};

module.exports.update = function(req, res){
	console.log(req.body.id);
	event.findByIdAndUpdate(req.body._id, {$set:req.body}).then(function(data){
			res.json({succes:true,msg:'Se ha actualizado el evento correctamente.'});
		});
}

module.exports.saveCompetition = function(req, res){
  var newCompetition = new competition({
    competitionNumber: req.body.competitionNumber,
    eventBelongs: req.body.eventBelongs,
    competitionGenre: req.body.competitionGenre,
    competitionBelt: req.body.competitionBelt,
    competitionAge: req.body.competitionAge,
    competitionWeight: req.body.competitionWeight,
    competitors: req.body.competitors,
	status : req.body.status,
	fights : req.body.fights
  });

  newCompetition.save(function(err){
    if(err){
      res.json({success:false, msg:'No se pudo registrar la competencia' + err});
    }else{
      res.json({success:true, msg:'Se registró la competencia correctamente'});
    }
  });
}

module.exports.findAllCompetitions = function(req,res){
  competition.find().then(function(competitions){
    res.send(competitions);
  })
};
// Backend Josue competencias
module.exports.updateCompetition = function(req, res){
	console.log(req.body.id);
	competition.findByIdAndUpdate(req.body._id, {$set:req.body}).then(function(data){
			res.json({succes:true,msg:'Se ha actualizado la competencia correctamente.'});
		});
}

// Backend  eliminar competencias

module.exports.deleteCompetition = function(req,res){

  competition.findByIdAndUpdate(req.body._id, { $set: {'status': req.body.status}}, function (err, user) {
    if (err){
      res.json({success:true,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }

  });

}
