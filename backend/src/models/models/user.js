const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    idx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email"
    },
    last_name: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    pw: {
      type: DataTypes.STRING(350),
      allowNull: false
    },
    img: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    issued_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'user',
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
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
