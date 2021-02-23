import React, { Component } from "react";
import { getProducts } from "../services/productService";
import Like from "./like";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

class Products extends Component {
  state = {
    products: getProducts(),
    pageSize: 4,
    currentPage: 1,
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.products;
    const { pageSize, currentPage, products: allProducts } = this.state;

    if (count === 0) return <p>There are no products in the database.</p>;

    const products = paginate(allProducts, currentPage, pageSize);

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
            {products.map((product) => (
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
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Products;
