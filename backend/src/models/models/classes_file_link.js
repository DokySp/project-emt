const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('classes_file_link', {
    classes_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'classes',
        key: 'idx'
      }
    },
    file_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'file',
        key: 'idx'
      }
    }
  }, {
    sequelize,
    tableName: 'classes_file_link',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "classes_idx" },
          { name: "file_idx" },
        ]
      },
      {
        name: "file_idx",
        using: "BTREE",
        fields: [
          { name: "file_idx" },
        ]
      },
    ]
  });
};
