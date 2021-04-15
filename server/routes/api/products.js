const express = require("express");
const router = express.Router();

const products = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
  { id: 3, name: "Product 3" },
];

//route url = /api/products
router.get("/", (req, res) => {
  res.send([1, 2, 3]);
});

router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.post("/", (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = {
    id: products.length + 1,
    name: req.body.name,
  };

  products.push(product);
  res.send(product);
});

router.put("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  product.name = req.body.name;
  res.send(product);
});

router.delete("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  const index = products.indexOf(product);
  products.splice(index, 1);

  res.send(product);
});

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(product);
}

module.exports = router;
