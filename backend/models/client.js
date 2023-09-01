const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate (models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  }

  Client.init(
    {
      company_name:DataTypes.STRING,
      company_addr:DataTypes.STRING,
      client_data: DataTypes.JSON(),
      membership_type: DataTypes.STRING,

      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Client'
    }
  )
  return Client
}
