const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      chat.belongsTo(models.user);
    }
  }
  chat.init({
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    chat: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'chat',
  });
  return chat;
};
