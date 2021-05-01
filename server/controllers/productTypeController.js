const db = require("../models");
const Joi = require("joi");

module.exports = {
  findAll: async function (req, res) {
    try {
      const productType = await db.ProductType.findAll({}).sort({ name: 1 });

      res.status(200).json(productType);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  findById: async function (req, res) {
    try {
      const id = req.params.id;

      const { error } = validateId({ id });
      if (error) return res.status(400).json(error[0]);

      const productType = await db.ProductType.findAll({ _id: ID });

      if (!productType)
        res
          .status(404)
          .send("The product type with the given ID was not found.");

      res.status(200).json(productType);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  create: async function (req, res) {
    try {
      const name = req.body.name;

      const { error } = validateName({ name });

      if (error) return res.status(400).send(error.details[0].message);

      let productType = new db.ProductType({ name });
      await productType.save();

      res.status(200).json(productType);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },
  update: async function (req, res) {
    try {
      const id = req.params.id;
      const name = req.body.name;

      const { error } = validateId({ id });
      const { error: err2 } = validateName({ name });

      if (error || err2)
        return res
          .status(400)
          .send(error.details[0].message & " " & err2.details[0].message);

      const productType = await db.ProductType.findByIdAndUpdate(
        { _id: id },
        { name },
        { new: true }
      );

      if (!productType)
        res
          .status(404)
          .send("The product type with the given ID was not found.");

      res.status(200).json(productType);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  delete: async function (req, res) {
    try {
      const id = req.params.id;

      const { error } = validateId({ id });
      if (error) return res.status(400).send(error.details[0].message);

      const productType = await db.ProductType.findByIdAndRemove({ _id: id });

      if (!productType)
        res
          .status(404)
          .send("The product type with the given ID was not found.");

      res.status(200).json(productType);
    } catch (err) {
      res.status(422).json(err);
    }
  },
};

function validateId(data) {
  const schema = Joi.object({
    id: Joi.string().min(12).required(),
  });

  return schema.validate(data);
}

function validateName(data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(150).required(),
  });

  return schema.validate(data);
}
