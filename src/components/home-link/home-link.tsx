import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface IHomeLink {
  link: string;
  title: string;
}

export const HomeLink: React.FC<IHomeLink> = (props) => {
  return (
    <Link to={props.link} style={{ textDecoration: "none" }}>
      <Button variant="contained" style={{ backgroundColor: "black" }}>
        {props.title}
      </Button>
    </Link>
  );
};
