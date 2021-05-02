const db = require("../models");
const Joi = require("joi");

module.exports = {
  findAll: async function (req, res) {
    try {
      const product = await db.Product.findAll({}).sort({ name: 1 });

      res.status(200).json(product);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  findById: async function (req, res) {
    try {
      const id = validateId({ id });

      const { error } = validate;
    } catch (err) {}
  },
};
