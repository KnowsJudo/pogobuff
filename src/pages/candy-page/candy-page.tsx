import React from "react";
import axios from "axios";
import { apiURL } from "../../helpers/api-url";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { useContext, useState } from "react";
import { UserContext } from "../../context";
import { Button, Input, List, ListItem, Tooltip } from "@mui/material";
import { BackButton } from "../../components/back-button/back-button";
import { IUserState } from "../../types/elo";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import rareC from "../../img/rare.webp";
import xLC from "../../img/xl-candy.webp";
import "./candy-page.css";

export const CandyPage: React.FC = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [name, setName] = useState<string>("");
  const [nameEntered, setNameEntered] = useState(false);
  const [candidates, setCandidates] = useState([""]);
  const [newCandidate, setNewCandidate] = useState("");

  const handleCandy = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    event.preventDefault();
    setUserData((prev: IUserState) => {
      return {
        ...prev,
        [type]: event.target.value,
      };
    });
  };

  const handleCandidate = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setNewCandidate(event.target.value);
  };

  const addNewCandidate = () => {
    if (!newCandidate) {
      return;
    }
    setCandidates((prev) => [...prev, newCandidate]);
    setNewCandidate("");
  };

  const submitName = async () => {
    try {
      await axios.post(`${apiURL}/api/candy`, { playername: name });
      const data = await axios.get(`${apiURL}/api/candy`);
      console.log(data);
      setNameEntered(true);
      setUserData((prev: IUserState) => {
        return {
          ...prev,
          elo: {
            ...prev.elo,
            playername: name,
          },
          sets: [...prev.sets],
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="candy-page">
      <NavBar />
      <BackButton />
      <div className="current-candy">
        <h6>Playername:</h6>
        {!nameEntered ? (
          <span className="enter-elo">
            <Input
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <Button onClick={() => submitName()}>
              <DoneIcon />
            </Button>
          </span>
        ) : (
          <span className="edit-elo">
            <h6>{userData.elo.playername}</h6>
            <Tooltip title="Edit">
              <EditIcon
                onClick={() => setNameEntered(false)}
                sx={{
                  fontSize: 14,
                  marginLeft: "25%",
                  "&:hover": { cursor: "pointer" },
                }}
              />
            </Tooltip>
          </span>
        )}
        <h5>Current: </h5>
        <img height={70} width={70} src={rareC} alt="rare candy" />
        &nbsp;x&nbsp;
        <Input
          type="number"
          onChange={(e) => handleCandy(e, "candy")}
          value={userData.candy}
        />
        <h5>Current XL:</h5>{" "}
        <img height={45} width={45} src={xLC} alt="XL candy" />
        &nbsp;x&nbsp;
        <Input
          type="number"
          onChange={(e) => handleCandy(e, "candyXL")}
          value={userData.candyXL}
        />
      </div>
      <div className="candy-pokes">
        <span className="candly-list">
          <h6>Candy Priorities:</h6>
          <Input
            type="string"
            onChange={(e) => handleCandidate(e)}
            value={newCandidate}
          />
          <Tooltip title="Add to List">
            <Button onClick={() => addNewCandidate()}>{">"}</Button>
          </Tooltip>
        </span>
        {candidates.map((next, i) => {
          return (
            <List key={i}>
              <ListItem>{next}</ListItem>
            </List>
          );
        })}
      </div>
    </section>
  );
};
