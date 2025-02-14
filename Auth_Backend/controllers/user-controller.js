const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const ApiError = require('../exceptions/api-error');
const UserModel = require('../models/user-model');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка', errors.array()));
      }
      const { Login, email, Password } = req.body;
      const userData = await userService.registration(Login, email, Password);
      return res.status(201).json(userData);
    } catch (e) {
      next(e);
    }
  }

  async launcher(req, res, next) {
    const { Login, Password } = req.body;
    if (!Login || !Password) {
      return res.status(400).json({ Message: 'Логин и пароль обязательны' });
    }
    try {
      const user = await UserModel.findOne({ Login: Login });
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      const match = await bcrypt.compare(Password.trim(), user.Password);
      if (match) {
        return res.json({
          Login: user.Login,
          UserUuid: user.activationLink,
          Message: 'Успешная авторизация',
        });
      } else {
        return res.status(401).json({ Message: 'Неверный логин или пароль' });
      }
    } catch (e) {
      next(e);
      console.log('Ошибка', e);
      return res.status(500).json({ Message: 'Ошибка на сервере' });
    }
  }
}

module.exports = new UserController();
