const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;

const createToken = async (_id) => {
  const token = await jwt.sign(_id, JWT_KEY);
  return `Bearer ${token}`;
};

const verifyToken = async (token) => {
  const paresdToken = token.replace("Bearer ", "");
  return await jwt.verify(paresdToken, JWT_KEY);
};

module.exports = {
  createToken,
  verifyToken,
};
