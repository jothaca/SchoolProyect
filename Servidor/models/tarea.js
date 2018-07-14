'use strict';



module.exports = (sequelize, DataTypes) => {


  var Tarea = sequelize.define('Tarea', {
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    id_tema: DataTypes.STRING,
    logros: DataTypes.STRING,
    id_curso: DataTypes.STRING,
    id_materia: DataTypes.STRING,
    fecha_culminacion: DataTypes.DATE,
    archivo: DataTypes.STRING,
    color_fondo: DataTypes.STRING,
    color_texto: DataTypes.STRING,
    hora: DataTypes.STRING
  }, {});


  Tarea.associate = function(models) {



  };
  return Tarea;
};
