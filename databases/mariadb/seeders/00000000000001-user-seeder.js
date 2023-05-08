/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const bcrypt = require('bcrypt');

const hashPassword = (password) => bcrypt.hashSync(password, parseInt(process.env.APP_ROUND_SALT, 10));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      idCard: '0000000000000000',
      email: 'admin@email.com',
      phone: null,
      name: 'Default Admin',
      address: null,
      password: hashPassword('admin'),
      userRoleId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
