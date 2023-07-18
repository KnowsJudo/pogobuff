import React from "react";
import { ConfirmButton } from "../confirm-button/confirm-button";
import { IWinCons } from "../set-data/set-data";
import "./modal.css";

interface IModal {
  confirm?: boolean;
  cancelFn: () => void;
  confirmFn: (inputs?: IWinCons, setNo?: number) => void;
  prompt: string;
  winCons?: IWinCons;
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
          <div className="wincons-input">
            <input value={props.winCons?.firstInput} />
            <input value={props.winCons?.secondInput} />
            <input value={props.winCons?.thirdInput} />
            <ConfirmButton confirmFn={props.cancelFn} />
          </div>
        )}
      </div>
    </div>
  );
};
