const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const { body } = require('express-validator');

router.post(
  '/registration',
  body('Login').isLength({ min: 4, max: 10 }), // Проверка на длину логина
  body('email').isEmail(), // Проверка на валидность email
  body('Password').isLength({ min: 8, max: 32 }), // Проверка на длину пароля
  userController.registration,
);

router.post('/auth', userController.launcher);

module.exports = router;
