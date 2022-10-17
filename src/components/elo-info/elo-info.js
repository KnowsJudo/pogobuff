import { Button, TextField } from "@material-ui/core";
import { useContext, useState, useRef } from "react";
import { UserContext } from "../../context";
import "./elo-info.css";

export const EloInfo = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [eloEntered, setEloEntered] = useState(false);

  const eloRef = useRef();

  const handleSubmit = () => {
    setUserData((prev) => {
      return {
        elo: eloRef.current.value,
        sets: [...prev.sets],
      };
    });
    setEloEntered(true);
  };

  const totalScore = () => {
    const winsArray = userData.sets.map((next) => next.wins);
    const wins = winsArray.reduce((a, b) => a + b, 0);
    const lossesArray = userData.sets.map((next) => next.losses);
    const losses = lossesArray.reduce((a, b) => a + b, 0);
    return `${wins} - ${losses}`;
  };

  return (
    <div className="current-stats">
      <span className="elo-info">
        <h5>Starting ELO:&nbsp;</h5>
        {!eloEntered ? (
          <span className="enter-elo">
            <TextField type="number" inputRef={eloRef}></TextField>
            <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
          </span>
        ) : (
          <span className="edit-elo">
            <h5>{userData.elo}</h5>
            <Button onClick={() => setEloEntered(false)}>Edit</Button>
          </span>
        )}
      </span>
      <h5>{`Wins/losses: ${totalScore()}`}</h5>
    </div>
  );
};
