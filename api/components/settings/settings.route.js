var express = require('express');
var router = express.Router();
var settingController = require('./settings.controller');

router.param('id', function(req, res, next, id) {
  req.body.id = id;
  next();
});
router.route('/save_direct')
    .post(function(req,res){
        settingController.saveDirect(req,res);
    });
router.route('/get_settings')
    .get(function(req,res){
        settingController.getAll(req,res);
    });
router.route('/update_param')
    .put(function(req,res){
        settingController.updateParam(req,res);
    });
router.route('/set_log')
    .post(function(req, res){
        settingController.setLog(req,res);
    });
router.route('/get_logs')
    .get(function(req,res){
        settingController.getLogs(req,res);
    })
module.exports = router;
