const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class balanceHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      balanceHistory.belongsTo(models.balance);
      balanceHistory.belongsTo(models.recycle);
    }
  }
  balanceHistory.init({
    balanceId: DataTypes.INTEGER,
    recycleId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    description: DataTypes.TEXT,
    amount: DataTypes.STRING,
    startBalance: DataTypes.STRING,
    currentBalance: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'balanceHistory',
  });
  return balanceHistory;
};
