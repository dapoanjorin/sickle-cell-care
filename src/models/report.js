'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Report.init({
    patientId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    reportType: DataTypes.STRING,
    generatedDate: DataTypes.DATE,
    summary: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};