const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subjects', {
    idx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    course_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course',
        key: 'idx'
      }
    },
    vimeo_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    report: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    last_submitted_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    comment: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    last_return_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'subjects',
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
        name: "course_idx",
        using: "BTREE",
        fields: [
          { name: "course_idx" },
        ]
      },
    ]
  });
};
