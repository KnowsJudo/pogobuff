import { Scorer } from "../scorer/scorer";
import { useContext } from "react";
import { UserContext } from "../../context";
import { Button } from "@mui/material";
import "./set-data.css";

export const SetData = () => {
  const { setsData, setSetsData } = useContext(UserContext);

  const removeSet = (setNumber) => {
    setSetsData((prev) => {
      return prev.filter((match, ind) => ind !== setNumber);
    });
  };

  return (
    <div className="set-data-box">
      {setsData.map((next, ind) => {
        return (
          <div key={ind} className="set-data-inner">
            <h3>{`Set ${ind + 1}:`}</h3>
            <Scorer id={ind} score={next} />
            <Button onClick={() => removeSet(ind)}>Remove Set</Button>
          </div>
        );
      })}
    </div>
  );
};
