import React, { useState } from "react";
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
  const [localWinCons, setLocalWinCons] = useState<IWinCons>(
    props.winCons || {}
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputKey: keyof IWinCons
  ) => {
    setLocalWinCons({
      ...localWinCons,
      [inputKey]: event.target.value,
    });
  };

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
            <input
              value={localWinCons.firstInput || ""}
              onChange={(e) => handleInputChange(e, "firstInput")}
            />
            <input
              value={localWinCons.secondInput || ""}
              onChange={(e) => handleInputChange(e, "secondInput")}
            />
            <input
              value={localWinCons.thirdInput || ""}
              onChange={(e) => handleInputChange(e, "thirdInput")}
            />
            <ConfirmButton confirmFn={() => props.confirmFn(localWinCons)} />
          </div>
        )}
      </div>
    </div>
  );
};
