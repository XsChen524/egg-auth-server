'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {

  /**
   * register controller
   * @return {object} {status, msg}
   */
  async register() {
    const ctx = this.ctx;
    const users = await ctx.service.auth.checkUserName(ctx.request.body.name);
    if (users[0]) {
      ctx.status = 403;
      ctx.body = { status: false, msg: 'User already exist' };
      return;
    }
    await ctx.service.auth.register(ctx.request.body);
    ctx.status = 200;
    ctx.body = { status: true, msg: 'sign up successfully' };
    return;
  }

  /**
   * login controller
   * @return {object} {status, email, token}
   */
  async login() {
    const ctx = this.ctx;
    const data = await ctx.service.auth.login(ctx.request.body);
    if (!data) {
      ctx.status = 401;
      ctx.body = { status: false, msg: 'Wrong username or password' };
      return;
    }
    ctx.body = { status: true, msg: 'Login successfully', data };
  }

  async index() {
    const { ctx } = this;
    console.log(ctx.state.user); // User state is compressed in ctx.state.user
    ctx.body = { code: 0, msg: 'success' };
  }
}

module.exports = AuthController;
