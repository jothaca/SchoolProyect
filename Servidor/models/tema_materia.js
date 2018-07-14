'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tema_Materia = sequelize.define('Tema_Materia', {
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    id_materia: DataTypes.STRING
  }, {});
  Tema_Materia.associate = function(models) {
    // associations can be defined here
  };
  return Tema_Materia;
};