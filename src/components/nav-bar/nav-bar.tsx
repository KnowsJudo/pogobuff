import React from "react";
import { Link } from "react-router-dom";
import "./nav-bar.css";

export const NavBar: React.FC = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <li>Home</li>
        </Link>
        <Link to="/sets" style={{ textDecoration: "none", color: "white" }}>
          <li>Sets</li>
        </Link>
        <Link to="/teams" style={{ textDecoration: "none", color: "white" }}>
          <li>Teams</li>
        </Link>
        <Link to="/candy" style={{ textDecoration: "none", color: "white" }}>
          <li>Rare Candy</li>
        </Link>
        <Link to="/elite" style={{ textDecoration: "none", color: "white" }}>
          <li>Elite TMs</li>
        </Link>
      </ul>
    </nav>
  );
};
