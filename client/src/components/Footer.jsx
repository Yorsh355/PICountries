import React from "react";
import s from "../styles/Foorer.module.css";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <p className={s.text}>
        App Countries - Todos los derechos reservados &copy; Inc - 2022
      </p>
    </footer>
  );
};

export default Footer;
