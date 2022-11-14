import React from "react";
import s from "../styles/Paginado.module.css";

const Paginado = ({ allCountries, paginado }) => {
  let pageNumbers = [];

  for (let i = 1; i <= Math.floor(allCountries / 10) + 1; i++) {
    pageNumbers = [...pageNumbers, i];
  }
  return (
    <nav className={s.nav}>
      <h4 className={s.title}>Paginas</h4>
      <ul className={s.paginado}>
        {pageNumbers.length !== 0 &&
          pageNumbers.map((n) => (
            <li className={s.paginado__li} key={n}>
              <button className={s.paginado__btn} onClick={() => paginado(n)}>
                {n}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Paginado;
