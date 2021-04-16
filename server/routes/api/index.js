const router = require("express").Router();
const productsRoutes = require("./products");
const productTypesRoutes = require("./productTypes");

router.use("/products", productsRoutes);
router.use("/producttypes", productTypesRoutes);

module.exports = router;
