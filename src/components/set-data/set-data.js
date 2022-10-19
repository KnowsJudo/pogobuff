import { Scorer } from "../scorer/scorer";
import { useContext } from "react";
import { UserContext } from "../../context";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import "./set-data.css";

export const SetData = (props) => {
  const { userData, setUserData } = useContext(UserContext);

  const addTieToArray = (setNumber) => {
    props.setAddTie((prev) =>
      prev.map((next, i) => {
        return i === setNumber ? true : next;
      })
    );
  };

  const removeSet = (setNumber) => {
    props.setAddTie((prev) => prev.filter((match, ind) => ind !== setNumber));
    setUserData((prev) => {
      return {
        elo: {
          starting: prev.starting,
          //TODO: Update elo values
          current: prev.current,
          change: prev.change,
          ending: prev.ending,
        },
        sets: prev.sets.filter((match, ind) => ind !== setNumber),
      };
    });
  };

  return (
    <div className="set-data-box">
      {userData.sets.map((next, ind) => {
        return (
          <div key={ind} className="set-data-inner">
            <h3>{`Set ${ind + 1}:`}</h3>
            <Scorer id={ind} score={next} addTie={props.addTie[ind]} />
            <span className="set-data-edit">
              {!props.addTie[ind] && (
                <>
                  <Tooltip title="Add a tie">
                    <GraphicEqIcon
                      onClick={() => {
                        addTieToArray(ind);
                      }}
                      sx={{
                        fontSize: 18,
                        marginRight: "auto",
                        marginLeft: "5%",
                        "&:hover": { cursor: "pointer" },
                      }}
                    />
                  </Tooltip>
                </>
              )}
              <Tooltip title="Remove set">
                <DeleteIcon
                  onClick={() => removeSet(ind)}
                  sx={{
                    fontSize: 18,
                    margin: props.addTie[ind] ? "auto" : "auto 5%",
                    "&:hover": { cursor: "pointer" },
                  }}
                />
              </Tooltip>
            </span>
          </div>
        );
      })}
    </div>
  );
};
