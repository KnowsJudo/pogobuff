import React from "react";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { EloInfo } from "../../components/elo-info/elo-info";
import { SetData } from "../../components/set-data/set-data";
import {
  retainTieState,
  startingSetData,
  startingTieState,
  UserContext,
} from "../../context";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { BackButton } from "../../components/back-button/back-button";
import { IUserState } from "../../types/elo";
import AddIcon from "@mui/icons-material/Add";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import SyncIcon from "@mui/icons-material/Sync";
import "./set-page.css";

export const SetPage = () => {
  const { setUserData } = useContext(UserContext);
  const [addTie, setAddTie] = useState(() => retainTieState());

  useEffect(() => {
    sessionStorage.setItem("Ties Added", JSON.stringify(addTie));
  }, [addTie]);

  const addSet: () => void = () => {
    setAddTie((prev: boolean[]) => [...prev, false]);
    setUserData((prev) => {
      return {
        ...prev,
        sets: [...prev.sets, { wins: 0, losses: 0, ties: 0 }],
      };
    });
  };

  const addBattleDay: () => void = () => {
    setUserData((prev) => {
      const sets = prev.sets.slice(0, 19);
      while (sets.length < 19) {
        sets.push({ wins: 0, losses: 0, ties: 0 });
      }
      sets.push({ wins: 0, losses: 0, ties: 0 });
      return {
        ...prev,
        sets,
      };
    });
  };

  const removeAllSets: () => void = () => {
    setAddTie(startingTieState);
    setUserData((prev: IUserState) => {
      return {
        ...prev,
        elo: { ...prev.elo, starting: 0, current: 0, change: 0, ending: 0 },
        sets: startingSetData,
      };
    });
  };

  return (
    <section className="set-page">
      <NavBar />
      <BackButton />
      <EloInfo />
      <SetData addTie={addTie} setAddTie={setAddTie} />
      <div className="set-options">
        <span className="add-set">
          <Button style={{ color: "black" }} onClick={() => addSet()}>
            <AddIcon /> &nbsp; New Set
          </Button>
        </span>
        <span className="battle-day">
          <Button style={{ color: "black" }} onClick={() => addBattleDay()}>
            <CatchingPokemonIcon /> &nbsp; Go Battle Day
          </Button>
        </span>
        <span className="remove-all">
          <Button style={{ color: "#ff4d4d" }} onClick={() => removeAllSets()}>
            <SyncIcon /> &nbsp; Reset all
          </Button>
        </span>
      </div>
    </section>
  );
};
