require('@next/env').loadEnvConfig('./');

const dbConfig = {};
dbConfig.environment = process.env.NODE_ENV;
dbConfig.sequelize = {};
dbConfig.sequelize.username = process.env.DB_USERNAME;
dbConfig.sequelize.password = process.env.DB_PASSWORD;
dbConfig.sequelize.database = process.env.DB_NAME;
dbConfig.sequelize.host = process.env.DB_HOST;
dbConfig.sequelize.dialect = process.env.DB_DIALECT;
dbConfig.sequelize.port = process.env.DB_PORT;
dbConfig.sequelize.timezone = process.env.APP_TIMEZONE_CODE;
dbConfig.sequelize.define = {
  charset: 'utf8mb4',
  dialectOptions: {
    collate: 'utf8mb4_unicode_ci',
  },
};

const dbSequelizeConfig = {};
dbSequelizeConfig[dbConfig.environment] = dbConfig.sequelize;

module.exports = dbSequelizeConfig;
