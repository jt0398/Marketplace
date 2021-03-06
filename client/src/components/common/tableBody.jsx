import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  render() {
    const { data, columns, dataKey } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item[dataKey]}>
            {columns.map((column) => (
              <td key={item[dataKey] + (column.path || column.key)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.array,
  column: PropTypes.array,
};

export default TableBody;
