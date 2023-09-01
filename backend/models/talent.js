const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Talent extends Model {
    static associate (models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  }

  Talent.init(
    {
      portfolio:DataTypes.STRING,
      talent_data: DataTypes.JSON(),
      isActive: DataTypes.BOOLEAN,
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
      modelName: 'Talent'
    }
  )
  return Talent
}
