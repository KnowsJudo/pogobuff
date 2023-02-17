import React from "react";
import { Button } from "@mui/material";

interface IScoreButton {
  updateScore: (side: string) => void;
  side: string;
  score: number;
}

export const ScoreButton: React.FC<IScoreButton> = (props) => {
  return (
    <Button
      onClick={() => props.updateScore(props.side)}
      style={{ borderRadius: "8", backgroundColor: "black", margin: "auto" }}
      variant="contained"
    >
      {props.score}
    </Button>
  );
};
