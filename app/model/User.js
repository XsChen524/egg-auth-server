'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), allowNull: false },
    email: { type: STRING(30), allowNull: false },
    password: { type: STRING(64), allowNull: false },
  });

  return User;
};
