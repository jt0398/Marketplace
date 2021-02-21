import React, { Component } from "react";
import { getProducts } from "../services/productService";
import Like from "./like";

class Products extends Component {
  state = {
    products: getProducts(),
  };

  handleDelete = (product) => {
    const products = this.state.products.filter((p) => p._id !== product._id);
    this.setState({ products });
  };

  handleLike = (product) => {
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...product };
    products[index].liked = !products[index].liked;
    this.setState({ products });
  };

  render() {
    const { length: count } = this.state.products;

    if (count === 0) return <p>There are no products in the database.</p>;

    return (
      <React.Fragment>
        <p>Showing {count} products in the database</p>
        <table className="table mt-5">
          <thead>
            <tr>
              <th>Type</th>
              <th>Price</th>
              <th>Name</th>
              <th>Rate</th>
              <th></th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product) => (
              <tr key={product._id}>
                <td className="pr-5">{product.name}</td>
                <td className="pr-5">{product.productType.name}</td>
                <td className="pr-5">{product.numberInStock}</td>
                <td className="pr-5">{product.price}</td>
                <td className="pr-5">
                  <Like
                    liked={product.liked}
                    onClick={() => this.handleLike(product)}
                  />
                </td>
                <td className="pr-5">
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
