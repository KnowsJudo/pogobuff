// import { TextField } from "@material-ui/core";
import { useContext } from "react";
import { UserContext } from "../../context";
import "./elo-info.css";

export const EloInfo = () => {
  const { userData } = useContext(UserContext);

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
        <h4>Starting ELO:</h4>&nbsp;
        <h4>{userData.elo}</h4>
      </span>
      <h5>{`Total wins/losses: ${totalScore()}`}</h5>
    </div>
  );
};
