import * as productTypeAPI from "./productTypeService";

const products = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "Star Wars Collection",
    productType: { _id: "5b21ca3eeb7f6fbccd471818", name: "Toys & Games" },
    numberInStock: 6,
    price: 2.5,
    liked: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    name: "Puzzles",
    productType: { _id: "5b21ca3eeb7f6fbccd471818", name: "Toys & Games" },
    numberInStock: 5,
    price: 2.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    name: "Vacuum",
    productType: { _id: "5b21ca3eeb7f6fbccd471820", name: "Free Stuff" },
    numberInStock: 8,
    price: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    name: "Office Stationary",
    productType: { _id: "5b21ca3eeb7f6fbccd471814", name: "Office Supplies" },
    numberInStock: 7,
    price: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    name: "Hanging Folder Frame",
    productType: { _id: "5b21ca3eeb7f6fbccd471814", name: "Office Supplies" },
    numberInStock: 7,
    price: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    name: "Post-It Notes",
    productType: { _id: "5b21ca3eeb7f6fbccd471814", name: "Office Supplies" },
    numberInStock: 7,
    price: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    name: "Coffee table",
    productType: { _id: "5b21ca3eeb7f6fbccd471820", name: "Free Stuff" },
    numberInStock: 7,
    price: 4.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    name: "Bed Mattress",
    productType: { _id: "5b21ca3eeb7f6fbccd471820", name: "Free Stuff" },
    numberInStock: 4,
    price: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    name: "Thomas Train",
    productType: { _id: "5b21ca3eeb7f6fbccd471818", name: "Toys & Games" },
    numberInStock: 7,
    price: 3.5,
  },
];

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find((p) => p._id === id);
}

export function saveProduct(product) {
  let productInDB = products.find((p) => p._id === product._id) || {};
  productInDB.name = product.name;
  productInDB.productType = productTypeAPI.productTypes.find(
    (pt) => pt._id === product.productTypeId
  );
  productInDB.numberInStock = product.numberInStock;
  productInDB.price = product.price;

  if (!productInDB._id) {
    productInDB._id = Date.now().toString();
    products.push(productInDB);
  }

  return productInDB;
}

export function deleteProduct(id) {
  let productInDB = products.find((p) => p._id === id);
  products.splice(products.indexOf(productInDB), 1);
  return productInDB;
}
