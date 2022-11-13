const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('submit_file_link', {
    submit_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'submit',
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
    tableName: 'submit_file_link',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "submit_idx" },
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
