const orderModel = require("../models/order.model");
const {
  //   UnUniqError,
  //   NotFoundError,
} = require("../helpers/errors.constructors");

class OrderController {
  async createOrder(req, res, next) {
    try {
      const order = await orderModel.create({
        number: req.number,
        ...req.body,
      });
      return res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const order = await orderModel.findById(req.id);
      return res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async updateOrder(req, res, next) {
    try {
      const data = { ...req.body };
      const order = await orderModel.findByIdAndUpdate(
        req.id,
        { $set: data },
        {
          new: true,
        }
      );
      if (!order) throw new NotFoundError(`order with id ${req.id} not found`);
      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  //   async deleteOrder(req, res, next) {
  //     try {
  //       const order = await orderModel.findByIdAndDelete(req.id);
  //       if (!order) throw new NotFoundError(`order with id ${req.id} not found`);
  //       return res.status(200).json(req.id);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   async updateOrder(req, res, next) {
  //     try {
  //       if (req.order)
  //         throw new UnUniqError(`order name ${req.order.name} isset`);
  //       const data = { ...req.body };
  //       const order = await orderModel.findByIdAndUpdate(
  //         req.id,
  //         { $set: data },
  //         { new: true }
  //       );
  //       if (!order) throw new NotFoundError(`order with id ${req.id} not found`);
  //       return res.status(200).json(order);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  async getOrders(req, res, next) {
    try {
      const orders = await orderModel
        .find({
          $and: [{ author: req.user.login }, { status: { $ne: "processed" } }],
        })
        .sort({ number: 1 });
      if (orders.length === 0) throw new NotFoundError("Not found Data");
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
