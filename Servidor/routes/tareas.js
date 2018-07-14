var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const sequelize = new Sequelize('SCalend', 'root', 'federico', {
  host: '127.0.0.1',
  dialect: 'mysql',
});



var multer  = require('multer');
var nombreArchivo="";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/archivos/')
  },
  filename: function (req, file, cb) {
    nombreArchivo = Date.now()+ '-' + file.originalname;
    cb(null,nombreArchivo )
  }
})

var upload = multer({ storage: storage });

var model = require('../models/index');


/* GET users listing. */
router.get('/', function(req, res, next) {

  model.Tarea.findAll({})
    .then(tareas => res.json({
      error : false,
      data : tareas
    }))
    .catch(error =>res.json({
      error : true,
      data : [],
      error : error

    }));
});


router.get('/verTarea/:id', function(req, res, next) {
  const id = req.params.id;
  global.idTarea= id;
  res.json({
    id:id

  })
});

router.get('/detalleTarea/:id', function(req, res, next) {
  const id = req.params.id;

sequelize.query( "SELECT * FROM Tareas t inner join Materia m on t.id_materia = m.id inner join Tema_Materia tm  on tm.id=t.id_tema inner join Cursos c on t.id_curso = c.id inner join Profesors p on p.id=m.id_profesor  where t.id = " + id , { type: sequelize.QueryTypes.SELECT})
  .then(detalle =>res.json( {
      error : false,
      data : detalle
  }))
});
router.get('/detalleTarea', function(req, res, next) {
  res.json({
    error:false,
    id: global.idTarea
  })


});
router.get('/detalleTareaId/:id', function(req, res, next) {
  const id = req.params.id;

sequelize.query( "SELECT t.titulo as titulo, t.descripcion as descripcion, tm.titulo as tmTitulo, tm.descripcion as tmDescipcion, concat( c.grado,'-', c.grupo) as grado, m.nombre as materia, t.fecha_culminacion as fecha, t.archivo as archivo, t.logros as logros FROM Tareas t inner join Cursos c on t.id_curso=c.id inner join tema_materia tm on tm.id=t.id_tema inner join materia m on m.id=t.id_materia where t.id="+id, { type: sequelize.QueryTypes.SELECT})
  .then(detalle =>res.json( {
      error : false,
      data : detalle
  }))
});

router.get('/:id_curso', function(req, res, next) {

  const id_curso = req.params.id_curso;


  sequelize.query('SELECT  m.nombre, t.titulo, t.fecha_culminacion,t.hora, t.id FROM Tareas t inner join Materia m on t.id_materia = m.id inner join Cursos c on t.id_curso = c.id  where t.id_curso='+ id_curso  +' ORDER by t.fecha_culminacion ASC' , { type: sequelize.QueryTypes.SELECT})
    .then(tareas =>res.json( {
        error : false,
        data : tareas
    }))
});

router.get('/detalleTarea', function(req, res, next) {
  res.json({
    error:false,
    id: global.idTarea
  })


});
router.post('/crear', upload.any() ,function(req, res, next){


  const {
    titulo,
    descripcion,
    grado,
    materia,
    tema,
    logros,
    fecha_culminacion,
    hora,
    colorForeground,
    colorBackground
  } = req.body;


  model.Tarea.create({
    titulo:titulo,
    descripcion:descripcion,
    id_materia:materia,
    id_tema:tema,
    logros:logros,
    id_curso:grado,
    color_fondo:colorBackground,
    color_texto:colorForeground,
    archivo:nombreArchivo,
    fecha_culminacion:fecha_culminacion,
    hora:hora

  })
  .then(tarea => res.status(201).json({
      error : false,
      data : tarea,
      message: 'Nueva tarea creada.!'
  }))
  .catch(error => res.json({
      error : true,
      data : [],
      error : error

  }));

});



module.exports = router;
