import React from "react";
import axios from "axios";
import {
  Input,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useContext, useState } from "react";
import { retrieveElo, UserContext } from "../../context";
import { apiURL } from "../../helpers/api-url";
import { IUserState } from "../../types/elo";
import { ConfirmButton } from "../confirm-button/confirm-button";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import Rank20 from "../../img/20.png";
import Ace from "../../img/ace.png";
import Veteran from "../../img/veteran.png";
import Expert from "../../img/expert.png";
import Legend from "../../img/legend.png";
import "./elo-info.css";

export const EloInfo = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [name, setName] = useState<string>("");
  const [elo, setElo] = useState<number>(0);
  const [eloEntered, setEloEntered] = useState(() => retrieveElo());

  const handleElo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setElo(Number(e.target.value));
  };

  const submitName: () => void = async () => {
    try {
      await axios.post(`${apiURL}/api/sets`, { playername: name });
      const data = await axios.get(`${apiURL}/api/sets`);
      console.log(data);
      setUserData((prev: IUserState) => {
        return {
          ...prev,
          elo: {
            ...prev.elo,
            playername: name,
          },
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editName: () => void = () => {
    setUserData((prev: IUserState) => {
      return {
        ...prev,
        elo: {
          ...prev.elo,
          playername: "",
        },
      };
    });
  };

  const submitElo: () => void = async () => {
    try {
      await axios.post(`${apiURL}/api/sets`, { elo: elo });
      const data = await axios.get(`${apiURL}/api/sets`);
      console.log(data);
      setEloEntered(true);
      setUserData((prev: IUserState) => {
        return {
          ...prev,
          elo: {
            ...prev.elo,
            starting: elo,
            current: prev.elo.change && elo ? elo + prev.elo.change : elo,
            change: prev.elo.change ? prev.elo.change : 0,
            ending: prev.elo.ending ? prev.elo.ending : elo,
          },
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const calcBadge = (badge: string) => {
    setUserData((prev: IUserState) => {
      return {
        ...prev,
        elo: {
          ...prev.elo,
          badge,
        },
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
      <div className="player-badge">
        <FormControl>
          <InputLabel>Badge</InputLabel>
          <Select
            label="Rank"
            value={userData.elo.badge}
            onChange={(e) => calcBadge(e.target.value)}
          >
            <MenuItem value={Rank20}>20</MenuItem>
            <MenuItem value={Ace}>Ace</MenuItem>
            <MenuItem value={Veteran}>Veteran</MenuItem>
            <MenuItem value={Expert}>Expert</MenuItem>
            <MenuItem value={Legend}>Legend</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="elo-display">
        {userData.elo.badge && (
          <img
            src={userData.elo.badge}
            height={40}
            width={40}
            alt="Rank badge"
          />
        )}
        <div className="elo-info">
          {!userData.elo.playername ? (
            <span className="enter-elo">
              <h6>Playername:&nbsp;</h6>
              <Input
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                style={{ color: "white" }}
              />
              <ConfirmButton confirmFn={submitName} />
            </span>
          ) : (
            <span className="edit-elo">
              <Tooltip title="Playername">
                <h6>{userData.elo.playername}</h6>
              </Tooltip>
              <Tooltip title="Edit">
                <EditIcon
                  onClick={() => editName()}
                  sx={{
                    fontSize: 14,
                    marginLeft: "25%",
                    "&:hover": { cursor: "pointer" },
                  }}
                />
              </Tooltip>
            </span>
          )}

          {!eloEntered ? (
            <span className="enter-elo">
              <h6>Starting Elo:&nbsp;</h6>
              <Input
                type="number"
                value={elo === 0 ? "" : elo}
                placeholder=" #"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleElo(e)
                }
                style={{ color: "white" }}
              />
              <ConfirmButton confirmFn={submitElo} />
            </span>
          ) : (
            <span className="edit-elo">
              <Tooltip title="Starting rank">
                <h6>{userData.elo.starting}</h6>
              </Tooltip>
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
        </div>
      </div>
      {eloEntered && <h6>Estimated Rank {userData.elo.current} </h6>}
      <h6>{`Record: ${totalScore()}`}</h6>
    </div>
  );
};
