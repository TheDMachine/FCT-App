var express = require('express');
var	router = express.Router();
var eventsController = require('./events.controller.js');

router.param('id', function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/save_events')
  .post(function(req,res){
    eventsController.save(req,res);

  });
router.route('/get_all_events')
  .get(function(req,res){
    eventsController.findAll(req,res);
  });


router.route('/update_events')
  .put(function(req, res){
    eventsController.update(req,res);
 	});

router.route('/save_competition')
  .post(function(req, res){
    eventsController.saveCompetition(req, res);
  });

router.route('/get_all_competitions')
  .get(function(req, res){
    eventsController.findAllCompetitions(req, res);
  });

  //Backend update Competencias Josué
  router.route('/update_competition')
    .put(function(req, res){
      eventsController.updateCompetition(req,res);
   	});

    //Desactivar Competencias
    router.route('/delete_competition')
      .put(function(req, res){
        eventsController.deleteCompetition(req,res);
      });

module.exports = router;
