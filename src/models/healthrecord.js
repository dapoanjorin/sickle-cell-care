'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HealthRecord.init({
    patientId: DataTypes.INTEGER,
    recordDate: DataTypes.DATE,
    diagnosis: DataTypes.TEXT,
    treatmentPlan: DataTypes.TEXT,
    medications: DataTypes.TEXT,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'HealthRecord',
  });
  return HealthRecord;
};