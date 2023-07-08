import React from "react";
import { ConfirmButton } from "../confirm-button/confirm-button";
import "./modal.css";

interface IModal {
  confirm?: boolean;
  cancelFn: () => void;
  confirmFn: () => void;
  prompt: string;
}

export const CustomModal: React.FC<IModal> = (props) => {
  return (
    <div className="modal-container" onClick={() => props.cancelFn()}>
      <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
        <p>{props.prompt}</p>
        {props.confirm ? (
          <div className="button-selection">
            <ConfirmButton confirmFn={props.confirmFn} />
            <ConfirmButton cancel={true} confirmFn={props.cancelFn} />
          </div>
        ) : (
          <h1>Test</h1>
        )}
      </div>
    </div>
  );
};
