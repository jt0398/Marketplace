const express = require("express");
const router = express.Router();

const productTypes = [
  { id: 1, name: "Toys & Games" },
  { id: 2, name: "Office Supplies" },
  { id: 3, name: "Free Stuff" },
];

//route url = /api/productTypes
router.get("/", (req, res) => {
  res.send(productTypes);
});

router.get("/:id", (req, res) => {
  const productType = productTypes.find(
    (p) => p.id === parseInt(req.params.id)
  );
  if (!productType)
    return res
      .status(404)
      .send("The product type with the given ID was not found.");

  res.send(productType);
});

router.post("/", (req, res) => {
  const { error } = validateProductTypes(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const productType = {
    id: productTypes.length + 1,
    name: req.body.name,
  };

  productTypes.push(productType);
  res.send(productType);
});

router.put("/:id", (req, res) => {
  const productType = productTypes.find(
    (p) => p.id === parseInt(req.params.id)
  );
  if (!productType)
    return res
      .status(404)
      .send("The product type with the given ID was not found.");

  const { error } = validateProductTypes(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  productType.name = req.body.name;
  res.send(productType);
});

router.delete("/:id", (req, res) => {
  const productType = productTypes.find(
    (p) => p.id === parseInt(req.params.id)
  );
  if (!productType)
    return res
      .status(404)
      .send("The productType with the given ID was not found.");

  const index = productTypes.indexOf(productType);
  productTypes.splice(index, 1);

  res.send(productType);
});

function validateProductTypes(productType) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(productType);
}

module.exports = router;
