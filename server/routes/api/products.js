const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");

//route url = /api/products
router.get("/", productController.findAll);

router.get("/:id", productController.findById);

router.post("/", productController.create);

router.put("/:id", productController.update);

router.delete("/:id", productController.delete);

module.exports = router;
