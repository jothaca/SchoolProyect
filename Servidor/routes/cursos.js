var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {

  model.Curso.findAll({})
    .then(curso => res.json({
      error : false,
      data : curso
    }))
    .catch(error =>res.json({
      error : true,
      data : [],
      error : error

    }));

});



module.exports = router;
