import { createContext } from "react";

export const initialUserState = () => {
  const stored = JSON.parse(sessionStorage.getItem("User Stats"));
  return stored
    ? stored
    : {
        elo: { starting: 0, current: 0, change: 0, ending: 0 },
        sets: [
          {
            wins: 0,
            losses: 0,
            ties: 0,
          },
        ],
      };
};

export const retrieveElo = () => {
  const stored = JSON.parse(sessionStorage.getItem("User Stats"));
  return stored.elo.starting ? true : false;
};

export const retainTieState = () => {
  const stored = JSON.parse(sessionStorage.getItem("Ties Added"));
  return stored ? stored : [false];
};

export const UserContext = createContext({
  userData: {},
  setUserData: () => {},
});
