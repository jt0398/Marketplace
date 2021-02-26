import React from "react";
import Like from "./common/like";

const ProductsTable = (props) => {
  const { products, onLike, onDelete } = props;

  return (
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
};

export default ProductsTable;
