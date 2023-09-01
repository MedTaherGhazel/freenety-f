const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    static associate (models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  }

  Staff.init(
    {
      position: {
        type: DataTypes.STRING
      },
      departement: {
        type: DataTypes.STRING
      },
      isActive: {
        type: DataTypes.BOOLEAN
      },
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
      modelName: 'Staff'
    }
  )
  return Staff
}
