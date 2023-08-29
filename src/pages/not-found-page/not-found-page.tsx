import React from "react";
import { BackButton } from "../../components/back-button/back-button";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import "./not-found-page.css";

export const NotFoundPage: React.FC = () => {
  return (
    <section className="not-found-page">
      <BackButton />
      <div className="not-found-info">
        <CatchingPokemonIcon fontSize="large" />
        <h5>Page Not Found</h5>
      </div>
    </section>
  );
};
