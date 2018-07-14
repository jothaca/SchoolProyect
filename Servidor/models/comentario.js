'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comentario = sequelize.define('Comentario', {
    comentario: DataTypes.STRING,
    id_estudiante: DataTypes.STRING,
    id_tarea: DataTypes.STRING
  }, {});
  Comentario.associate = function(models) {
    // associations can be defined here
  };
  return Comentario;
};