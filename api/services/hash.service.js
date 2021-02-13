const bcrypt = require("bcrypt");
require("dotenv").config();
const SALT = process.env.SALT;

const hashPassword = async (password) => {
  const result = await bcrypt.hash(password, +SALT);
  return result;
};

const comparePassword = async (enteredPassword, hashPassword) => {
  const result = await bcrypt.compare(enteredPassword, hashPassword);
  return result;
};

module.exports = {
  hashPassword,
  comparePassword,
};
