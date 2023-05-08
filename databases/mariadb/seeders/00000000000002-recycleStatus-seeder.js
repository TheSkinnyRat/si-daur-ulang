/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('recycleStatuses', [{
      id: 0,
      name: 'requested',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 1,
      name: 'driver-pickup',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      name: 'driver-picked',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 3,
      name: 'accepted',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 4,
      name: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('recycleStatuses', null, {});
  },
};
