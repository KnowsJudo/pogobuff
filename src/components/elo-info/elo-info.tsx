import React from "react";
import { Button, Input } from "@material-ui/core";
import { useContext, useState } from "react";
import { IUserState, retrieveElo, UserContext } from "../../context";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import "./elo-info.css";

export const EloInfo = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [elo, setElo] = useState<number>(0);
  const [eloEntered, setEloEntered] = useState(() => retrieveElo());

  const handleElo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setElo(Number(e.target.value));
  };

  const handleSubmit = () => {
    setEloEntered(true);
    setUserData((prev: IUserState) => {
      return {
        ...prev,
        elo: {
          starting: elo,
          current: prev.elo.change && elo ? elo + prev.elo.change : elo,
          change: prev.elo.change ? prev.elo.change : 0,
          ending: prev.elo.ending ? prev.elo.ending : elo,
        },
        sets: [...prev.sets],
      };
    });
  };

  const totalScore = () => {
    const winsArray = userData.sets.map((next) => next.wins);
    const wins = winsArray.reduce((a, b) => a + b, 0);
    const lossesArray = userData.sets.map((next) => next.losses);
    const losses = lossesArray.reduce((a, b) => a + b, 0);
    const tiesArray = userData.sets.map((next) => next.ties);
    const ties = tiesArray.reduce((a, b) => a + b, 0);
    return `${wins} - ${losses} ${ties > 0 ? `- ${ties}` : ""}`;
  };

  return (
    <div className="current-stats">
      <span className="elo-info">
        <h6>Starting ELO:&nbsp;</h6>
        {!eloEntered ? (
          <span className="enter-elo">
            <Input
              type="number"
              value={elo === 0 ? "" : elo}
              placeholder=" #"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleElo(e)
              }
            />
            <Button onClick={() => handleSubmit()}>Submit</Button>
          </span>
        ) : (
          <span className="edit-elo">
            <h6>{userData.elo.starting}</h6>
            <Tooltip title="Edit">
              <EditIcon
                onClick={() => setEloEntered(false)}
                sx={{
                  fontSize: 14,
                  marginLeft: "25%",
                  "&:hover": { cursor: "pointer" },
                }}
              />
            </Tooltip>
          </span>
        )}
      </span>
      {eloEntered && <h6>Current est. ELO: {userData.elo.current} </h6>}
      <h6>{`Record: ${totalScore()}`}</h6>
    </div>
  );
};
