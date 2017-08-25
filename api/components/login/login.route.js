var express = require('express');
var	router = express.Router();
var loginController = require('./login.controller.js');

router.param('id', function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/find_user')
  .post(function(req,res){
    loginController.getCredentials(req,res);
  });

  router.route('/recover_password')
  .put(function(req,res){
    loginController.recoverPassword(req,res);
  });

  module.exports = router;