import React from "react";
import "./modal.css";
import { Button } from "@material-ui/core";

interface IModal {
  cancel: () => void;
  confirm: () => void;
}

export const CustomModal: React.FC<IModal> = (props) => {
  return (
    <div className="modal-container" onClick={() => props.cancel()}>
      <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
        <Button onClick={() => props.confirm()}>Confirm</Button>
      </div>
    </div>
  );
};
