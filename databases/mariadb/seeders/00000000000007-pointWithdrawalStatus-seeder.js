/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('pointWithdrawalStatuses', [{
      id: 0,
      name: 'requested',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 1,
      name: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('pointWithdrawalStatuses', null, {});
  },
};
