const mongoose = require("mongoose");
const { Schema } = mongoose;

const objectSchema = new Schema({
  name: { type: String, require: true, unique: true },
  parent: { type: String, require },
});

module.exports = mongoose.model("Object", objectSchema);
