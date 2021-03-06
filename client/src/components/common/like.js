import React from "react";
import PropTypes from "prop-types";

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";

  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
    ></i>
  );
};

Like.defaultProps = {
  liked: false,
};

Like.propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Like;
