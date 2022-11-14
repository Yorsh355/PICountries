import React from "react";
import s from "../styles/Success.module.css";
const Success = ({ mensaje }) => {
  return (
    <div className={s.success}>
      <h2 className={s.message}>{mensaje}</h2>
    </div>
  );
};

export default Success;
