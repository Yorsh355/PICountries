import Card from "./Card";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../redux/action";
import s from "../styles/Home.module.css";
import { useState } from "react";
import Paginado from "./Paginado";

const Home = () => {
  const allCountries = useSelector((state) => state.countries);
  const reseat = useSelector((state) => state.reseat);
  const dispatch = useDispatch();
  const changes = useSelector((state) => state.change);
  //pagina actual
  const [currentPage, setCurrentPage] = useState(1);
  //cantidad de paises por pagina
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  let indexOfLastCountry;
  useEffect(() => {
    if (currentPage === 1) {
      setCountriesPerPage(9);
    } else {
      setCountriesPerPage(10);
    }
  }, [currentPage]);

  console.log(currentPage);
  //el indice del último país que tengo en la página, en principo será 8
  indexOfLastCountry =
    currentPage === 1
      ? parseInt(currentPage * countriesPerPage)
      : parseInt(currentPage * countriesPerPage) - 1;
  console.log(indexOfLastCountry);

  //indice del primer país
  const indexOfFirstCountry =
    currentPage === 1 ? 0 : indexOfLastCountry - countriesPerPage;
  //paises que se encuentran en la pagina actual
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  //Ayuda a realizar el renderizado
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(actions.AddActivity());
  }, [changes]);

  useEffect(() => {
    if (allCountries.length === 0 && !reseat) {
      dispatch(actions.getAllCountries());
    }
  }, [changes]);
  console.log(allCountries);

  if (allCountries.message) {
    return <h1>{allCountries.message}</h1>;
  }

  if (allCountries.length === 0) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className={s.home_cards}>
      <div>
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />
      </div>
      {currentCountries &&
        currentCountries.map((country) => (
          <Card
            key={country.id}
            id={country.id}
            flags={country.flags}
            name={country.name}
            continents={country.continents}
          />
        ))}
      <div>
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
};

export default Home;
