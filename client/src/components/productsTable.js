import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";

class ProductsTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "productType.name", label: "Product" },
    { path: "numberInStock", label: "Stock" },
    { path: "price", label: "Price" },
    { key: "like" },
    { key: "delete" },
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
    const { products, onLike, onDelete, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
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
