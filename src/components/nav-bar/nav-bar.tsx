import React from "react";
import { NavBarLink } from "../nav-link/nav-link";
import "./nav-bar.css";

export const NavBar: React.FC = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        <h3 className="nav-header">PogoBuff</h3>
        <NavBarLink destination="/" label="Home" />
        <NavBarLink destination="sets/" label="Sets" />
        <NavBarLink destination="/teams" label="Teams" />
        <NavBarLink destination="/candy" label="Rare Candy" />
        <NavBarLink destination="/elite" label="Elite TMs" />
        <NavBarLink destination="/rewards" label="Encounters" />
      </ul>
    </nav>
  );
};
