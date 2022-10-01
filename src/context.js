import { createContext } from "react";

export const initialUserState = () => {
  const stored = JSON.parse(sessionStorage.getItem("User Score"));
  return stored
    ? stored
    : [
        {
          wins: 0,
          losses: 0,
          ties: 0,
        },
      ];
};

export const UserContext = createContext({
  setsData: [],
  setSetsData: () => [],
});
