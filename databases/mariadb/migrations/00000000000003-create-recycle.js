/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recycles', {
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
      type: {
        type: Sequelize.STRING,
      },
      weight: {
        type: Sequelize.FLOAT,
      },
      selfDelivery: {
        type: Sequelize.BOOLEAN,
      },
      driverId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      recycleStatusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recycleStatuses',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      actualType: {
        type: Sequelize.STRING,
      },
      actualWeight: {
        type: Sequelize.FLOAT,
      },
      actualPoint: {
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
    await queryInterface.dropTable('recycles');
  },
};
