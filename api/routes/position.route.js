const { Router } = require("express");
const {
  createPosition,
  deletePosition,
  updatePosition,
  getPositions,
  getById,
} = require("../controllers/position.controller");
const {
  tokenVerification,
  validateId,
} = require("../middlewares/common.middleware");
const {
  validatePosition,
  findPositionByName,
} = require("../middlewares/position.middleware");
const positionRouter = Router();

positionRouter.post(
  "/create",
  tokenVerification,
  validatePosition,
  findPositionByName,
  createPosition
);
positionRouter.delete("/:id", tokenVerification, validateId, deletePosition);
positionRouter.patch(
  "/:id",
  tokenVerification,
  validateId,
  findPositionByName,
  validatePosition,
  updatePosition
);
positionRouter.get("/all", tokenVerification, getPositions);
positionRouter.get("/details/:id", tokenVerification, validateId, getById);

module.exports = positionRouter;
