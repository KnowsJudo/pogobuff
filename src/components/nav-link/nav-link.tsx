import React from "react";
import { Link } from "react-router-dom";
import "./nav-link.css";

interface INavLink {
  destination: string;
  label: string;
}

export const NavBarLink: React.FC<INavLink> = (props) => {
  return (
    <Link
      to={props.destination}
      style={{ textDecoration: "none", color: "white" }}
    >
      <li className="nav-link-li">{props.label}</li>
    </Link>
  );
};
