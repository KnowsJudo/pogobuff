import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { BackButton } from "../../components/back-button/back-button";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { apiURL } from "../../helpers/api-url";
import { TableBody } from "@material-ui/core";
import Great from "../../img/great.png";
import Ultra from "../../img/ultra.png";
import Master from "../../img/master.png";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
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

const initialTeams = {
  lead: "",
  switch: "",
  closer: "",
};

const initialEdit = {
  lead: false,
  switch: false,
  closer: false,
};

export const TeamsPage: React.FC = () => {
  const [league, setLeague] = useState<string>("");
  const [nextTeam, setNextTeam] = useState<ITeam>(initialTeams);
  const [editNext, setEditNext] = useState<INextTeam>(initialEdit);
  const [teams, setTeams] = useState<ITeam[]>([
    { lead: "Araquanid", switch: "Cradily", closer: "Ferrothorn" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const addTeam: () => void = () => {
    setEditNext({ lead: true, switch: true, closer: true });
  };

  const addTeamToList: () => void = () => {
    const keys = Object.values(nextTeam);
    if (keys.some((next) => !next)) {
      console.log("Please enter 3 pokemon");
      return;
    }
    setTeams((prev) => {
      return [...prev, nextTeam];
    });
    setNextTeam(initialTeams);
    setEditNext(initialEdit);
  };

  useEffect(() => {
    if (!league) {
      return;
    }
    const selectLeague: () => void = async () => {
      setLoading(true);
      try {
        const data = await axios.get(`${apiURL}/api/teams`);
        const teams = data.data[league];
        setTeams(teams);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    selectLeague();
  }, [league]);

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
      {loading ? (
        <div className="load-box">
          {loading && <CircularProgress style={{ margin: "auto" }} />}
        </div>
      ) : (
        league && (
          <div className="teams-list">
            <span className="teams-head">
              <img
                src={
                  league === "Great"
                    ? Great
                    : league === "Ultra"
                    ? Ultra
                    : Master
                }
                height={50}
                width={50}
                alt="great league icon"
              />
              <Button
                onClick={() => addTeam()}
                color="secondary"
                size="small"
                style={{ marginLeft: "auto" }}
                variant="outlined"
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
              </TableHead>
              <TableBody>
                {teams.map((next, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{next.lead}</TableCell>
                      <TableCell>{next.switch}</TableCell>
                      <TableCell>{next.closer}</TableCell>
                    </TableRow>
                  );
                })}

                <TableRow>
                  {editNext.lead && (
                    <TableCell>
                      <Input
                        value={nextTeam.lead}
                        onChange={(e) =>
                          setNextTeam((prev) => {
                            return { ...prev, lead: e.target.value };
                          })
                        }
                      />
                    </TableCell>
                  )}
                  {editNext.switch && (
                    <TableCell>
                      <Input
                        value={nextTeam.switch}
                        onChange={(e) =>
                          setNextTeam((prev) => {
                            return { ...prev, switch: e.target.value };
                          })
                        }
                      />
                    </TableCell>
                  )}
                  {editNext.closer && (
                    <TableCell>
                      <Input
                        value={nextTeam.closer}
                        onChange={(e) =>
                          setNextTeam((prev) => {
                            return { ...prev, closer: e.target.value };
                          })
                        }
                      />
                      <Button
                        style={{ color: "black" }}
                        onClick={() => addTeamToList()}
                      >
                        <DoneIcon />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )
      )}
    </section>
  );
};
