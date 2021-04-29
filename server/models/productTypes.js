const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, require: true, minlength: 5, maxlength: 150 },
  },
  { timestamps: true }
);

const ProductType = mongoose.model("ProductTypes", schema);

module.exports = ProductType;
