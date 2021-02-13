const mongoose = require("mongoose");
const { Schema } = mongoose;
const currentTime = require("../helpers/dateNowUnix");

const orderSchema = new Schema({
  activity: { type: String, require },
  category: { type: Object, require },
  head: { type: String, require },
  created: { type: Number, default: currentTime },
  author: { type: String, require },
  body: { type: Array, require },
  total: { type: String },
  status: { type: String, default: "registered" },
  number: { type: Number, unique: true },
});

//orders
module.exports = mongoose.model("Order", orderSchema);
