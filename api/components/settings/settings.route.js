var express = require('express');
var router = express.Router();
var settingController = require('./settings.controller');

router.param('id', function(req, res, next, id) {
  req.body.id = id;
  next();
});
// Sección de parametros del sistema
router.route('/update_param')
    .put(function(req,res) {
        settingController.updateParam(req,res);
    });
router.route('/get_param')
    .get(function(req,res){
        settingController.getParam(req,res);
    });
// Sección de directivo
router.route('/save_directive')
    .post(function(req,res) {
        settingController.saveDirective(req,res);
    });
router.route('/get_directive')
    .get(function(req,res) {
        settingController.getAllDirect(req,res);
    })
router.route('/update_directive')
    .put(function(req,res) {
        settingController.updateDirective(req,res);
    })
router.route('/delete_directive')
    .put(function(req,res) {
        settingController.deleteDirective(req,res);
    })
// Sección de bitacora del sistema.
router.route('/set_log')
    .post(function(req, res){
        settingController.setLog(req,res);
    });
router.route('/get_log')
    .get(function(req,res){
        settingController.getLog(req,res);
    })
module.exports = router;
