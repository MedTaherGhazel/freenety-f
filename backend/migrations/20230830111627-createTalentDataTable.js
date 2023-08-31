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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      work_experiences: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      internships: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('talent_data');
  }
};
