const { Router } = require("express");
const {
  getUsers,
  createUser,
  signIn,
  logOut,
  deleteUser,
  updateUser,
  getCurrent,
} = require("../controllers/user.controller");
const {
  validateCreateUser,
  validateSingIn,
  validateUpdateUser,
  isModifiedUserPass,
  findUserByLogin,
} = require("../middlewares/user.middleware");
const {
  tokenVerification,
  validateId,
} = require("../middlewares/common.middleware");
const userRoute = Router();

userRoute.post(
  "/create",
  tokenVerification,
  validateCreateUser,
  findUserByLogin,
  createUser
);
userRoute.delete("/:id", tokenVerification, validateId, deleteUser);
userRoute.patch(
  "/:id",
  tokenVerification,
  validateId,
  validateUpdateUser,
  isModifiedUserPass,
  updateUser
);
userRoute.post("/login", validateSingIn, findUserByLogin, signIn);
userRoute.post("/logout", tokenVerification, logOut);
userRoute.get("/all", tokenVerification, getUsers);
userRoute.get("/current", tokenVerification, getCurrent);

module.exports = userRoute;
