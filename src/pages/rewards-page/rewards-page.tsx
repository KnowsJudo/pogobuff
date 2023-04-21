import React from "react";
import { BackButton } from "../../components/back-button/back-button";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { Input } from "@mui/material";
import "./rewards-page.css";

export const RewardsPage: React.FC = () => {
  return (
    <section className="rewards-page">
      <NavBar />
      <BackButton />
      <div className="rewards-input">
        <Input placeholder="Encounter"></Input>
        <Input type="number" placeholder="Seen"></Input>
      </div>
    </section>
  );
};
