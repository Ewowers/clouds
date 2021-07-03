const { Schema, model } = require('mongoose');
const Comment = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  position: { type: String, required: true },
  visibility: { type: Boolean, default: true },
});
module.exports = model('User', Comment);
