/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pointWithdrawals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      date: {
        type: Sequelize.DATE,
      },
      amount: {
        type: Sequelize.DECIMAL(19, 4),
      },
      pointWithdrawalStatusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pointWithdrawalStatuses',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pointWithdrawals');
  },
};
