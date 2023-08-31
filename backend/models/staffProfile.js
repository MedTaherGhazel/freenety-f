const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class StaffProfile extends Model {
    static associate (models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  }

  StaffProfile.init(
    {
      position: {
        type: DataTypes.STRING,
        allowNull: false
      },
      departement: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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
      modelName: 'StaffProfile'
    }
  )
  return StaffProfile
}
