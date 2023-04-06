import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableHead,
  TableRow,
} from "@mui/material";
import { BackButton } from "../../components/back-button/back-button";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { TableCell } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import "./teams-page.css";

interface ITeam {
  lead: string;
  switch: string;
  closer: string;
}
interface INextTeam {
  lead: boolean;
  switch: boolean;
  closer: boolean;
}

export const TeamsPage: React.FC = () => {
  const [league, setLeague] = useState<string>("");
  const [nextTeam, setNextTeam] = useState<INextTeam>({
    lead: false,
    switch: false,
    closer: false,
  });
  const [teams, setTeams] = useState<ITeam[]>([
    { lead: "Araquanid", switch: "Cradily", closer: "Ferrothorn" },
  ]);

  const addTeam: () => void = () => {
    setNextTeam({ lead: true, switch: true, closer: true });
  };

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
      <div className="teams-list">
        <span className="teams-head">
          {league}
          <Button
            onClick={() => addTeam()}
            style={{ marginLeft: "auto", color: "#11f32f" }}
          >
            <AddIcon />
            New
          </Button>
        </span>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Lead</b>
              </TableCell>
              <TableCell>
                <b>Switch</b>
              </TableCell>
              <TableCell>
                <b>Closer</b>
              </TableCell>
            </TableRow>
            <TableRow style={{ borderBottom: "none" }}>
              {teams.map((next) => {
                return (
                  <>
                    <TableCell>{next.lead}</TableCell>
                    <TableCell>{next.switch}</TableCell>
                    <TableCell>{next.closer}</TableCell>
                  </>
                );
              })}
            </TableRow>
          </TableHead>
        </Table>
      </div>
    </section>
  );
};
