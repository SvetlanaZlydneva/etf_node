const userModel = require("../models/user.model");
const { UnValidDataError } = require("../helpers/errors.constructors");
const { hashPassword } = require("../services/hash.service");
const Joi = require("joi");

class UserMiddleware {
  async findUserByLogin(req, _, next) {
    try {
      const { login } = req.body;
      const user = await userModel.findOne({ login });
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }

  validateCreateUser(req, _, next) {
    const rules = Joi.object({
      snp: Joi.string().required(),
      login: Joi.string().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
      access: Joi.string().valid("admin", "user", "manager"),
    });
    const result = rules.validate({ ...req.body });
    if (result.error) throw new UnValidDataError(result.error.message);
    next();
  }

  validateUpdateUser(req, _, next) {
    const rules = Joi.object({
      snp: Joi.string(),
      login: Joi.string(),
      password: Joi.string(),
      phone: Joi.string(),
      access: Joi.string().valid("admin", "user", "manager"),
    }).or("snp", "login", "password", "phone", "access");
    const result = rules.validate({ ...req.body });
    if (result.error) throw new UnValidDataError(result.error.message);
    next();
  }

  validateSingIn(req, _, next) {
    const rules = Joi.object({
      login: Joi.string().required(),
      password: Joi.string().required(),
    });
    const result = rules.validate({ ...req.body });
    if (result.error) throw new UnValidUserDataError(result.error.message);
    next();
  }

  async isModifiedUserPass(req, _, next) {
    const { body } = req;
    if (body.password) {
      req.user = { ...body, password: await hashPassword(body.password) };
      return next();
    }
    req.user = { ...body };
    next();
  }
}

module.exports = new UserMiddleware();
