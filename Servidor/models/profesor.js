'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profesor = sequelize.define('Profesor', {
    nombre: DataTypes.STRING
  }, {});
  Profesor.associate = function(models) {
    // associations can be defined here
  };
  return Profesor;
};