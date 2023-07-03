import React from "react";
import { Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import "./done-button.css";

interface IDoneProps {
  doneFn: () => void;
}

export const DoneButton: React.FC<IDoneProps> = (props) => {
  return (
    <Button onClick={() => props.doneFn()} className="done-button">
      <DoneIcon />
    </Button>
  );
};
