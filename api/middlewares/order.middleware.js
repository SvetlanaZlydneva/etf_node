const orderModel = require("../models/order.model");
const { UnValidDataError } = require("../helpers/errors.constructors");
const Joi = require("joi");

class OrderMiddleware {
  //   async findObjectByName(req, _, next) {
  //     try {
  //       const { name } = req.body;
  //       const object = await objectModel.findOne({ name });
  //       req.object = object;
  //       next();
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //     activity: { type: String, require },
  //   category: { type: String, require },
  //   head: { type: String, require },
  //   created: { type: Date, default: Date.now() },
  //   author: { type: String, require },
  //   body: { type: Object, require },
  //   total: { type: String },
  async findLastNumber(req, _, next) {
    try {
      const number = await orderModel.distinct("number");
      req.number = number.length === 0 ? 1 : Math.max(...number) + 1;
      next();
    } catch (error) {
      next(error);
    }
  }

  validateCreateOrder(req, _, next) {
    const rules = Joi.object({
      activity: Joi.string().required(),
      category: Joi.object().required(),
      head: Joi.string().required(),
      created: Joi.string(),
      number: Joi.number(),
      author: Joi.string().required(),
      body: Joi.array().required(),
      total: Joi.string(),
    });
    const result = rules.validate({ ...req.body });
    if (result.error) throw new UnValidDataError(result.error.message);
    next();
  }

  //   validateUpdateObject(req, _, next) {
  //     const rules = Joi.object({
  //       name: Joi.string(),
  //       parent: Joi.string(),
  //     }).or("name", "parent");
  //     const result = rules.validate({ ...req.body });
  //     if (result.error) throw new UnValidDataError(result.error.message);
  //     next();
  //   }
}

module.exports = new OrderMiddleware();
