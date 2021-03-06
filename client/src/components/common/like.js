import React from "react";
import PropTypes from "prop-types";

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";

  return (
    <div className="clickable">
      <i className={classes} aria-hidden="true" onClick={props.onClick}></i>
    </div>
  );
};

Like.propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Like;
