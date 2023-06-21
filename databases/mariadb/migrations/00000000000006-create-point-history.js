/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pointHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pointId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'points',
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
        type: Sequelize.DECIMAL(19, 4),
      },
      startPoint: {
        type: Sequelize.DECIMAL(19, 4),
      },
      currentPoint: {
        type: Sequelize.DECIMAL(19, 4),
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
    await queryInterface.dropTable('pointHistories');
  },
};
