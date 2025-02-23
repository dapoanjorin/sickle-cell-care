'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EHRIntegration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EHRIntegration.init({
    patientId: DataTypes.INTEGER,
    healthRecordId: DataTypes.INTEGER,
    syncDate: DataTypes.DATE,
    syncStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EHRIntegration',
  });
  return EHRIntegration;
};