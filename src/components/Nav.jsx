import React, { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [buttonID, setButtonID] = useState("");
  const handleClick = (e) => {
    setButtonID(e.target.id);
  };

  return (
    <div className="Nav bg-indigo-100">
      <Link
        className={`btn-nav ${buttonID === "new" ? "btn-nav-active" : ""}`}
        id="new"
        to={"/"}
        onClick={(e) => handleClick(e)}
      >
        NEW
      </Link>

      <Link
        className={`btn-nav ${buttonID === "show" ? "btn-nav-active" : ""}`}
        id="show"
        to={"/All"}
        onClick={(e) => handleClick(e)}
      >
        SHOW
      </Link>
      <Link
        className={`btn-nav ${buttonID === "dashboard" ? "btn-nav-active" : ""}`}
        id="dashboard"
        to={"/dashboard"}
        onClick={(e) => handleClick(e)}
      >
        DASHBOARD
      </Link>
    </div>
  );
}

export default Nav;
