const { Product } = require("../models/product");
const { ProductType } = require("../models/productTypes");

module.exports = {
  findAll: async function (req, res) {
    try {
      const products = await Product.find({})
        .sort({ name: 1 })
        .select({ _id: 1, name: 1 });

      console.log(products);

      res.status(200).json(products);
    } catch (err) {
      res.status(422).json(err.message);
    }
  },
  findById: async function (req, res) {
    try {
      const id = req.params.id;

      const { error } = Product.validateId({ id });
      if (error) return res.status(400).json(error.details[0].message);

      const product = await Product.findById(id);

      if (!product)
        return res
          .status(404)
          .send("The product with the given ID was not found.");

      res.status(200).json(product.getPublicFields());
    } catch (err) {
      res.status(422).json(err.message);
    }
  },
  create: async function (req, res) {
    try {
      const { error } = Product.validateProduct(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const { error2 } = ProductType.validateId(req.body.productTypeId);
      if (error2) return res.status(400).send(error2.details[0].message);

      const productType = await ProductType.findById(req.body.productTypeId);
      if (!productType) return res.status(400).send("Invalid product type");

      let product = new Product({
        name: req.body.name,
        productType: productType,
        numberInStock: req.body.numberInStock,
        price: req.body.price,
      });

      await product.save();

      res.status(200).json(product.getPublicFields());
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
  update: async function (req, res) {
    try {
      const id = req.params.id;
      const productTypeId = req.body.productTypeId;

      const { error } = Product.validateId({ id });
      if (error) return res.status(400).send(error.details[0].message);

      const { error2 } = Product.validateProduct(req.body);
      if (error2) return res.status(400).send(error2.details[0].message);

      const { error3 } = ProductType.validateId({ id: productTypeId });
      if (error3) return res.status(400).send(error3.details[0].message);

      const productType = await ProductType.findById(productTypeId);
      if (!productType) return res.status(400).send("Invalid product type");

      const product = await Product.findByIdAndUpdate(
        { _id: id },
        {
          name: req.body.name,
          productType: productType,
          numberInStock: req.body.numberInStock,
          price: req.body.price,
        },
        { new: true }
      );

      if (!product)
        res.status(404).send("The product with the given ID was not found.");

      res.status(200).json(product.getPublicFields());
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
  delete: async function (req, res) {
    try {
      const id = req.params.id;
      const productTypeId = req.body.productTypeId;

      const { error } = Product.validateId({ id });
      if (error) return res.status(400).send(error.details[0].message);

      const product = await Product.findByIdAndRemove({ _id: id });

      if (!product)
        res.status(404).send("The product with the given ID was not found.");

      res.status(200).json(product.getPublicFields());
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
};
