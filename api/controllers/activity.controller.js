const activityModel = require("../models/activity.model");
const {
  UnUniqError,
  NotFoundError,
} = require("../helpers/errors.constructors");

class ActivityController {
  async createActivity(req, res, next) {
    try {
      if (req.activity) throw new UnUniqError("Activity not uniq");
      const { name, head, signature, processes } = req.body;
      const activity = await activityModel.create({
        name,
        head,
        signature,
        processes,
      });
      return res.status(201).json(activity);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const activity = await activityModel.findById(req.id);
      return res.status(201).json(activity);
    } catch (error) {
      next(error);
    }
  }

  async deleteActivity(req, res, next) {
    try {
      const activity = await activityModel.findByIdAndDelete(req.id);
      if (!activity)
        throw new NotFoundError(`user with id ${req.id} not found`);
      return res.status(200).json(req.id);
    } catch (error) {
      next(error);
    }
  }

  async updateActivity(req, res, next) {
    try {
      if (req.activity)
        throw new UnUniqError(`activity name ${req.activity} not uniq`);
      const activity = await activityModel.findByIdAndUpdate(
        req.id,
        { $set: req.body },
        { new: true }
      );
      if (!activity)
        throw new NotFoundError(`activity with id ${req.id} not found`);
      return res.status(200).json(activity);
    } catch (error) {
      next(error);
    }
  }

  async getActivities(_, res, next) {
    try {
      const activity = await activityModel.find();
      if (activity.length === 0) throw new NotFoundError("Not found Data");
      return res.status(200).json(activity);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ActivityController();
