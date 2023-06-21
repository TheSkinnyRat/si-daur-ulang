const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      balance.hasMany(models.balanceHistory);
    }
  }
  balance.init({
    name: DataTypes.STRING,
    amount: DataTypes.DECIMAL(19, 4),
  }, {
    sequelize,
    modelName: 'balance',
  });
  return balance;
};
