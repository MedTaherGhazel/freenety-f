const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clients', {
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
      client_data: {
        type: DataTypes.JSON(),
        defaultValue: {
          "links": [null]
        }
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
    await queryInterface.dropTable('Clients');
  }
};
