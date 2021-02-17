const positionModel = require("../models/position.model");
const {
  UnUniqError,
  NotFoundError,
} = require("../helpers/errors.constructors");

class PositionController {
  async createPosition(req, res, next) {
    try {
      if (req.position) throw new UnUniqError("Object isset");
      const { name } = req.body;
      const position = await positionModel.create({
        name,
      });
      return res.status(201).json(position);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const position = await positionModel.findById(req.id);
      return res.status(201).json(position);
    } catch (error) {
      next(error);
    }
  }

  async deletePosition(req, res, next) {
    try {
      const position = await positionModel.findByIdAndDelete(req.id);
      if (!position)
        throw new NotFoundError(`position with id ${req.id} not found`);
      return res.status(200).json(req.id);
    } catch (error) {
      next(error);
    }
  }

  async updatePosition(req, res, next) {
    try {
      if (req.position)
        throw new UnUniqError(`position name ${req.position.name} isset`);
      const data = { ...req.body };
      const position = await positionModel.findByIdAndUpdate(
        req.id,
        { $set: data },
        { new: true }
      );
      if (!position)
        throw new NotFoundError(`position with id ${req.id} not found`);
      return res.status(200).json(position);
    } catch (error) {
      next(error);
    }
  }

  async getPositions(_, res, next) {
    try {
      const positions = await positionModel.find();
      if (positions.length === 0) throw new NotFoundError("Not found Data");
      return res.status(200).json(positions);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PositionController();
