import React, { Component } from "react";
import Like from "./common/like";

class ProductsTable extends Component {
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
    const { products, onLike, onDelete } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("name")}>Name</th>
            <th onClick={() => this.raiseSort("productType.name")}>Type</th>
            <th onClick={() => this.raiseSort("numberInStock")}>
              Number In Stock
            </th>
            <th onClick={() => this.raiseSort("price")}>Price</th>
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
                <Like liked={product.liked} onClick={() => onLike(product)} />
              </td>
              <td className="pr-5">
                <button
                  onClick={() => onDelete(product)}
                  className="btn btn-danger btn-small"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ProductsTable;
