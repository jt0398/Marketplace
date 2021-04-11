const _ = require("underscore");
const express = require("express");
const app = express();
const Joi = require("joi"); //Joi is a class

app.use(express.json());

const products = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
  { id: 3, name: "Product 3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/products", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

app.post("/api/products", (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = {
    id: products.length + 1,
    name: req.body.name,
  };

  products.push(product);
  res.send(product);
});

app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  product.name = req.body.name;
  res.send(product);
});

app.delete("/api/products/:id", (req, res) => {
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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
