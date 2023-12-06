"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FoodEatens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      historyId: {
        type: Sequelize.INTEGER,
        references: { model: "Histories", key: "id" },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      foodId: {
        type: Sequelize.INTEGER,
        references: { model: "Food", key: "id" },
        onDelete: "cascade",
        onUpdate: "cascade",
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
    await queryInterface.dropTable("FoodEatens");
  },
};
