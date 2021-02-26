import React, { Component } from "react";
import { getProducts } from "../services/productService";
import { getProductTypes } from "../services/productTypeService";
import ProductsTable from "./productsTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";

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
      selectedProductType: productTypes[0],
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
          <ProductsTable
            products={products}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
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
