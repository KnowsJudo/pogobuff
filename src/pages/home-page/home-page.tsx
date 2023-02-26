import React from "react";
import { Button, Grid } from "@mui/material";
import heading from "../../img/pogo.png";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import "./home-page.css";
import { Link } from "react-router-dom";

export const HomePage = () => {
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
          <Link to="/sets" style={{ textDecoration: "none" }}>
            <Button variant="contained" style={{ backgroundColor: "black" }}>
              GBL Sets Tracker
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/candy" style={{ textDecoration: "none" }}>
            <Button variant="contained" style={{ backgroundColor: "black" }}>
              Rare Candy Candidates
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/teams" style={{ textDecoration: "none" }}>
            <Button variant="contained" style={{ backgroundColor: "black" }}>
              GBL Teams
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/elite" style={{ textDecoration: "none" }}>
            <Button variant="contained" style={{ backgroundColor: "black" }}>
              Elite Tms Candidates
            </Button>
          </Link>
        </Grid>
      </Grid>
    </section>
  );
};
