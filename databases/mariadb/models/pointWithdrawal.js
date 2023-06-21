const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pointWithdrawal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      pointWithdrawal.belongsTo(models.user);
      pointWithdrawal.belongsTo(models.pointWithdrawalStatus);
    }
  }
  pointWithdrawal.init({
    userId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    amount: DataTypes.DECIMAL(19, 4),
    pointWithdrawalStatusId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'pointWithdrawal',
  });
  return pointWithdrawal;
};
