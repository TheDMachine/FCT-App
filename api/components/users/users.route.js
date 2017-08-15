var express = require('express');
var	router = express.Router();
var userController = require('./users.controller.js');

router.param('id',function(req, res, next, id){
  req.body.id = id;
  next();
});

router.route('/users')
  .post(function(req, res){
    userController.save(req,res);
 	});

router.route('/users')
  .get(function(req, res){
      userController.findAll(req,res);
  });
router.route('/users/:id')
  .delete(function(req, res){
    userController.remove(req,res);
 	});
router.route('/update_user')
  .put(function(req, res){
    userController.update(req,res);
 	});
  router.route('/save_teacher')
    .post(function(req, res){
      userController.saveTeacher(req,res);
   	});

    router.route('/get_all_teachers')
      .get(function(req,res){
        userController.findAllTeachers(req,res);
      });

      router.route('/update_teacher')
        .put(function(req, res){
          userController.updateTeacher(req,res);
       	});

  router.route('/update_belt')
    .put(function(req, res){
      userController.updateBelt(req,res);
   	});

module.exports = router;
