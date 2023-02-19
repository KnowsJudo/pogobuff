import React from "react";
import { useContext } from "react";
import { ScoreButton } from "../score-button/score-button";
import { ISet, IUserState, UserContext } from "../../context";
import { Stack } from "@mui/material";

interface IScorer {
  id: number;
  score: ISet;
}

export const Scorer: React.FC<IScorer> = (props) => {
  const { userData, setUserData } = useContext(UserContext);

  const updateScore = (side: string) => {
    const newUserValues = [...userData.sets];
    if (
      newUserValues[props.id].wins +
        newUserValues[props.id].losses +
        newUserValues[props.id].ties >=
      5
    ) {
      return;
    }

    newUserValues[props.id] = {
      wins: side === "left" ? props.score.wins + 1 : props.score.wins,
      losses: side === "right" ? props.score.losses + 1 : props.score.losses,
      ties: side === "tie" ? props.score.ties + 1 : props.score.ties,
    };

    setUserData((prev: IUserState) => {
      return {
        ...prev,
        elo: {
          starting: prev.elo.starting,
          current: !prev.elo.starting
            ? 0
            : side === "left"
            ? prev.elo.current + 17
            : side === "tie"
            ? prev.elo.current
            : prev.elo.current - 17,
          change:
            side === "left"
              ? prev.elo.change + 17
              : side === "tie"
              ? prev.elo.change
              : prev.elo.change - 17,
          ending: prev.elo.ending,
        },

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
      <>
        <h1>-</h1>
        <ScoreButton
          score={props.score.ties}
          updateScore={updateScore}
          side={"tie"}
        />
      </>
    </Stack>
  );
};
