const { Schema, model } = require("mongoose");
const Comment = new Schema({
  name: { type: String, required: true },
  prise: { type: Number, required: true },
  que: { type: Number, required: true },
  visibility: { type: Boolean, default: true },
  type: { type: String, required: true },
});
module.exports = model("Product", Comment);
