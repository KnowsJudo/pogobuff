import React from "react";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import "./not-found-page.css";

export const NotFoundPage: React.FC = () => {
  return (
    <section className="not-found-page">
      <div className="not-found-info">
        <CatchingPokemonIcon fontSize="large" />
        <h5>Page Not Found</h5>
      </div>
    </section>
  );
};
