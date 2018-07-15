var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/estudiante/:id', function(req, res, next) {
  const id = req.params.id;
  global.idEstudiante= id;
  res.json({
    id:id,
    sesion:global.idEstudiante

  })
});

router.get('/estudiante', function(req, res, next) {
  res.json({
    error:false,
    id: global.idEstudiante
  })
});
module.exports = router;
