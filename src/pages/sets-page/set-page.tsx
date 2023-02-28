import React from "react";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { EloInfo } from "../../components/elo-info/elo-info";
import { SetData } from "../../components/set-data/set-data";
import { retainTieState, UserContext } from "../../context";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { BackButton } from "../../components/back-button/back-button";
import AddIcon from "@mui/icons-material/Add";
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
      <BackButton />
      <EloInfo />
      <SetData addTie={addTie} setAddTie={setAddTie} />
      <span className="add-set">
        <Button style={{ color: "black" }} onClick={() => addSet()}>
          <AddIcon /> &nbsp; New Set
        </Button>
      </span>
    </section>
  );
};
