import React, { Component } from "react";
import { getProducts } from "../services/productService";
import { getProductTypes } from "../services/productTypeService";
import Like from "./like";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";

class Products extends Component {
  state = {
    products: [],
    productTypes: [],
    pageSize: 4,
    currentPage: 1,
    selectedProductType: null,
  };

  componentDidMount() {
    const productTypes = [
      { name: "All Product Types", _id: 0 },
      ...getProductTypes(),
    ];

    this.setState({
      products: getProducts(),
      productTypes,
    });
  }

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

  handleProductTypeSelect = (productType) => {
    this.setState({ selectedProductType: productType, currentPage: 1 });
  };

  render() {
    const {
      pageSize,
      currentPage,
      products: allProducts,
      productTypes,
      selectedProductType,
    } = this.state;

    const filteredProducts =
      selectedProductType && selectedProductType._id
        ? allProducts.filter(
            (product) => product.productType._id === selectedProductType._id
          )
        : allProducts;

    const { length: count } = filteredProducts;

    if (count === 0) return <p>There are no products in the database.</p>;

    const products = paginate(filteredProducts, currentPage, pageSize);

    return (
      <div className="row mt-5">
        <div className="col-2">
          <ListGroup
            items={productTypes}
            onItemSelect={this.handleProductTypeSelect}
            selectedItem={selectedProductType}
          />
        </div>
        <div className="col">
          <p>Showing {count} products in the database</p>
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
        </div>
      </div>
    );
  }
}

export default Products;
