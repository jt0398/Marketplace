const mongoose = require("mongoose");
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
  },
  { timestamps: true }
);

schema.statics.validateId = function (data) {
  const schema = Joi.object({
    id: Joi.string().min(24).required(),
  });

  console.log(schema.validate(data));

  return schema.validate(data);
};

schema.statics.validateProductType = function (data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(150).required(),
  });

  return schema.validate(data);
};

const ProductType = mongoose.model("ProductTypes", schema);

module.exports.ProductType = ProductType;
