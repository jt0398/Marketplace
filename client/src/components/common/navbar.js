import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Marketplace
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/">
            Home
          </NavLink>

          <NavLink className="nav-item nav-link" to="/products">
            Products
          </NavLink>

          <NavLink className="nav-item nav-link" to="/customer">
            Customer
          </NavLink>

          <NavLink className="nav-item nav-link" to="/posts/2018/06">
            Posts
          </NavLink>

          <NavLink className="nav-item nav-link" to="/admin">
            Admin
          </NavLink>

          <NavLink className="nav-item nav-link" to="/cart">
            <span className="badge badge-pill badge-secondary">
              {totalCounters}
            </span>{" "}
            Cart
          </NavLink>

          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>

          <NavLink className="nav-item nav-link" to="/register">
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
