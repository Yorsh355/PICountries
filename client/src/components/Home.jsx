import Card from "./Card";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../redux/action";
import s from "../styles/Home.module.css";
import { useState } from "react";
import Paginado from "./Paginado";
import spinner from "../images/Spinner.gif";

const Home = () => {
  const allCountries = useSelector((state) => state.countries);
  const firstPage = useSelector((state) => state.firstPage);
  const dispatch = useDispatch();
  const changes = useSelector((state) => state.change);
  //pagina actual
  const [currentPage, setCurrentPage] = useState(1);
  //cantidad de paises por pagina
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  useEffect(() => {
    if (currentPage === 1) {
      setCountriesPerPage(9);
    } else {
      setCountriesPerPage(10);
    }
  }, [currentPage]);

  console.log(currentPage);

  let indexOfLastCountry =
    currentPage === 1
      ? parseInt(currentPage * countriesPerPage)
      : parseInt(currentPage * countriesPerPage) - 1;
  console.log(indexOfLastCountry);

  //indice del primer país
  const indexOfFirstCountry =
    currentPage === 1 ? 0 : indexOfLastCountry - countriesPerPage;

  //Número de la pagina a renderizar
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [firstPage]);

  useEffect(() => {
    dispatch(actions.AddActivity());
  }, [changes]);

  useEffect(() => {
    if (allCountries.length === 0) {
      dispatch(actions.getAllCountries());
    }
  }, [changes]);
  console.log(allCountries);

  if (allCountries.length === 0) {
    return (
      <div>
        <img src={spinner} alt="spinner" />
      </div>
    );
  }

  if (allCountries[0].message) {
    return <h1>{allCountries[0].message}</h1>;
  }

  //paises que se encuentran en la pagina actual
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  return (
    <div className={s.container}>
      <div>
        <Paginado allCountries={allCountries.length} paginado={paginado} />
      </div>
      <div className={s.cards}>
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
      </div>
      <div>
        <Paginado allCountries={allCountries.length} paginado={paginado} />
      </div>
    </div>
  );
};

export default Home;
