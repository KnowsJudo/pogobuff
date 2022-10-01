import { useContext } from "react";
import { UserContext } from "../../context";
import "./elo-info.css";

export const EloInfo = () => {
  const { setsData } = useContext(UserContext);

  const totalScore = () => {
    const winsArray = setsData.map((next) => next.wins);
    const wins = winsArray.reduce((a, b) => a + b, 0);
    const lossesArray = setsData.map((next) => next.losses);
    const losses = lossesArray.reduce((a, b) => a + b, 0);
    return `${wins} - ${losses}`;
  };

  return (
    <div className="elo-info">
      <h4>Starting ELO: ~2200&nbsp;&nbsp;&nbsp;</h4>
      <h5>{`Total wins/losses: ${totalScore()}`}</h5>
    </div>
  );
};
