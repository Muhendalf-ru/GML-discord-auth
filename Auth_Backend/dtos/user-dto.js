module.exports = class UserDto {
  email;
  id;
  Login;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.Login = model.Login;
  }
};
