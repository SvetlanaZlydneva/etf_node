const userModel = require("../models/user.model");
const {
  UnUniqError,
  UnAuthorizedError,
  NotFoundError,
} = require("../helpers/errors.constructors");
const { hashPassword, comparePassword } = require("../services/hash.service");
const { createToken } = require("../services/token.service");

class UserController {
  async createUser(req, res, next) {
    try {
      if (req.user) throw new UnUniqError("Login not uniq");
      const { snp, login, password, phone, access } = req.body;
      const user = await userModel.create({
        snp,
        login,
        password: await hashPassword(password),
        phone,
        access,
      });
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const user = await userModel.findById(req.id);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const user = await userModel.findByIdAndDelete(req.id);
      if (!user) throw new NotFoundError(`user with id ${req.id} not found`);
      return res.status(200).json(req.id);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const user = await userModel.findByIdAndUpdate(
        req.id,
        { $set: req.user },
        { new: true }
      );
      if (!user) throw new NotFoundError(`user with id ${req.id} not found`);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async signIn(req, res, next) {
    try {
      const { user, body } = req;
      if (!user) throw new UnAuthorizedError("Email or Password is wrong");
      if (!(await comparePassword(body.password, user.password)))
        throw new UnAuthorizedError("Email or Password is wrong");
      const { _id, login, snp, phone, access } = user;
      const token = await createToken({ _id });
      await userModel.updateToken(_id, token);
      return res.status(200).json({ token, login, snp, phone, access });
    } catch (error) {
      next(error);
    }
  }

  async logOut(req, res, next) {
    try {
      const { _id } = req.user;
      await userModel.updateToken(_id, null);
      return res.status(204).send({ message: "No Content" });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(_, res, next) {
    try {
      const users = await userModel.find();
      if (users.length === 0) throw new NotFoundError("Not found Data");
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getCurrent(req, res, next) {
    try {
      const { login, snp, phone, access } = req.user;
      return res.status(200).json({ login, snp, phone, access });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
