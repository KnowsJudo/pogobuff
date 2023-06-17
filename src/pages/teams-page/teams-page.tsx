import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { BackButton } from "../../components/back-button/back-button";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { apiURL } from "../../helpers/api-url";
import { TeamsDisplay } from "../../components/teams-display/teams-display";
import { LeagueIcon } from "../../components/league-icon/league-icon";
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
  const [greatTeams, setGreatTeams] = useState<ITeam[]>([
    { lead: "", switch: "", closer: "" },
  ]);
  const [ultraTeams, setUltraTeams] = useState<ITeam[]>([
    { lead: "", switch: "", closer: "" },
  ]);
  const [masterTeams, setMasterTeams] = useState<ITeam[]>([
    { lead: "", switch: "", closer: "" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const addTeam: () => void = () => {
    setEditNext({ lead: true, switch: true, closer: true });
  };

  const addTeamToList: (league: string) => void = () => {
    const keys = Object.values(nextTeam);
    if (keys.some((next) => !next)) {
      console.log("Please enter 3 pokemon");
      return;
    }
    if (league === "Great") {
      setGreatTeams((prev) => {
        return [...prev, nextTeam];
      });
    } else if (league === "Ultra") {
      setUltraTeams((prev) => {
        return [...prev, nextTeam];
      });
    } else {
      setMasterTeams((prev) => {
        return [...prev, nextTeam];
      });
    }
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
        setGreatTeams(teams);
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
            {!loading && (
              <span className="teams-head">
                <LeagueIcon league={league} />
                <Button
                  onClick={() => addTeam()}
                  style={{ marginLeft: "auto" }}
                  variant="contained"
                >
                  <AddIcon />
                  New
                </Button>
              </span>
            )}
            <TeamsDisplay
              league={league}
              greatTeams={greatTeams}
              ultraTeams={ultraTeams}
              masterTeams={masterTeams}
              editNext={editNext}
              nextTeam={nextTeam}
              setNextTeam={setNextTeam}
              addTeamToList={addTeamToList}
            />
          </div>
        )
      )}
    </section>
  );
};
