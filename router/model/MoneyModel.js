const { Schema, model } = require('mongoose');
const Comment = new Schema({
  type: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  summ: {
    type: Number,
    required: true,
  },
  sales: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  basket: {
    type: Array,
    required: true,
  },
  paymentcategory: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
});
module.exports = model('isMoney', Comment);
