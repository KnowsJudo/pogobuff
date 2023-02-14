import { Grid } from "@mui/material";
import { GridItem } from "../../components/grid-item/grid-item";
import heading from "../../img/pogo.png";
import "./home-page.css";

export const HomePage = () => {
  return (
    <section className="home-container">
      <img src={heading} alt="pogobuff" className="pogobuff-heading" />
      <Grid
        container
        columnSpacing={10}
        rowSpacing={2}
        style={{ marginLeft: "25%" }}
      >
        <GridItem link="sets" title="GBL Sets Tracker" />
        <GridItem link="candy" title="Rare Candy Candidates" />
        <GridItem link="teams" title="GBL Teams" />
        <GridItem link="tms" title="Elite Tms Candidates" />
      </Grid>
    </section>
  );
};
