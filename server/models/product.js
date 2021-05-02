const mongoose = require("mongoose");

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductTypes",
      require: true,
    },
    numberInStock: {
      type: Number,
      require: true,
      min: 0,
      set: (v) => Math.round(v),
      get: (v) => Math.round(v),
      trim: true,
    },
    price: { type: Number, require: true, min: 1, trim: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", schema);

module.exports = Product;
