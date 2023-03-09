import React from "react";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { useContext, useState } from "react";
import { UserContext } from "../../context";
import { Button, Input, List, Tooltip } from "@material-ui/core";
import { BackButton } from "../../components/back-button/back-button";
import { IUserState } from "../../types/elo";
import rareC from "../../img/rare.webp";
import xLC from "../../img/xl-candy.webp";
import "./candy-page.css";

export const CandyPage = () => {
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
      <div className="current-candy">
        <h5>
          Current: <img height={100} width={100} src={rareC} alt="rare candy" />
          &nbsp;x&nbsp;
          <Input
            type="number"
            onChange={(e) => handleCandy(e, "candy")}
            value={userData.candy}
          />
        </h5>
        <h5>
          Current XL: <img height={70} width={70} src={xLC} alt="XL candy" />
          &nbsp;x&nbsp;
          <Input
            type="number"
            onChange={(e) => handleCandy(e, "candyXL")}
            value={userData.candyXL}
          />
        </h5>
      </div>
      <div className="candy-pokes">
        <span>
          <h5>Candy Priorities:</h5>
          <Input
            type="string"
            onChange={(e) => handleCandidate(e)}
            value={newCandidate}
          />
          <Tooltip title="Add to List">
            <Button onClick={() => addNewCandidate()}>{"->"}</Button>
          </Tooltip>
        </span>
        {candidates.map((next, i) => {
          return <List key={i}>{next}</List>;
        })}
      </div>
    </section>
  );
};
