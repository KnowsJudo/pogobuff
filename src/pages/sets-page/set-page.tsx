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
import { BackButton } from "../../components/back-button/back-button";
import { IUserState } from "../../types/elo";
import { CustomModal } from "../../components/modal/modal";
import AddIcon from "@mui/icons-material/Add";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import SyncIcon from "@mui/icons-material/Sync";
import "./set-page.css";

export const SetPage: React.FC = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [addTie, setAddTie] = useState(() => retainTieState());
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    sessionStorage.setItem("Ties Added", JSON.stringify(addTie));
  }, [addTie]);

  const addSet: () => void = () => {
    setAddTie((prev: boolean[]) => [...prev, false]);
    if (userData.sets.length > 5) {
      return;
    }
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

  const changeModal: () => void = () => {
    removeAllSets();
    setModal(false);
  };

  const removeAllSets: () => void = () => {
    setAddTie(startingTieState);
    setUserData((prev: IUserState) => {
      return {
        ...prev,
        elo: { ...prev.elo, current: prev.elo.starting, change: 0, ending: 0 },
        sets: startingSetData,
      };
    });
  };

  return (
    <section className="set-page">
      <BackButton />
      <EloInfo />
      <SetData addTie={addTie} setAddTie={setAddTie} />
      <div className="set-options">
        <span className="add-set">
          <Button
            variant="contained"
            style={{ backgroundColor: "black", border: "1px solid white" }}
            onClick={() => addSet()}
          >
            <AddIcon /> &nbsp; Add Set
          </Button>
        </span>
        <span className="battle-day">
          <Button
            variant="contained"
            style={{ backgroundColor: "black", border: "1px solid white" }}
            onClick={() => addBattleDay()}
          >
            <CatchingPokemonIcon /> &nbsp; Go Battle Day
          </Button>
        </span>
        <span className="remove-all">
          <Button variant="outlined" onClick={() => setModal(true)}>
            <SyncIcon />
          </Button>
        </span>
      </div>
      {modal && (
        <CustomModal
          confirm
          cancelFn={() => setModal(false)}
          confirmFn={changeModal}
          prompt="Remove all sets data?"
        />
      )}
    </section>
  );
};
