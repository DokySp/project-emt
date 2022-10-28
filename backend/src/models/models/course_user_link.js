const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('course_user_link', {
    course_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'course',
        key: 'idx'
      }
    },
    user_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'idx'
      }
    },
    started_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'course_user_link',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "course_idx" },
          { name: "user_idx" },
        ]
      },
      {
        name: "user_idx",
        using: "BTREE",
        fields: [
          { name: "user_idx" },
        ]
      },
    ]
  });
};
