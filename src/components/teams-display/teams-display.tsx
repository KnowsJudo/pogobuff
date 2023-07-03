import React from "react";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { DoneButton } from "../done-button/done-button";

interface ITeamsDisplay {
  league: string;
  greatTeams: ITeam[];
  ultraTeams: ITeam[];
  masterTeams: ITeam[];
  editNext: INextTeam;
  nextTeam: ITeam;
  setNextTeam: React.Dispatch<React.SetStateAction<ITeam>>;
  addTeamToList: (league: string) => void;
}

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

export const TeamsDisplay: React.FC<ITeamsDisplay> = (props) => {
  return (
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
        {props.league === "Great"
          ? props.greatTeams.map((next, i) => {
              return (
                i !== 0 && (
                  <TableRow key={i}>
                    <TableCell>{next.lead}</TableCell>
                    <TableCell>{next.switch}</TableCell>
                    <TableCell>{next.closer}</TableCell>
                  </TableRow>
                )
              );
            })
          : props.league === "Ultra"
          ? props.ultraTeams.map((next, i) => {
              return (
                i !== 0 && (
                  <TableRow key={i}>
                    <TableCell>{next.lead}</TableCell>
                    <TableCell>{next.switch}</TableCell>
                    <TableCell>{next.closer}</TableCell>
                  </TableRow>
                )
              );
            })
          : props.masterTeams.map((next, i) => {
              return (
                i !== 0 && (
                  <TableRow key={i}>
                    <TableCell>{next.lead}</TableCell>
                    <TableCell>{next.switch}</TableCell>
                    <TableCell>{next.closer}</TableCell>
                  </TableRow>
                )
              );
            })}
        <TableRow>
          {props.editNext.lead && (
            <TableCell>
              <Input
                value={props.nextTeam.lead}
                onChange={(e) =>
                  props.setNextTeam((prev) => {
                    return { ...prev, lead: e.target.value };
                  })
                }
              />
            </TableCell>
          )}
          {props.editNext.switch && (
            <TableCell>
              <Input
                value={props.nextTeam.switch}
                onChange={(e) =>
                  props.setNextTeam((prev) => {
                    return { ...prev, switch: e.target.value };
                  })
                }
              />
            </TableCell>
          )}
          {props.editNext.closer && (
            <>
              <TableCell>
                <Input
                  value={props.nextTeam.closer}
                  onChange={(e) =>
                    props.setNextTeam((prev) => {
                      return { ...prev, closer: e.target.value };
                    })
                  }
                />
              </TableCell>
              <DoneButton doneFn={() => props.addTeamToList(props.league)} />
            </>
          )}
        </TableRow>
      </TableBody>
    </Table>
  );
};
