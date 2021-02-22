const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const objectRoute = require("./routes/object.route");
const activityRoute = require("./routes/activity.route");
const positionRoute = require("./routes/position.route");
const orderRoute = require("./routes/order.route");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const DB = process.env.DB;

module.exports = class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDataBase();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: "*" }));
    this.server.use(morgan("tiny"));
  }

  initRoutes() {
    this.server.use("/api/user", userRoute);
    this.server.use("/api/object", objectRoute);
    this.server.use("/api/activity", activityRoute);
    this.server.use("/api/position", positionRoute);
    this.server.use("/api/order", orderRoute);
  }

  async initDataBase() {
    try {
      await mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("Database connection successful");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log("Started listening on port", PORT);
    });
  }
};
