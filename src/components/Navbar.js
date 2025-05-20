// src/components/Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // (Create this CSS file for styling)

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/reservations" activeClassName="active">
            Reservations
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" activeClassName="active">
            Admin Panel
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
