import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export const GridItem = (props) => {
  return (
    <Grid
      item
      xs={4}
      style={{
        border: "1px solid black",
        borderRadius: "5px",
        margin: "1%",
        alignItems: "center",
      }}
    >
      <Link
        to={`/${props.link}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        {props.title}
      </Link>
    </Grid>
  );
};
