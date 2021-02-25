import React from "react";
import PropTypes from "prop-types";

const ListGroup = (props) => {
  const { items, onItemSelect, textProperty, valueProperty } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          type="button"
          className="list-group-item"
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
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
};

export default ListGroup;
