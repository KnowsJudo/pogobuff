import React from "react";
import { Button } from "@mui/material";
import "./score-button.css";

interface IScoreButton {
  updateScore: (side: string) => void;
  side: string;
  score: number;
}

export const ScoreButton: React.FC<IScoreButton> = (props) => {
  return (
    <Button
      onClick={() => props.updateScore(props.side)}
      className="score-button"
      variant="contained"
    >
      {props.score}
    </Button>
  );
};
