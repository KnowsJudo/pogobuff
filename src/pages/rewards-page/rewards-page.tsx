import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BackButton } from "../../components/back-button/back-button";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { Button, Input, MenuItem } from "@mui/material";
import { pokeApi } from "../../helpers/api-url";
import { debounce } from "../../helpers/debounce";
import SearchIcon from "@mui/icons-material/Search";
import "./rewards-page.css";

interface IPoke {
  name: string;
  url: string;
}

export const RewardsPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");

  const getPokemon: () => void = useMemo(
    () =>
      debounce(async () => {
        try {
          const data = await axios.get(`${pokeApi}pokemon?limit=2000&offset=0`);
          const results = data.data.results;
          console.log(results);
          console.log("search", searchInput);
          const match = results.filter((match: IPoke) =>
            match.name.toLowerCase().includes(searchInput.toLowerCase())
          );
          console.log("match", match);
          const names = match.map((next: IPoke) => next.name);
          setOptions(names);
        } catch (error) {
          console.error(error);
        }
      }, 500),
    [searchInput]
  );

  useEffect(() => {
    if (searchInput.length < 3 || searchInput.length > 10) {
      return;
    }
    setSelected("");
    getPokemon();
  }, [searchInput, getPokemon]);

  const handleSelect = (pokemon: string) => {
    setSelected(pokemon);
  };

  return (
    <section className="rewards-page">
      <NavBar />
      <BackButton />
      <div className="rewards-input">
        <span>
          <Button>
            <SearchIcon />
          </Button>
          <Input
            placeholder="Encounter"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          {selected ? (
            <span>{selected}</span>
          ) : (
            options.map((next, i) => {
              return (
                <MenuItem
                  key={i}
                  value={next}
                  onClick={() => handleSelect(next)}
                >
                  {next}
                </MenuItem>
              );
            })
          )}
        </span>
        <Input type="number" placeholder="Seen" />
      </div>
    </section>
  );
};
