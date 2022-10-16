import { createContext } from "react";

export const initialUserState = () => {
  const stored = JSON.parse(sessionStorage.getItem("User Stats"));
  return stored
    ? stored
    : {
        elo: 0,
        sets: [
          {
            wins: 0,
            losses: 0,
            ties: 0,
          },
        ],
      };
};

export const UserContext = createContext({
  userData: {},
  setUserData: () => {},
});
