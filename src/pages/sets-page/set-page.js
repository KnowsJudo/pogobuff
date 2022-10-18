import { Button } from "@mui/material";
import { useContext } from "react";
import { EloInfo } from "../../components/elo-info/elo-info";
import { SetData } from "../../components/set-data/set-data";
import { UserContext } from "../../context";
import "./set-page.css";

export const SetPage = () => {
  const { setUserData } = useContext(UserContext);

  const addSet = () => {
    setUserData((prev) => {
      return {
        elo: { ...prev.elo },
        sets: [...prev.sets, { wins: 0, losses: 0, ties: 0 }],
      };
    });
  };

  return (
    <section className="set-page">
      <EloInfo />
      <SetData />
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
