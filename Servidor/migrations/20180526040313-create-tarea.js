'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tareas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      tema: {
        type: Sequelize.STRING
      },
      logros: {
        type: Sequelize.STRING
      },
      grado: {
        type: Sequelize.STRING
      },
      materia: {
        type: Sequelize.STRING
      },
      fecha_culminacion: {
        type: Sequelize.DATE
      },
      hora: {
        type: Sequelize.STRING
      },
      archivo: {
        type: Sequelize.STRING
      },
      color_fondo: {
        type: Sequelize.STRING
      },
      color_texto: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tareas');
  }
};
