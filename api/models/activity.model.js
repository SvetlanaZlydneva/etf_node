const mongoose = require("mongoose");
const { Schema } = mongoose;

const activitySchema = new Schema({
  name: { type: String, require, unique: true },
  head: { type: String, require },
  signature: { type: String, require },
  processes: { type: String, require },
});

//activities
module.exports = mongoose.model("Activitie", activitySchema);
