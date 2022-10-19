import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { EloInfo } from "../../components/elo-info/elo-info";
import { SetData } from "../../components/set-data/set-data";
import { retainTieState, UserContext } from "../../context";
import "./set-page.css";

export const SetPage = () => {
  const { setUserData } = useContext(UserContext);
  const [addTie, setAddTie] = useState(() => retainTieState());

  useEffect(() => {
    sessionStorage.setItem("Ties Added", JSON.stringify(addTie));
  }, [addTie]);

  const addSet = () => {
    setAddTie((prev) => [...prev, false]);
    setUserData((prev) => {
      return {
        elo: { ...prev.elo },
        sets: [...prev.sets, { wins: 0, losses: 0, ties: 0 }],
      };
    });
  };

  return (
    <section className="set-page">
      <EloInfo addTie={addTie} />
      <SetData addTie={addTie} setAddTie={setAddTie} />
      <Button
        sx={{ padding: "10px", margin: "auto 30%" }}
        variant="contained"
        onClick={() => addSet()}
      >
        New Set
      </Button>
    </section>
  );
};
