var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tareasRouter = require('./routes/tareas');
var cursosRouter = require('./routes/cursos');
var materiasRouter = require('./routes/materias');
var temas_materiasRouter = require('./routes/tema_materia');
var estudiantesRouter = require('./routes/estudiantes');
var comentariosRouter = require('./routes/comentarios');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/estudiantes/:id',estudiantesRouter);

app.use('/estudiantes',estudiantesRouter);
app.use('/estudiantes/iniciarSesion/:id',estudiantesRouter);
app.use('/estudiantes/getSesion/',estudiantesRouter);


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/tareas', tareasRouter);
app.use('/tareas/:grado', tareasRouter);
app.use('/tareas/crear', tareasRouter);

app.use('/cursos', cursosRouter);

app.use('/materias', materiasRouter);

app.use('/tema_materias', temas_materiasRouter);


app.use('/comentarios',comentariosRouter);
app.use('/comentarios/:tarea',comentariosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;