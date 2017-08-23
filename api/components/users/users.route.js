var express = require('express');
var router = express.Router();
var userController = require('./users.controller.js');

router.param('id', function(req, res, next, id) {
  req.body.id = id;
  next();
});

router.route('/users')
  .post(function(req, res) {
    userController.save(req, res);
  });

router.route('/users')
  .get(function(req, res) {
    userController.findAll(req, res);
  });
router.route('/users/:id')
  .delete(function(req, res) {
    userController.remove(req, res);
  });
router.route('/update_user')
  .put(function(req, res) {
    userController.update(req, res);
  });
// Rutas de Josué
//Rutas para profesores
router.route('/save_teacher')
  .post(function(req, res) {
    userController.saveTeacher(req, res);
  });

router.route('/get_all_teachers')
  .get(function(req, res) {
    userController.findAllTeachers(req, res);
  });

router.route('/update_teacher')
  .put(function(req, res) {
    userController.updateTeacher(req, res);
  });

  //Ruta para Alumnos
  router.route('/save_student')
    .post(function(req, res) {
      userController.saveStudent(req, res);
    });

  router.route('/get_all_students')
    .get(function(req, res) {
      userController.findAllStudents(req, res);
    });

  router.route('/update_student')
    .put(function(req, res) {
      userController.updateStudent(req, res);
    });
//Ruta para subir de grado competidor
router.route('/update_belt')
  .put(function(req, res) {
    userController.updateBelt(req, res);
  });

router.route('/save_consul')
    .post(function(req, res){
        userController.saveConsul(req,res);
    });
module.exports = router;
