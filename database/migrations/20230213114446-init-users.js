'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {

    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), allowNull: false },
      email: { type: STRING(30), allowNull: false },
      password: { type: STRING(64), allowNull: false },
      createdAt: DATE,
      updatedAt: DATE,
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
