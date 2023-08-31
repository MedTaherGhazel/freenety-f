const { DataTypes } = require('sequelize');

module.exports = {
  name: 'StaffProfile',
  attributes: {
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

  // This relationship tells us that a StaffProfile belongs to a User
  belongsTo: {
    user: {
      model: 'User',
      foreignKey: 'user_id'
    }
  }
};
