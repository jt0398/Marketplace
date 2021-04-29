const express = require("express");
const router = express.Router();
const productTypeController = require("../../controllers/productTypeController");

//route url = /api/productTypes
router.get("/", productTypeController.findAll);

router.get("/:id", productTypeController.findById);

router.post("/", productTypeController.create);

router.put("/:id", productTypeController.update);

router.delete("/:id", productTypeController.delete);

module.exports = router;
