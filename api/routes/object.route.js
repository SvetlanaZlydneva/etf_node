const { Router } = require("express");
const {
  createObject,
  deleteObject,
  updateObject,
  getObjects,
  getById,
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
objectRouter.get("/details/:id", tokenVerification, validateId, getById);

module.exports = objectRouter;
