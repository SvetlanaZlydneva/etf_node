const objectModel = require("../models/object.model");
const { UnValidDataError } = require("../helpers/errors.constructors");
const Joi = require("joi");

class ObjectMiddleware {
  async findObjectByName(req, _, next) {
    try {
      const { name } = req.body;
      const object = await objectModel.findOne({ name });
      req.object = object;
      next();
    } catch (error) {
      next(error);
    }
  }

  validateCreateObject(req, _, next) {
    const rules = Joi.object({
      name: Joi.string().required(),
      parent: Joi.string().required(),
    });
    const result = rules.validate({ ...req.body });
    if (result.error) throw new UnValidDataError(result.error.message);
    next();
  }

  validateUpdateObject(req, _, next) {
    const rules = Joi.object({
      name: Joi.string(),
      parent: Joi.string(),
    }).or("name", "parent");
    const result = rules.validate({ ...req.body });
    if (result.error) throw new UnValidDataError(result.error.message);
    next();
  }
}

module.exports = new ObjectMiddleware();
