const mongoose = require("mongoose");

const schema = new mongoose.schema({
  name: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 150,
  },
  productType: { type: mongoose.Schema.Types.ObjectId, ref: "ProductTypes" },
  numberInStock: {
    type: Number,
    min: 0,
    set: (v) => Math.round(v),
    get: (v) => Math.round(v),
  },
  price: { type: Decimal, min: 1 },
});
