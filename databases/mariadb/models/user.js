const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.userRole);
      user.hasMany(models.recycle);
      user.hasMany(models.chat);
      user.hasOne(models.point);
      user.hasMany(models.pointWithdrawal);
      // user.id -> recycle.driverId
      user.hasMany(models.recycle, {
        as: 'driver',
        foreignKey: 'driverId',
      });
    }
  }
  user.init({
    idCard: DataTypes.STRING(16),
    email: DataTypes.STRING,
    phone: DataTypes.STRING(15),
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    password: DataTypes.STRING,
    userRoleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
