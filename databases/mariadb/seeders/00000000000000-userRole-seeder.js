/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('userRoles', [{
      id: 0,
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 1,
      name: 'staff',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      name: 'driver',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 3,
      name: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('userRoles', null, {});
  },
};
