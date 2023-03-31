import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
} from "@mui/material";
import { BackButton } from "../../components/back-button/back-button";
import { NavBar } from "../../components/nav-bar/nav-bar";
import "./teams-page.css";

export const TeamsPage: React.FC = () => {
  const [league, setLeague] = useState("");

  return (
    <section className="teams-page">
      <NavBar />
      <BackButton />
      <div className="league-select">
        <FormControl style={{ margin: "auto", width: "200px" }}>
          <InputLabel id="demo-simple-select-label">League</InputLabel>
          <Select
            value={league}
            label="League"
            onChange={(e) => setLeague(e.target.value)}
          >
            <MenuItem value={"Great"}>Great</MenuItem>
            <MenuItem value={"Ultra"}>Ultra</MenuItem>
            <MenuItem value={"Master"}>Master</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div></div>
    </section>
  );
};
