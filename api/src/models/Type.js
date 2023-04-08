const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  });
};
