import React from "react";
import { HomeLink } from "../../components/home-link/home-link";
import "./home-page.css";

export const HomePage: React.FC = () => {
  return (
    <section className="home-container">
      <h3>Keep track of your daily battle results and more</h3>

      <HomeLink link="/sets" title="Record your sets" />
    </section>
  );
};
