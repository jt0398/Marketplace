const mongoose = require("mongoose");
const { UserRole } = require("../models/userRole");

module.exports = {
  findAll: async function (req, res) {
    try {
      const UserRoles = await UserRole.aggregate([
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: "$name",
          },
        },
      ]).sort({ name: 1 });

      res.status(200).json(UserRoles);
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
  findById: async function (req, res) {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send("Invalid user role.");

      const UserRole = await UserRole.findById(id);

      if (!UserRole)
        return res
          .status(404)
          .send("The user role with the given ID was not found.");

      res.status(200).json(UserRole.getPublicFields());
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
  create: async function (req, res) {
    try {
      const name = req.body.name;

      const { error } = UserRole.validateUserRole({
        name,
      });

      if (error) return res.status(400).send(error.details[0].message);

      const UserRole = new UserRole({ name });
      await UserRole.save();

      res.status(200).json(UserRole.getPublicFields());
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
  update: async function (req, res) {
    try {
      const id = req.params.id;
      const name = req.body.name;

      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send("Invalid user role.");

      const { error } = UserRole.validateUserRole({ name });
      if (error) return res.status(400).send(error.details[0].message);

      const UserRole = await UserRole.findByIdAndUpdate(
        { _id: id },
        { name },
        { new: true }
      );

      if (!UserRole)
        res.status(404).send("The user role with the given ID was not found.");

      res.status(200).json(UserRole.getPublicFields());
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
  delete: async function (req, res) {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send("Invalid user role.");

      const UserRole = await UserRole.findByIdAndRemove({ _id: id });

      if (!UserRole)
        return res
          .status(404)
          .send("The user role with the given ID was not found.");

      res.status(200).json(UserRole.getPublicFields());
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
};
