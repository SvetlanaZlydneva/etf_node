const mongoose = require("mongoose");
const { Schema } = mongoose;

const positionSchema = new Schema({
  name: { type: String, require: true, unique: true },
});

module.exports = mongoose.model("Position", positionSchema);
