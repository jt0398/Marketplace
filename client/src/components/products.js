import React, { Component } from "react";
import { getProducts } from "../services/productService";

class Products extends Component {
  state = {
    products: getProducts(),
  };
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Stock</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.productType.name}</td>
              <td>{product.numberInStock}</td>
              <td>{product.price}</td>
              <td>
                <button className="btn btn-danger btn-small">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Products;
