const positionModel = require("../models/position.model");
const { UnValidDataError } = require("../helpers/errors.constructors");
const Joi = require("joi");

class PositionMiddleware {
  async findPositionByName(req, _, next) {
    try {
      const { name } = req.body;
      const position = await positionModel.findOne({ name });
      req.position = position;
      next();
    } catch (error) {
      next(error);
    }
  }

  validatePosition(req, _, next) {
    const rules = Joi.object({
      name: Joi.string().required(),
    });
    const result = rules.validate({ ...req.body });
    if (result.error) throw new UnValidDataError(result.error.message);
    next();
  }
}

module.exports = new PositionMiddleware();
