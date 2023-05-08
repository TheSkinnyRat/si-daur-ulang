/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('balanceHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      balanceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'balances',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      recycleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recycles',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      date: {
        type: Sequelize.DATE,
      },
      type: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      amount: {
        type: Sequelize.STRING,
      },
      startBalance: {
        type: Sequelize.STRING,
      },
      currentBalance: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('balanceHistories');
  },
};
