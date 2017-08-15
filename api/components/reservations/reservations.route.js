var express = require('express');
var	router = express.Router();
var reservationsController = require('./reservations.controller.js');

router.param('id', function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/save_reservations')
  .post(function(req,res){
    reservationsController.save(req,res);

  });
router.route('/get_all_reservations')
  .get(function(req,res){
    reservationsController.findAll(req,res);
  });

router.route('/update_reservations')
  .put(function(req, res){
    reservationsController.update(req,res);
 	});


module.exports = router;