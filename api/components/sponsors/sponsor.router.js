var express = require('express');
var router = express.Router();
var sponsorController = require('./sponsor.controller.js');

//para aquellas rutas que ocupen un id

router.param('id', function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/save_sponsor')
  .post(function(req,res){
    sponsorController.save(req,res);

  });
router.route('/get_all_sponsors')
  .get(function(req,res){
    sponsorController.findAll(req,res);
  });

module.exports = router;
