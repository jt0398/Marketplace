import React from "react";
import PropTypes from "prop-types";

const ListGroup = (props) => {
  const {
    items,
    onItemSelect,
    textProperty,
    valueProperty,
    selectedItem,
  } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          type="button"
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          style={{ cursor: "pointer" }}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

ListGroup.propTypes = {
  items: PropTypes.array,
  onItemSelect: PropTypes.func,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  selectedItem: PropTypes.object,
};

export default ListGroup;
