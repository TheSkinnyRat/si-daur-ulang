const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pointHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      pointHistory.belongsTo(models.point);
      pointHistory.belongsTo(models.recycle);
    }
  }
  pointHistory.init({
    pointId: DataTypes.INTEGER,
    recycleId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    description: DataTypes.TEXT,
    amount: DataTypes.DECIMAL(19, 4),
    startPoint: DataTypes.DECIMAL(19, 4),
    currentPoint: DataTypes.DECIMAL(19, 4),
  }, {
    sequelize,
    modelName: 'pointHistory',
  });
  return pointHistory;
};
