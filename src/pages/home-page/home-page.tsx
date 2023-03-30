import React from "react";
import { Grid } from "@mui/material";
import { HomeLink } from "../../components/home-link/home-link";
import heading from "../../img/pogo.png";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import "./home-page.css";

export const HomePage: React.FC = () => {
  return (
    <section className="home-container">
      <img src={heading} alt="pogobuff" className="pogobuff-heading" />
      <HorizontalRuleRoundedIcon
        preserveAspectRatio="none"
        style={{
          height: "30px",
          width: "100%",
        }}
      />
      <Grid container spacing={5} style={{ margin: "3% 0 0 33%" }}>
        <Grid item>
          <HomeLink link="/sets" title="Gbl Sets Tracker" />
        </Grid>
        <Grid item>
          <HomeLink link="/teams" title="GBL Teams" />
        </Grid>
        <Grid item>
          <HomeLink link="/candy" title="Rare Candy Candidates" />
        </Grid>
        <Grid item>
          <HomeLink link="/elite" title="Elite Tms Candidates" />
        </Grid>
      </Grid>
    </section>
  );
};
