var express = require('express');
var router = express.Router();
var model = require('../models/index');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('SCalend', 'root', 'federico', {
  host: '127.0.0.1',
  dialect: 'mysql',
});
/* GET users listing. */
router.get('/', function(req, res, next) {

  model.Comentario.findAll({})
    .then(comentario => res.json({
      error : false,
      data : comentario
    }))
    .catch(error =>res.json({
      error : true,
      data : [],
      error : error

    }));

});
router.get('/:tarea', function(req, res, next) {
  const tarea = req.params.tarea;
  sequelize.query( "select c.id, c.comentario,e.nombre as nombre from comentarios c, estudiantes e where c.id_tarea="+tarea+" and c.id_estudiante=e.id "
, { type: sequelize.QueryTypes.SELECT})
  .then(comentario =>res.json( {
      error : false,
      data : comentario
  }))


});

module.exports = router;
