import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/Card.module.css";

const Card = ({ id, flags, name, continents }) => {
  return (
    <div className={s.card_container}>
      <Link to={`/detail/${id}`}>
        <div className={s.img_container}>
          <img className={s.card_image} src={flags} alt={name} />
        </div>
      </Link>
      <div className={s.card_info}>
        <p className={s.card_name}>{name}</p>
        <p className={s.card_continents}>{continents}</p>
      </div>
    </div>
  );
};

export default Card;
