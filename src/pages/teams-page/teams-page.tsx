import React from "react";
import { BackButton } from "../../components/back-button/back-button";
import { NavBar } from "../../components/nav-bar/nav-bar";
import "./teams-page.css";

export const TeamsPage: React.FC = () => {
  return (
    <section className="teams-page">
      <NavBar />
      <BackButton />
    </section>
  );
};
