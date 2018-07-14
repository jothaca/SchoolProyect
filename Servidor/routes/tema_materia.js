var express = require('express');
var router = express.Router();
var model = require('../models/index');


router.get('/', function(req, res, next) {

  model.Tema_Materia.findAll({})
    .then(Tema_Materia => res.json({
      error : false,
      data : Tema_Materia
    }))
    .catch(error =>res.json({
      error : true,
      data : [],
      error : error

    }));

});

/* GET users listing. */
router.post('/', function(req, res, next) {
   const {
    id
  } = req.body;
  model.Tema_Materia.findAll({where: {id_materia:id}})
    .then(tema_materia => res.status(200).json({
      error : false,
      data : tema_materia
    }))
    .catch(error =>res.json({
      error : true,
      data : [],
      error : error

    }));

});




module.exports = router;
