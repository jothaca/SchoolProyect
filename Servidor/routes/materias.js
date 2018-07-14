var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {

  model.Materia.findAll({})
    .then(materia => res.json({
      error : false,
      data : materia
    }))
    .catch(error =>res.json({
      error : true,
      data : [],
      error : error

    }));

});

router.post('/', function(req, res, next) {
   const {
    id
  } = req.body;
  model.Materia.findAll({where: {id_curso:id}})
    .then(materia=> res.status(200).json({
      error : false,
      data : materia
    }))
    .catch(error =>res.json({
      error : true,
      data : [],
      error : error

    }));

});




module.exports = router;
