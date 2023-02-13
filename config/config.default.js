/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1676094629315_2943';

  config.jwt = {
    secret: config.keys,
    sign: {
      expiresIn: 604800000, // jwt token expires in 7 days
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'gp7506',
    username: 'GP7506',
    password: 'EGTKxwnfTciAEW8T',
    timezone: '+08:00',
    define: {
      timestamps: true, // Auto-update createdAt, updatedAt
    },
  };

  config.security = {
    csrf: {
      enable: false, // csrf turned off!!!
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.bcrypt = {
    saltRounds: 10,
  };

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
