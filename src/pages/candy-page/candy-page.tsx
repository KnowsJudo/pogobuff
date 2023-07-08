import React from "react";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { useContext, useState } from "react";
import { UserContext } from "../../context";
import { Input, List, ListItem, Tooltip } from "@mui/material";
import { BackButton } from "../../components/back-button/back-button";
import { IUserState } from "../../types/elo";
import { ConfirmButton } from "../../components/confirm-button/confirm-button";
import DeleteIcon from "@mui/icons-material/Delete";
import rareC from "../../img/candy.png";
import xLC from "../../img/xl-candy.webp";
import "./candy-page.css";

export const CandyPage: React.FC = () => {
  const { userData, setUserData } = useContext(UserContext);
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

  return (
    <section className="candy-page">
      <NavBar />
      <BackButton />
      <div className="candy-container">
        <h6>Candy: </h6>
        <div className="current-candy">
          <img className="candy-image" src={rareC} alt="rare candy" />
          <Input
            type="number"
            onChange={(e) => handleCandy(e, "candy")}
            value={userData.candy}
            startAdornment={<p>x&nbsp;</p>}
          />
        </div>
        <h6>Candy XL:</h6>
        <div className="current-candyXL">
          <img className="candy-image" src={xLC} alt="XL candy" />
          <Input
            type="number"
            onChange={(e) => handleCandy(e, "candyXL")}
            value={userData.candyXL}
            startAdornment={<p>x&nbsp;</p>}
          />
        </div>
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
            <ConfirmButton confirmFn={addNewCandidate} />
          </Tooltip>
        </span>
        {candidates.map((next, i) => {
          return (
            <List key={i}>
              <span className="list-items">
                <ListItem>{next}</ListItem>
                {next && (
                  <DeleteIcon
                    sx={{
                      fontSize: 18,
                      "&:hover": { cursor: "pointer" },
                    }}
                  />
                )}
              </span>
            </List>
          );
        })}
      </div>
    </section>
  );
};
