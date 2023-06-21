const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class point extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      point.belongsTo(models.user);
      point.hasMany(models.pointHistory);
    }
  }
  point.init({
    userId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL(19, 4),
  }, {
    sequelize,
    modelName: 'point',
  });
  return point;
};
