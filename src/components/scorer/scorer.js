import { useContext } from "react";
import { Stack } from "@mui/material";
import { ScoreButton } from "../score-button/score-button";
import { UserContext } from "../../context";

export const Scorer = (props) => {
  const { userData, setUserData } = useContext(UserContext);

  const updateScore = (side) => {
    const newUserValues = [...userData.sets];
    if (newUserValues[props.id].wins + newUserValues[props.id].losses >= 5)
      return;
    newUserValues[props.id] = {
      wins: side === "left" ? props.score.wins + 1 : props.score.wins,
      losses: side === "right" ? props.score.losses + 1 : props.score.losses,
      ties: props.score.ties,
    };
    setUserData((prev) => {
      return {
        elo: prev.elo,
        sets: newUserValues,
      };
    });
  };

  return (
    <Stack direction="row">
      <ScoreButton
        score={props.score.wins}
        updateScore={updateScore}
        side={"left"}
      />
      <h1>-</h1>
      <ScoreButton
        score={props.score.losses}
        updateScore={updateScore}
        side={"right"}
      />
    </Stack>
  );
};
