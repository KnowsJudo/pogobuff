import React, { useState } from "react";
import { ConfirmButton } from "../confirm-button/confirm-button";
import { IWinCons } from "../set-data/set-data";
import { Input } from "@mui/material";
import "./modal.css";

interface IModal {
  confirm?: boolean;
  cancelFn: () => void;
  confirmFn: (inputs?: IWinCons, setNo?: number) => void;
  prompt: string;
  winCons?: IWinCons;
  index?: number;
}

export const CustomModal: React.FC<IModal> = (props) => {
  const [localWinCons, setLocalWinCons] = useState<IWinCons>({
    firstInput: props.winCons?.firstInput || "",
    secondInput: props.winCons?.secondInput || "",
    thirdInput: props.winCons?.thirdInput || "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputKey: keyof IWinCons
  ) => {
    setLocalWinCons((prev) => {
      return { ...prev, [inputKey]: event.target.value };
    });
  };

  const handleConfirm = () => {
    props.confirmFn(localWinCons, props.index);
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
            {props.winCons?.firstInput ? (
              <p>{props.winCons?.firstInput}</p>
            ) : (
              <Input
                value={localWinCons.firstInput}
                onChange={(e) => handleInputChange(e, "firstInput")}
              />
            )}
            {props.winCons?.secondInput ? (
              <p>{props.winCons?.secondInput}</p>
            ) : (
              <Input
                value={localWinCons.secondInput}
                onChange={(e) => handleInputChange(e, "secondInput")}
              />
            )}
            {props.winCons?.thirdInput ? (
              <p>{props.winCons?.thirdInput}</p>
            ) : (
              <Input
                value={localWinCons.thirdInput}
                onChange={(e) => handleInputChange(e, "thirdInput")}
              />
            )}
            <ConfirmButton confirmFn={handleConfirm} />
          </div>
        )}
      </div>
    </div>
  );
};
