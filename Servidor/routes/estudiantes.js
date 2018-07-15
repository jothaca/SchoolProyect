var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {

  model.Estudiante.findAll({})
    .then(estudiante => res.json({
      error : false,
      data : estudiante
    }))
    .catch(error =>res.json({
      error : true,
      data : [],
      error : error

    }));

});
router.get('/buscar/:id', function(req, res, next) {
    const id = req.params.id;
    console.log("hiii");
  model.Estudiante.findAll({where: {id:id}})
    .then(estudiante=> res.json({
      error : false,
      data : estudiante
    }))
    .catch(error =>res.json({
      error : true,
      data : [],
      error : error

    }));

});

router.get('/iniciarSesion/:id', function(req, res, next) {
  const id = req.params.id;
  global.idEstudiante= id;
  res.json({
    id:id,
    sesion:global.idEstudiante

  })
});
router.get('/getSesion', function(req, res, next) {
  res.json({
    error:false,
    id: global.idEstudiante
  })
});

module.exports = router;
