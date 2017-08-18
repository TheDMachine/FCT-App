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
		org :           {
							orgName:req.body.org.orgName,
							orgType:req.body.org.orgType,
							description:req.body.org.description
						},
		date : 			{
							date1:req.body.date.date1,
							date2:req.body.date.date2
						},
		time : 			{
							time1:req.body.time.time1,
							time2:req.body.time.time2
						},
		place: 			{
							placeName:req.body.place.placeName,
							coords:req.body.place.coords,
							seats:req.body.place.seats,
							tickets:req.body.place.tickets,
							ticketPrice:req.body.place.ticketPrice,
							contactName:req.body.place.contactName,
							contactPhone:req.body.place.contactPhone
						}

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
    competitionAge: req.body.competitionAge,
    competitionWeight: req.body.competitionWeight,
    competitors: req.body.competitors
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
