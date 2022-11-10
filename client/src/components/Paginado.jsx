import React from "react";

const Paginado = ({ allCountries, paginado }) => {
  let pageNumbers = [];

  for (let i = 1; i <= Math.floor(allCountries / 10) + 1; i++) {
    pageNumbers = [...pageNumbers, i];
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((n) => (
            <li className="n" key={n}>
              <button onClick={() => paginado(n)}>{n}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Paginado;
