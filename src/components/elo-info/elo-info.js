import { Button, TextField } from "@material-ui/core";
import { useContext, useState, useRef } from "react";
import { retrieveElo, UserContext } from "../../context";
import EditIcon from "@mui/icons-material/Edit";
import "./elo-info.css";

export const EloInfo = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [eloEntered, setEloEntered] = useState(() => retrieveElo());

  const eloRef = useRef();

  const handleSubmit = () => {
    setEloEntered(true);
    setUserData((prev) => {
      return {
        elo: {
          starting: Number(eloRef.current.value),
          current: prev.elo.change
            ? Number(eloRef.current.value) + prev.elo.change
            : Number(eloRef.current.value),
          change: prev.elo.change ? prev.elo.change : 0,
          ending: prev.elo.ending
            ? prev.elo.ending
            : Number(eloRef.current.value),
        },
        sets: [...prev.sets],
      };
    });
  };

  // const calcElo = () => {};

  const totalScore = () => {
    const winsArray = userData.sets.map((next) => next.wins);
    const wins = winsArray.reduce((a, b) => a + b, 0);
    const lossesArray = userData.sets.map((next) => next.losses);
    const losses = lossesArray.reduce((a, b) => a + b, 0);
    return `${wins} - ${losses}`;
  };

  return (
    <div className="current-stats">
      <span className="elo-info">
        <h6>Starting ELO:&nbsp;</h6>
        {!eloEntered ? (
          <span className="enter-elo">
            <TextField type="number" inputRef={eloRef} />
            <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
          </span>
        ) : (
          <span className="edit-elo">
            <h6>{userData.elo.starting}</h6>
            <EditIcon
              onClick={() => setEloEntered(false)}
              sx={{
                fontSize: 14,
                marginLeft: "25%",
                "&:hover": { cursor: "pointer" },
              }}
            />
          </span>
        )}
      </span>
      {eloEntered && <h6>Current est. ELO: {userData.elo.current} </h6>}
      <h5>{`Wins/losses: ${totalScore()}`}</h5>
    </div>
  );
};
