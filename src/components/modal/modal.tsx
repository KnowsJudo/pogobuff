import React from "react";
import "./modal.css";
import { Button } from "@mui/material";

interface IModal {
  cancel: () => void;
  confirm: () => void;
  prompt: string;
}

export const CustomModal: React.FC<IModal> = (props) => {
  return (
    <div className="modal-container" onClick={() => props.cancel()}>
      <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
        <p>{props.prompt}</p>
        <div className="button-selection">
          <Button onClick={() => props.confirm()}>Confirm</Button>
          <Button onClick={() => props.cancel()}>Exit</Button>
        </div>
      </div>
    </div>
  );
};
