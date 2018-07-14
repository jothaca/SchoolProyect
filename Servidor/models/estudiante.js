'use strict';
module.exports = (sequelize, DataTypes) => {
  var Estudiante = sequelize.define('Estudiante', {
    nombre: DataTypes.STRING,
    id_curso: DataTypes.STRING
  }, {});
  Estudiante.associate = function(models) {
    // associations can be defined here
  };
  return Estudiante;
};