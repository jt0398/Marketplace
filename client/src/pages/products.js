import React, { Component } from "react";
import ProductsTable from "../components/productsTable";
import Pagination from "../components/common/pagination";
import ListGroup from "../components/common/listGroup";
import { paginate } from "../utils/paginate";
import { getProducts } from "../services/productService";
import { getProductTypes } from "../services/productTypeService";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "../components/common/searchBox";

class Products extends Component {
  state = {
    products: [],
    productTypes: [],
    pageSize: 4,
    currentPage: 1,
    selectedProductType: null, //used in uncontrolled component
    sortColumn: { path: "name", order: "asc" },
    searchQuery: "", //used in controlled component i.e. input field value={variable}. null or undefined in react are uncontrolled component
  };

  componentDidMount() {
    const productTypes = [
      { name: "All Product Types", _id: "" },
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
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

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedProductType: null,
      currentPage: 1,
    });
  };

  getPagedData = () => {
    const {
      products: allProducts,
      selectedProductType,
      sortColumn,
      searchQuery,
    } = this.state;

    let filteredProducts = allProducts;

    if (searchQuery) {
      filteredProducts = allProducts.filter(
        (product) =>
          product.name.toLowerCase().search(searchQuery.toLowerCase()) > -1
      );
    } else if (selectedProductType && selectedProductType._id) {
      filteredProducts = allProducts.filter(
        (product) => product.productType._id === selectedProductType._id
      );
    }

    /*
    filteredProducts =
      selectedProductType && selectedProductType._id
        ? allProducts.filter(
            (product) => product.productType._id === selectedProductType._id
          )
        : allProducts;*/

    const sortedProducts = _.orderBy(
      filteredProducts,
      [sortColumn.path],
      [sortColumn.order]
    );

    return { totalCount: filteredProducts.length, data: sortedProducts };
  };

  render() {
    const {
      pageSize,
      currentPage,
      productTypes,
      selectedProductType,
      sortColumn,
      searchQuery,
    } = this.state;

    const { totalCount: count, data } = this.getPagedData();

    //if (count === 0) return <p>There are no products in the database.</p>;

    const products = paginate(data, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={productTypes}
            onItemSelect={this.handleProductTypeSelect}
            selectedItem={selectedProductType}
          />
        </div>
        <div className="col">
          <Link className="btn btn-primary mb-3" to="/products/new">
            New Product
          </Link>
          <p>Showing {count} products in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <ProductsTable
            products={products}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
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
