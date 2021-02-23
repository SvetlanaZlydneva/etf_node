const { Router } = require("express");
const {
  createOrder,
  getOrders,
  getById,
  updateOrder,
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
  createOrder
);
// orderRouter.delete("/:id", tokenVerification, validateId, deleteObject);
orderRouter.get("/all", tokenVerification, getOrders);
orderRouter.get("/details/:id", tokenVerification, validateId, getById);
orderRouter.patch("/:id", tokenVerification, validateId, updateOrder);

module.exports = orderRouter;
