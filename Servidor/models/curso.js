'use strict';
module.exports = (sequelize, DataTypes) => {
  var Curso = sequelize.define('Curso', {
    grado: DataTypes.STRING,
    grupo: DataTypes.STRING
  }, {});
  Curso.associate = function(models) {
    // associations can be defined here
  };
  return Curso;
};
