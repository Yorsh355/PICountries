import React from "react";
import s from "../styles/Error.module.css";

const Errores = ({ mensaje }) => {
  return (
    <div className={s.error}>
      <p className={s.message}>{mensaje}</p>
    </div>
  );
};

export default Errores;
