const mongoose = require("mongoose");
const { ProductType } = require("../models/productTypes");

module.exports = {
  findAll: async function (req, res) {
    try {
      const productTypes = await ProductType.aggregate([
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: "$name",
          },
        },
      ]).sort({ name: 1 });

      res.status(200).json(productTypes);
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
  findById: async function (req, res) {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send("Invalid product type.");

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

      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send("Invalid product type.");

      const { error } = ProductType.validateProductType({ name });
      if (error) return res.status(400).send(error.details[0].message);

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

      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send("Invalid product type.");

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
