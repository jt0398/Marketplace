import React, { Component } from "react";
import { getProducts } from "../services/productService";
import Like from "./like";
import Pagination from "./pagination";

class Products extends Component {
  state = {
    products: getProducts(),
    pageSize: 4,
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

  handlePageChange = () => {
    console.log("Page Changed");
  };

  render() {
    const { length: count } = this.state.products;

    if (count === 0) return <p>There are no products in the database.</p>;

    return (
      <React.Fragment>
        <p className="mt-5">Showing {count} products in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Number In Stock</th>
              <th>Price</th>
              <th></th>
              <th></th>
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
        <Pagination
          itemsCount={this.state.products.length}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Products;
