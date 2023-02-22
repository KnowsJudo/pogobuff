import React from "react";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { EloInfo } from "../../components/elo-info/elo-info";
import { SetData } from "../../components/set-data/set-data";
import { retainTieState, UserContext } from "../../context";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import UndoIcon from "@mui/icons-material/Undo";
import "./set-page.css";

export const SetPage = () => {
  const { setUserData } = useContext(UserContext);
  const [addTie, setAddTie] = useState(() => retainTieState());

  useEffect(() => {
    sessionStorage.setItem("Ties Added", JSON.stringify(addTie));
  }, [addTie]);

  const addSet = () => {
    setAddTie((prev: boolean[]) => [...prev, false]);
    setUserData((prev) => {
      return {
        ...prev,
        elo: { ...prev.elo },
        sets: [...prev.sets, { wins: 0, losses: 0, ties: 0 }],
      };
    });
  };

  return (
    <section className="set-page">
      <NavBar />
      <Link
        to="/"
        style={{
          margin: "1% 0 0 5%",
          color: "black",
        }}
      >
        <Tooltip title="Home">
          <UndoIcon style={{ fontSize: "40px", margin: "auto" }} />
        </Tooltip>
      </Link>
      <EloInfo />
      <SetData addTie={addTie} setAddTie={setAddTie} />
      <Button
        style={{ padding: "10px", margin: "auto 30% 15%" }}
        variant="contained"
        onClick={() => addSet()}
      >
        New Set
      </Button>
    </section>
  );
};
