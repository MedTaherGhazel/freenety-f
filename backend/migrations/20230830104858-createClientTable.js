/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clients', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_addr: {
        type: Sequelize.STRING,
        allowNull: true
      },
      client_data: {
        type: Sequelize.JSON(),
        defaultValue: {
          links: [null]
        }
      },
      membership_type: {
        type: Sequelize.STRING,
        defaultValue: 'BASIC'
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clients')
  }
}
