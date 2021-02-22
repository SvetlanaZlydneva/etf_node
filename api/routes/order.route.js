const { Router } = require("express");
const {
  createOrder,
  getOrders,
  getById,
  //   deleteObject,
  //   updateObject,
  //   getObjects,
} = require("../controllers/order.controller");
const {
  tokenVerification,
  validateId,
} = require("../middlewares/common.middleware");
const {
  validateCreateOrder,
  // validateUpdateObject,
  // findObjectByName,
  findLastNumber,
} = require("../middlewares/order.middleware");
const orderRouter = Router();

orderRouter.post(
  "/create",
  tokenVerification,
  validateCreateOrder,
  findLastNumber,
  createOrder,
  getOrders,
  changeStatus
);
// orderRouter.delete("/:id", tokenVerification, validateId, deleteObject);
// orderRouter.patch(
//   "/:id",
//   tokenVerification,
//   validateId,
//   findObjectByName,
//   validateUpdateObject,
//   updateObject
// );
orderRouter.get("/all", tokenVerification, getOrders);
orderRouter.get("/details/:id", tokenVerification, validateId, getById);
orderRouter.patch("/status/:id", tokenVerification, validateId, changeStatus);

// activityRouter.patch(
//   "/:id",
//   tokenVerification,
//   validateId,
//   findActivityByName,
//   validateUpdateActivity,
//   updateActivity
// );

module.exports = orderRouter;
