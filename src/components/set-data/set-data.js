import { Scorer } from "../scorer/scorer";
import { useContext } from "react";
import { UserContext } from "../../context";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./set-data.css";

export const SetData = () => {
  const { userData, setUserData } = useContext(UserContext);

  const removeSet = (setNumber) => {
    setUserData((prev) => {
      return {
        elo: prev.elo,
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
            <Button
              onClick={() => removeSet(ind)}
              sx={{ display: "flex", margin: "auto", justifyContent: "center" }}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      })}
    </div>
  );
};
