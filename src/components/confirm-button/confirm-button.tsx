import React from "react";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import "./confirm-button.css";

interface IConfirm {
  confirmFn: () => void;
  cancel?: boolean;
}

export const ConfirmButton: React.FC<IConfirm> = (props) => {
  return (
    <Button
      onClick={() => props.confirmFn()}
      className="done-button"
      variant="contained"
      style={{ backgroundColor: "black", color: "white" }}
    >
      {props.cancel ? <CloseIcon /> : <DoneIcon />}
    </Button>
  );
};
