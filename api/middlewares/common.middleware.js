const userModel = require("../models/user.model");
const {
  Types: { ObjectId },
} = require("mongoose");
const {
  UnAuthorizedError,
  NotFoundError,
} = require("../helpers/errors.constructors");
const { verifyToken } = require("../services/token.service");

class CommonMiddleware {
  async tokenVerification(req, _, next) {
    try {
      const token = req.get("Authorization") || "";
      if (!token) throw new UnAuthorizedError("Not authorized");
      const { _id } = await verifyToken(token);
      const user = await userModel.findById(_id);
      if (!user || user.token !== token)
        throw new UnAuthorizedError("Not authorized");
      req.user = user;
      next();
    } catch (error) {
      throw new UnAuthorizedError("Invalid token");
    }
  }

  validateId(req, _, next) {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) throw new NotFoundError("Not valid id");
    req.id = id;
    next();
  }
}

module.exports = new CommonMiddleware();
