import React from "react";
import Form from "./../components/common/form";
import Joi from "joi-browser";
import { getProductTypes } from "../services/productTypeService";
import { getProduct, saveProduct } from "../services/productService";

class ProductDetails extends Form {
  state = {
    data: {
      name: "",
      productTypeId: "",
      numberInStock: "",
      price: "",
    },
    errors: {},
    product: {},
    productTypes: [],
  };
  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    productTypeId: Joi.string().required().label("Product Type"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    price: Joi.number().min(0).max(100).required().label("Prices"),
  };
  componentDidMount() {
    const productTypes = getProductTypes();
    this.setState({ productTypes });

    const productId = this.props.match.params.id;
    if (productId === "new") return;

    const product = getProduct(productId);
    if (!product) return this.props.history.replace("/not-found"); //replace instead of push method so that user can use browser back

    this.setState({ data: this.mapToViewModel(product) });
  }
  mapToViewModel = (product) => {
    return {
      _id: product._id,
      name: product.name,
      productTypeId: product.productType._id,
      numberInStock: product.numberInStock,
      price: product.price,
    };
  };

  doSubmit() {
    saveProduct(this.state.data);

    this.props.history.push("/products"); //use .replace for login forms
  }
  render() {
    return (
      <div>
        <h1>Product</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderSelect(
            "productTypeId",
            "Product Type",
            this.state.productTypes
          )}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("price", "Price")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ProductDetails;
