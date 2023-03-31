const { DataTypes } = require('sequelize');
console.log("Please here me - model.js");
const logger = require('../logger/logger');
function model(sequelize){
  const options = {
    defaultScope: {
        // exclude hash by default
        attributes: { exclude: ['hash'] }
    },
    scopes: {
        // include hash with this scope
        withHash: { attributes: {}, }
    }
  };
  const  attributes={
    username:{
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    account_created:{
      type: DataTypes.STRING,
      allowNull: false
    },
    account_updated:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }
  return sequelize.define('User',attributes,options);
}

module.exports = model;