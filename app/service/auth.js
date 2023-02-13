'use strict';

const bcrypt = require('bcryptjs');
const Service = require('egg').Service;

class AuthService extends Service {
  /**
   * Check if the user name exists in the database
   * @param {string} name Username
   * @return {object} array of the users with the name
   */
  async checkUserName(name) {
    const users = await this.ctx.model.User.findAll({
      attributes: [ 'name' ],
      where: { name },
    });
    return users;
  }

  /**
   * Rigister the user into database
   * @param {object} body ctx.request.body
   * @return {object} user object created
   */
  async register(body) {
    const { name, password, email } = body;
    const hash = bcrypt.hashSync(password, this.config.bcrypt.saltRounds);
    const user = await this.ctx.model.User.create({ name, password: hash, email });
    return user;
  }

  /**
   * User login, token signing after successfully logged in
   * @param {object} body ctx.request.body
   * @return {object} {email, token}
   */
  async login(body) {
    const { email, password } = body;
    const user = await this.ctx.model.User.findOne({
      where: { email },
    });
    if (!user) return {};

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { id, email } = user;
      const { jwt: { secret, sign: { expiresIn } } } = this.app.config; // Load jwt options from config
      const token = this.app.jwt.sign({
        id,
        email,
        iat: (new Date()).valueOf(),
      }, secret, { expiresIn }); // Token generation, expires in 7 days
      return { id, email, token };
    }
  }
}

module.exports = AuthService;
