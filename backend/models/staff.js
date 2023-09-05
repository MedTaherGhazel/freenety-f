const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    static associate (models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  }

  Staff.init(
    {
      position: DataTypes.STRING,
      departement: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,

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
