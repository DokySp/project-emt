const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subjects_file_link', {
    subjects_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'subjects',
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
    tableName: 'subjects_file_link',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "subjects_idx" },
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
