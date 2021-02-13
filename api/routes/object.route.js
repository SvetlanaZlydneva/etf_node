const { Router } = require("express");
const {
  createObject,
  deleteObject,
  updateObject,
  getObjects,
} = require("../controllers/object.controller");
const {
  tokenVerification,
  validateId,
} = require("../middlewares/common.middleware");
const {
  validateCreateObject,
  validateUpdateObject,
  findObjectByName,
} = require("../middlewares/object.middleware");
const objectRouter = Router();

objectRouter.post(
  "/create",
  tokenVerification,
  validateCreateObject,
  findObjectByName,
  createObject
);
objectRouter.delete("/:id", tokenVerification, validateId, deleteObject);
objectRouter.patch(
  "/:id",
  tokenVerification,
  validateId,
  findObjectByName,
  validateUpdateObject,
  updateObject
);
objectRouter.get("/all", tokenVerification, getObjects);

module.exports = objectRouter;
