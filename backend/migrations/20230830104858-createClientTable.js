const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      company_addr: {
        type: DataTypes.STRING,
        allowNull: true
      },
      company_website: {
        type: DataTypes.STRING,
        allowNull: true
      },
      linkedin: {
        type: DataTypes.STRING,
        allowNull: true
      },
      social_media: {
        type: DataTypes.STRING,
        allowNull: true
      },
      membership_type: {
        type: DataTypes.STRING,
        defaultValue: 'BASIC'
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
    await queryInterface.dropTable('clients');
  }
};
