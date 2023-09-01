const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('talents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      talent_data: {
        type: DataTypes.JSON(),
        defaultValue: {
          "links": [null],
          "languages": [null],
          "diplomas": [null],
          "jobs": [null],
          "internships": [null],
          "skills": [null]
        }
      },
      membership_type: {
        type: DataTypes.STRING,
        defaultValue: 'BASIC'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('talents');
  }
};
