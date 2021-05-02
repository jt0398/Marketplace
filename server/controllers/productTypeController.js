const db = require("../models");
const { validateId, validateProductType } = db.ProductType.ProductType;
const { ProductType } = db.ProductType;

module.exports = {
  findAll: async function (req, res) {
    try {
      const productTypes = await ProductType.findAll({}).sort({ name: 1 });

      res.status(200).json(productTypes);
    } catch (err) {
      res.status(422).send(err);
    }
  },
  findById: async function (req, res) {
    try {
      const id = req.params.id;

      const { error } = validateId({ id });
      if (error) return res.status(400).json(error.details[0].message);

      const productType = await ProductType.findAll({ _id: ID });

      if (!productType)
        res
          .status(404)
          .send("The product type with the given ID was not found.");

      res.status(200).json(productType);
    } catch (err) {
      res.status(422).send(err);
    }
  },
  create: async function (req, res) {
    try {
      const name = req.body.name;

      const { error } = validateProductType({
        name,
      });

      if (error) return res.status(400).send(error.details[0].message);

      let productType = new ProductType({ name });
      await productType.save();

      res.status(200).json(productType);
    } catch (err) {
      res.status(422).send(err);
    }
  },
  update: async function (req, res) {
    try {
      const id = req.params.id;
      const name = req.body.name;

      const { error } = validateId({ id });
      const { error: err2 } = ProductType.validateProductType({ name });

      if (error) return res.status(400).send(error.details[0].message);
      if (err2) return res.status(400).send(err2.details[0].message);

      const productType = await ProductType.findByIdAndUpdate(
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
      res.status(422).send(err);
    }
  },
  delete: async function (req, res) {
    try {
      const id = req.params.id;

      const { error } = validateId({ id });
      if (error) return res.status(400).send(error.details[0].message);

      const productType = await ProductType.findByIdAndRemove({ _id: id });

      if (!productType)
        res
          .status(404)
          .send("The product type with the given ID was not found.");

      res.status(200).json(productType);
    } catch (err) {
      res.status(422).send(err);
    }
  },
};
