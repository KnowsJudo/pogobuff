import React from "react";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import UndoIcon from "@mui/icons-material/Undo";

export const BackButton: React.FC = () => {
  return (
    <Link
      to="/"
      style={{
        margin: "1% 0 0 5%",
        color: "black",
      }}
    >
      <Tooltip title="Home">
        <UndoIcon style={{ fontSize: "40px", margin: "auto" }} />
      </Tooltip>
    </Link>
  );
};
