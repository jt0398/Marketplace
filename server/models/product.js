const mongoose = require("mongoose");

const schema = new mongoose.schema({
  name: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 150,
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
  },
  price: { type: Decimal, require: true, min: 1 },
});

const Product = mongoose.model("Products", schema);

module.exports = Product;
