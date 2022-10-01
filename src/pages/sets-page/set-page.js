import { Button } from "@mui/material";
import { useContext } from "react";
import { EloInfo } from "../../components/elo-info/elo-info";
import { SetData } from "../../components/set-data/set-data";
import { UserContext } from "../../context";
import "./set-page.css";

export const SetPage = (props) => {
  const { setSetsData } = useContext(UserContext);
  return (
    <section className="set-page">
      <EloInfo />
      <SetData />
      <Button
        sx={{ padding: "10px", margin: "auto 30%" }}
        variant="contained"
        onClick={() =>
          setSetsData((prev) => [
            ...prev,
            {
              wins: 0,
              losses: 0,
              ties: 0,
            },
          ])
        }
      >
        New Set
      </Button>
    </section>
  );
};
