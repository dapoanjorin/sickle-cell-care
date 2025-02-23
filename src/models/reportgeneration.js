'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReportGeneration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReportGeneration.init({
    patientId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    reportType: DataTypes.STRING,
    generatedDate: DataTypes.DATE,
    summary: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ReportGeneration',
  });
  return ReportGeneration;
};