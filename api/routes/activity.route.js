const { Router } = require("express");
const {
  createActivity,
  deleteActivity,
  updateActivity,
  getActivities,
} = require("../controllers/activity.controller");
const {
  tokenVerification,
  validateId,
} = require("../middlewares/common.middleware");
const {
  findActivityByName,
  validateCreateActivity,
  validateUpdateActivity,
} = require("../middlewares/activity.middleware");
const activityRouter = Router();

activityRouter.post(
  "/create",
  tokenVerification,
  validateCreateActivity,
  findActivityByName,
  createActivity
);
activityRouter.delete("/:id", tokenVerification, validateId, deleteActivity);
activityRouter.patch(
  "/:id",
  tokenVerification,
  validateId,
  findActivityByName,
  validateUpdateActivity,
  updateActivity
);
activityRouter.get("/all", tokenVerification, getActivities);

module.exports = activityRouter;
