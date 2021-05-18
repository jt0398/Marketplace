const db = require("../models");
const Joi = require("joi");

module.exports = {
  findAll: async function (req, res) {
    try {
      const product = await db.Product.find({})
        .sort({ name: 1 })
        .select({ _id: 1, name: 1 });

      res.status(200).json(product);
    } catch (err) {
      res.status(422).json(err.message);
    }
  },
  findById: async function (req, res) {
    try {
      const id = validateId({ id });

      const { error } = validate;
    } catch (err) {
      res.status(422).json(err.message);
    }
  },
};
