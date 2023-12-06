'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull:false,
        type: Sequelize.STRING
      },
      email: {
        allowNull:false,
        unique:true,
        type: Sequelize.STRING
      },
      password: {
        allowNull:false,
        type: Sequelize.STRING
      },
      weight: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      gender: {
        allowNull:false,
        type: Sequelize.STRING
      },
      height: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      dateBirth: {
        allowNull:false,
        type: Sequelize.DATE
      },
      activityLevel: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      targetWeight: {
        allowNull:false,
        type: Sequelize.STRING
      },
      extra: {
        type: Sequelize.STRING
      },
      calorieLimit: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};