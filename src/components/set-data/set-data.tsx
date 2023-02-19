import React from "react";
import { Scorer } from "../scorer/scorer";
import { useContext } from "react";
import { IUserState, UserContext } from "../../context";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import "./set-data.css";

interface ISetData {
  setAddTie: React.Dispatch<React.SetStateAction<boolean[]>>;
  addTie: boolean[];
}

export const SetData: React.FC<ISetData> = (props) => {
  const { userData, setUserData } = useContext(UserContext);

  const removeSet = (setNumber: number) => {
    props.setAddTie((prev) => prev.filter((match, ind) => ind !== setNumber));

    const setToRemove = userData.sets.find((match, ind) => ind === setNumber);
    let totalChange = 0;
    if (setToRemove) {
      const winChange = setToRemove.wins > 0 ? setToRemove.wins * 17 : 0;
      const lossChange = setToRemove.losses > 0 ? setToRemove.losses * -17 : 0;
      totalChange = winChange + lossChange;
    }

    setUserData((prev: IUserState) => {
      return {
        ...prev,
        elo: {
          starting: prev.elo.starting,
          current: prev.elo.current - totalChange,
          change: prev.elo.change - totalChange,
          ending: prev.elo.ending,
        },
        sets: prev.sets.filter((match, ind) => ind !== setNumber),
      };
    });
  };

  return (
    <div className="set-data-box">
      {userData.sets.map((next, ind) => {
        return (
          <div key={ind} className="set-data-inner">
            <h3>{`Set ${ind + 1}:`}</h3>
            <Scorer id={ind} score={next} />
            <span className="set-data-edit">
              <GraphicEqIcon
                sx={{
                  fontSize: 18,
                  marginRight: "auto",
                  marginLeft: "5%",
                }}
              />
              <Tooltip title="Remove set">
                <DeleteIcon
                  onClick={() => removeSet(ind)}
                  sx={{
                    fontSize: 18,
                    margin: props.addTie[ind] ? "auto" : "auto 5%",
                    "&:hover": { cursor: "pointer" },
                  }}
                />
              </Tooltip>
            </span>
          </div>
        );
      })}
    </div>
  );
};
