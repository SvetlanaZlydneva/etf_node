const activityModel = require("../models/activity.model");
const { UnValidDataError } = require("../helpers/errors.constructors");
const Joi = require("joi");

class ActivityMiddleware {
  async findActivityByName(req, _, next) {
    try {
      const { name } = req.body;
      const activity = await activityModel.findOne({ name });
      req.activity = activity;
      next();
    } catch (error) {
      next(error);
    }
  }

  validateCreateActivity(req, _, next) {
    const rules = Joi.object({
      name: Joi.string().required(),
      head: Joi.string().required(),
      signature: Joi.string().required(),
      processes: Joi.string().required(),
    });
    const result = rules.validate({ ...req.body });
    if (result.error) throw new UnValidDataError(result.error.message);
    next();
  }

  validateUpdateActivity(req, _, next) {
    const rules = Joi.object({
      name: Joi.string(),
      head: Joi.string(),
      signature: Joi.string(),
      processes: Joi.string(),
    }).or("name", "head", "signature", "processes");
    const result = rules.validate({ ...req.body });
    if (result.error) throw new UnValidDataError(result.error.message);
    next();
  }
}

module.exports = new ActivityMiddleware();
