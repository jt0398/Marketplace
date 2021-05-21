const db = require("../models");
const { validateId, validateProduct } = db.Product.Product;
const Product = db.Product.Product;
const ProductType = db.ProductType.ProductType;
const { validateId: validateTypeId } = db.ProductType.ProductType;

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
      const id = req.params.id;

      const { error } = validateId({ id });
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
      const { error } = validateProduct(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const { error2 } = validateTypeId(req.body.productTypeId);
      if (error2) return res.status(400).send(error2.details[0].message);

      const productType = await ProductType.findById(req.body.productTypeId);
      if (!productType) return res.status(400).send("Invalid product type");

      let product = new Product({
        name: req.body.name,
        productType: {
          _id: productType._id,
          name: producType.name,
        },
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

      const { error } = validateId(id);
      if (error) return res.status(400).send(error.details[0].message);

      const { error2 } = validateProduct(req.body);
      if (error2) return res.status(400).send(error2.details[0].message);

      const { error3 } = validateTypeId(productTypeId);
      if (error3) return res.status(400).send(error3.details[0].message);

      const productType = await ProductType.findById(productTypeId);
      if (!productType) return res.status(400).send("Invalid product type");

      const product = await Product.findByIdAndUpdate(
        { _id: id },
        {
          name: req.body.name,
          productType: {
            _id: productType._id,
            name: producType.name,
          },
          numberInStock: req.body.numberInStock,
          price: req.body.price,
        },
        { new: true }
      );

      if (!product)
        res
          .status(404)
          .send("The product with the given ID was not found.");     

      res.status(200).json(product.getPublicFields());
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
};
