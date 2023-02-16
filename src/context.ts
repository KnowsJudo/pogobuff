import { createContext } from "react";

export interface IUserState {
  elo: { starting: number; current: number; change: number; ending: number };
  sets: [
    {
      wins: number;
      losses: number;
      ties: number;
    }
  ];
  candy: number;
  candyXL: number;
}

export const initialUserState = () => {
  const stored = JSON.parse(sessionStorage.getItem("User Stats") as string);
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
        candy: 0,
        candyXL: 0,
      };
};

export const retrieveElo = () => {
  const stored = JSON.parse(sessionStorage.getItem("User Stats") as string);
  return stored.elo.starting ? true : false;
};

export const retainTieState = () => {
  const stored = JSON.parse(sessionStorage.getItem("Ties Added") as string);
  return stored ? stored : [false];
};

interface IUserContext {
  userData: IUserState;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<IUserContext>({
  userData: initialUserState(),
  setUserData: () => {},
});
