const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  snp: { type: String, require },
  login: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  token: { type: String },
  phone: { type: String },
  access: {
    type: String,
    enum: ["admin", "user", "manager"],
    default: "user",
  },
});

userSchema.static("updateToken", async function (id, newToken) {
  return this.findByIdAndUpdate(id, {
    token: newToken,
  });
});

//users
module.exports = mongoose.model("User", userSchema);
