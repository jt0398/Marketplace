const db = require("../models");
const ProductType = db.ProductType.ProductType;

//https://zellwk.com/blog/seed-database/

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    dbDebugger("Connected to the database");
    app.listen(port, () => appDebugger(`App listening on port ${port}`));
  })
  .catch((err) => console.log(err));

module.exports = function () {
  try {
    ProductType.deleteMany({});

    ProductType.insertMany([
      { name: "Toys & Games" },
      { name: "Office Supplies" },
      { name: "Free Stuff" },
    ]);
  } catch (err) {}
};
