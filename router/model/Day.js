const { Schema, model } = require('mongoose');
const Comment = new Schema({
  date: String,
  obj: Array,
  cashier: String,
  summ: Number,
});
module.exports = model('Money', Comment);
