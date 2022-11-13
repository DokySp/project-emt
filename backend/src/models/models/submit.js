const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('submit', {
    idx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    subjects_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'idx'
      }
    },
    report: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    comments: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    return_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    submitted_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'submit',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idx" },
        ]
      },
      {
        name: "subjects_idx",
        using: "BTREE",
        fields: [
          { name: "subjects_idx" },
        ]
      },
    ]
  });
};
