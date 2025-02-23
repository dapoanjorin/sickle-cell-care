'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicationAdherence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MedicationAdherence.init({
    patientId: DataTypes.INTEGER,
    medicationName: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    taken: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'MedicationAdherence',
  });
  return MedicationAdherence;
};