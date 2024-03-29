const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pointWithdrawalStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      pointWithdrawalStatus.hasMany(models.pointWithdrawal);
    }
  }
  pointWithdrawalStatus.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'pointWithdrawalStatus',
  });
  return pointWithdrawalStatus;
};
