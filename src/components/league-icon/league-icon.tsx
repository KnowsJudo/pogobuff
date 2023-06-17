import React from "react";
import Great from "../../img/great.png";
import Ultra from "../../img/ultra.png";
import Master from "../../img/master.png";

interface ILeagueIcon {
  league: string;
}

export const LeagueIcon: React.FC<ILeagueIcon> = (props) => {
  return (
    <img
      src={
        props.league === "Great"
          ? Great
          : props.league === "Ultra"
          ? Ultra
          : Master
      }
      height={50}
      width={50}
      alt="great league icon"
    />
  );
};
