import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import { Link } from "react-router-dom";

class ProductsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (product) => (
        <Link to={`/products/${product._id}`}>{product.name}</Link>
      ),
    },
    { path: "productType.name", label: "Product" },
    { path: "numberInStock", label: "Stock" },
    { path: "price", label: "Price" },
    {
      key: "like",
      content: (product) => (
        <Like
          liked={product.liked}
          onClick={() => this.props.onLike(product)}
        />
      ),
    },
    {
      key: "delete",
      content: (product) => (
        <button
          onClick={() => this.props.onDelete(product)}
          className="btn btn-danger btn-small"
        >
          Delete
        </button>
      ),
    },
  ];

  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { products, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={products} columns={this.columns} dataKey="_id" />
      </table>
    );
  }
}

export default ProductsTable;
