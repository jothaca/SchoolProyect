'use strict';
module.exports = (sequelize, DataTypes) => {
  var Materia = sequelize.define('Materia', {
    nombre: DataTypes.STRING,
    id_curso: DataTypes.STRING,
    id_profesor: DataTypes.STRING
  }, {});
  Materia.associate = function(models) {
    // associations can be defined here
  };
  return Materia;
};