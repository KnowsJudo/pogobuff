import React from "react";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import UndoIcon from "@mui/icons-material/Undo";
import "./back-button.css";

export const BackButton: React.FC = () => {
  return (
    <Link to="/" className="back-link">
      <Tooltip title="Home">
        <UndoIcon className="undo-icon" />
      </Tooltip>
    </Link>
  );
};
