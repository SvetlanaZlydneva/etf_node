const objectModel = require("../models/object.model");
const {
  UnUniqError,
  NotFoundError,
} = require("../helpers/errors.constructors");

class ObjectController {
  async createObject(req, res, next) {
    try {
      if (req.object) throw new UnUniqError("Object isset");
      const { name, parent } = req.body;
      const object = await objectModel.create({
        name,
        parent,
      });
      return res.status(201).json(object);
    } catch (error) {
      next(error);
    }
  }

  async deleteObject(req, res, next) {
    try {
      const object = await objectModel.findByIdAndDelete(req.id);
      if (!object)
        throw new NotFoundError(`object with id ${req.id} not found`);
      return res.status(200).json(req.id);
    } catch (error) {
      next(error);
    }
  }

  async updateObject(req, res, next) {
    try {
      if (req.object)
        throw new UnUniqError(`object name ${req.object.name} isset`);
      const data = { ...req.body };
      const object = await objectModel.findByIdAndUpdate(
        req.id,
        { $set: data },
        { new: true }
      );
      if (!object)
        throw new NotFoundError(`object with id ${req.id} not found`);
      return res.status(200).json(object);
    } catch (error) {
      next(error);
    }
  }

  async getObjects(_, res, next) {
    try {
      const objects = await objectModel.find();
      if (objects.length === 0) throw new NotFoundError("Not found Data");
      return res.status(200).json(objects);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ObjectController();
