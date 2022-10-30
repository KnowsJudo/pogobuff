import { NavBar } from "../../components/nav-bar/nav-bar";
import { useContext } from "react";
import { UserContext } from "../../context";
import rareC from "../../img/rare.webp";
import xLC from "../../img/xl-candy.webp";
import "./candy-page.css";
import { Input } from "@material-ui/core";

export const CandyPage = () => {
  const { userData, setUserData } = useContext(UserContext);

  const handleCandy = (event, type) => {
    event.preventDefault();
    setUserData((prev) => {
      return { ...prev, [type]: event.target.value };
    });
  };

  return (
    <section className="candy-page">
      <NavBar />
      <div className="current-candy">
        <h5>
          Current: <img height={100} width={100} src={rareC} alt="rare candy" />
          &nbsp;x&nbsp;
          <Input
            type="number"
            onChange={(e) => handleCandy(e, "candy")}
            value={userData.candy}
          ></Input>
        </h5>
        <h5>
          Current XL: <img height={70} width={70} src={xLC} alt="XL candy" />
          &nbsp;x&nbsp;
          <Input
            type="number"
            onChange={(e) => handleCandy(e, "candyXL")}
            value={userData.candyXL}
          ></Input>
        </h5>
      </div>
      <div className="candy-pokes">
        <h5></h5>
      </div>
    </section>
  );
};
