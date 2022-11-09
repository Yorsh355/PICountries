import React from "react";
import store from "../redux/store";
import { Link } from "react-router-dom";

const Main = () => {
  console.log(store.getState());

  return (
    <div className="bg-main">
      <Link to={"/home"}>
        <button className="btn-start">START</button>
      </Link>
    </div>
  );
};

export default Main;
