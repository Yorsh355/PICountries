import React from "react";
//import store from "../redux/store";
import { Link } from "react-router-dom";
import s from "../styles/Main.module.css";
import img from "../images/main.jpg";

const Main = () => {
  /* console.log(store.getState()); */

  return (
    <div className={s.container}>
      <div src={img} alt="" className={s.image_main}>
        <img src="" alt="" />
      </div>
      <div className={s.main}>
        <Link to={"/home"} className={s.btn}>
          START
        </Link>
      </div>
    </div>
  );
};

export default Main;
