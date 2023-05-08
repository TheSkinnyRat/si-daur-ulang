const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class recycleStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      recycleStatus.hasMany(models.recycle);
    }
  }
  recycleStatus.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'recycleStatus',
  });
  return recycleStatus;
};
