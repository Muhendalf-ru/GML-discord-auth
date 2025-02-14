const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model');

class UserService {
  async registration(Login, email, Password) {
    const candidate = await UserModel.findOne({ Login });
    if (candidate) {
      throw ApiError.BadRequest(`Юзер с таким  Никнеймом ${Login} уже существует `);
    }
    const hashPassword = await bcrypt.hash(Password, 8);
    const user = await UserModel.create({
      Login,
      email,
      Password: hashPassword,
    });
    const userDto = new UserDto(user);
    return { user: userDto };
  }
}

module.exports = new UserService();
