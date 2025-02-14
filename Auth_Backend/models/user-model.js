const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  Login: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  Password: { type: String, required: true },
});

module.exports = model('TestUser', UserSchema);
