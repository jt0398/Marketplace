const { ProductType } = require("../models/productTypes");

module.exports = {
  findAll: async function (req, res) {
    try {
      const productTypes = await ProductType.find({})
        .sort({ name: 1 })
        .select({ name: 1 });

      res.status(200).json(productTypes);
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
  findById: async function (req, res) {
    try {
      const id = req.params.id;

      const { error } = ProductType.validateId({ id });
      if (error) return res.status(400).json(error.details[0].message);

      const productType = await ProductType.findById(id);

      if (!productType)
        return res
          .status(404)
          .send("The product type with the given ID was not found.");

      res.status(200).json(productType.getPublicFields());
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
  create: async function (req, res) {
    try {
      const name = req.body.name;

      const { error } = ProductType.validateProductType({
        name,
      });

      if (error) return res.status(400).send(error.details[0].message);

      const productType = new ProductType({ name });
      await productType.save();

      res.status(200).json(productType.getPublicFields());
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
  update: async function (req, res) {
    try {
      const id = req.params.id;
      const name = req.body.name;

      const { error } = ProductType.validateId({ id });
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

      res.status(200).json(productType.getPublicFields());
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
  delete: async function (req, res) {
    try {
      const id = req.params.id;

      const { error } = ProductType.validateId({ id });
      if (error) return res.status(400).send(error.details[0].message);

      const productType = await ProductType.findByIdAndRemove({ _id: id });

      if (!productType)
        return res
          .status(404)
          .send("The product type with the given ID was not found.");

      res.status(200).json(productType.getPublicFields());
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
};
