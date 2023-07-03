const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class recycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      recycle.belongsTo(models.user);
      recycle.belongsTo(models.recycleStatus);
      recycle.hasOne(models.pointHistory);
      // recycle.driverId -> user.id
      recycle.belongsTo(models.user, {
        as: 'driver',
        foreignKey: 'driverId',
      });
    }
  }
  recycle.init({
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    selfDelivery: DataTypes.BOOLEAN,
    recycleStatusId: DataTypes.INTEGER,
    actualType: DataTypes.STRING,
    actualWeight: DataTypes.FLOAT,
    actualPoint: DataTypes.DECIMAL(19, 4),
  }, {
    sequelize,
    modelName: 'recycle',
  });
  return recycle;
};
