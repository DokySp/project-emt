const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_division_link', {
    user_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'idx'
      }
    },
    division_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'division',
        key: 'idx'
      }
    }
  }, {
    sequelize,
    tableName: 'user_division_link',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_idx" },
          { name: "division_idx" },
        ]
      },
      {
        name: "division_idx",
        using: "BTREE",
        fields: [
          { name: "division_idx" },
        ]
      },
    ]
  });
};
