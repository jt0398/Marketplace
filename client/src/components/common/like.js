import React from "react";
import PropTypes from "prop-types";

const Like = ({ liked, onClick }) => {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";

  return (
    <div className="clickable">
      <i className={classes} aria-hidden="true" onClick={onClick}></i>
    </div>
  );
};

Like.propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Like;
