'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);
  router.get('/auth', jwt, controller.auth.index); // Add jwt middleware to auth, 401 if unauthorized
  router.post('/auth/signup', controller.auth.register);
  router.post('/auth/login', controller.auth.login);
};
