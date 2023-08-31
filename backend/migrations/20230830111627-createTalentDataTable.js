'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('talent_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      diplomas: {
        type: DataTypes.JSON(),
        allowNull: true
      },
      work_experiences: {
        type: DataTypes.JSON(),
        allowNull: true
      },
      internships: {
        type: DataTypes.JSON(),
        allowNull: true
      },
      skills: {
        type: DataTypes.JSON(),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('talent_data');
  }
};
