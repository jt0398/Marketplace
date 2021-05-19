const mongoose = require("mongoose");
const { productTypeSchema } = require("./productTypes");
const Joi = require("joi");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 150,
      trim: true,
    },
    productType: {
      type: productTypeSchema,
      require: true,
    },
    numberInStock: {
      type: Number,
      require: true,
      min: 0,
      max: 5000,
      set: (v) => Math.round(v),
      get: (v) => Math.round(v),
      trim: true,
    },
    price: { type: Number, require: true, min: 1, max: 10000, trim: true },
  },
  { timestamps: true }
);

schema.statics.validateId = function (data) {
  const schema = Joi.object({
    id: Joi.string().min(24).required(),
  });

  return schema.validate(data);
};

schema.statics.validateProduct = function (data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(150).require(),
    productTypeId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(5000).required(),
    price: Joi.number().min(1).max(10000).required(),
  });

  return schema.validate(data);
};

schema.methods.getPublicFields = function () {
  const product = {
    id: this._id,
    name: this.name,
    productType: this.productType["name"],
    numberInStock: this.numberInStock,
    price: price,
  };
  return product;
};

const Product = mongoose.model("Products", schema);

module.exports.productSchema = schema;
module.exports.Product = Product;
