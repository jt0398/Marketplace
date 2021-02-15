import React, { Component } from "react";
import { getProducts } from "../services/productService";

class Products extends Component {
  state = {
    products: getProducts(),
  };

  handleDelete = (product) => {
    const products = this.state.products.filter((p) => p._id !== product._id);
    this.setState({ products });
  };

  render() {
    const { length: count } = this.state.products;

    if (count === 0) return <p>There are no products in the database.</p>;

    return (
      <React.Fragment>
        <p>Showing {count} products in the database</p>
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
                  <button
                    onClick={() => this.handleDelete(product)}
                    className="btn btn-danger btn-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Products;
