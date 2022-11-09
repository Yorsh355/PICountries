import { React, Fragment } from "react";
import { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/action";
import Errores from "./Errores";
import s from "../styles/Home.module.css";

const FormActivity = () => {
  const allCountries = useSelector((state) => state.countries);
  //const { name } = useParams();
  const dispatch = useDispatch();

  let regedex = /[0-9]/;
  var count = [];

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [input, setInput] = useState({
    countryName: "",
    allCountries: [],
    name: "",
    difficulty: 1,
    duration: 1,
    season: "",
  });

  /* let countname = allCountries.filter((co) => co.name === name);

  useEffect(() => {
    setInput({
      ...input,
      allCountries: [...input.allCountries, countname[0]],
      countryName: "",
    });
  }, []); */
  //console.log(input);
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (allCountries.length === 0) {
      dispatch(actions.getAllCountries());
    }
  }, []);

  console.log(allCountries);
  //const renderName = (name) => {};

  const addCountry = () => {
    let counName =
      input.countryName.charAt(0).toUpperCase() +
      input.countryName.slice(1).toLowerCase();
    if (!counName) {
      setError(true);
      setMensaje(`Debe ingresar un pais!!!`);

      setTimeout(() => {
        setMensaje("");
        setError(false);
      }, 5000);
      return;
    }
    if (counName) {
      //busco el pais que digitan en el input, para validar si existe
      count = allCountries.filter((co) => co.name === counName);
      //si no existe envio un error
      console.table(count);
      console.table(input.allCountries);
      if (count.length === 0) {
        setError(true);
        setMensaje(`${counName} no es un nombre de pais valido!!!`);

        setTimeout(() => {
          setMensaje("");
          setError(false);
        }, 5000);
        return;
      }
    }

    if (input.allCountries.find((co) => co.name === counName)) {
      setError(true);
      setMensaje(`${counName} ya se encuentra seleccionado!!!`);

      setTimeout(() => {
        setMensaje("");
        setError(false);
      }, 5000);
      return;
    }
    console.table(count); //[{}]
    setInput({
      ...input,
      allCountries: [...input.allCountries, count[0]],
      countryName: "",
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    count = input.allCountries.filter((co) => co.id !== e.target.value);
    setInput({
      ...input,
      allCountries: count,
      countryName: "",
    });
    console.log(input.allCountries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validación del formulario
    if (
      [input.name, input.difficulty, input.duration, input.season].includes("")
    ) {
      setError(true);
      setMensaje("Faltan campos por diligenciar");

      setTimeout(() => {
        setMensaje("");
        setError(false);
      }, 5000);
    } else if (regedex.test(input.name)) {
      setError(true);
      setMensaje("El campo Name solo permite strings");

      setTimeout(() => {
        setMensaje("");
        setError(false);
      }, 5000);
    } else if (input.difficulty < 1 || input.difficulty > 5) {
      setError(true);
      setMensaje("El campo Difficulty solo permite valores entre 1 y 5");

      setTimeout(() => {
        setMensaje("");
        setError(false);
      }, 5000);
    } else {
      dispatch(actions.createActivity(input));
      setInput({
        countryName: "",
        allCountries: [],
        name: "",
        difficulty: 1,
        duration: 1,
        season: "",
      });
      setSuccess(true);
      setMensaje("Actividad creada con exito!!!");
      setTimeout(() => {
        setSuccess(false);
        setMensaje("");
      }, 3000);
    }
    console.log(input);
  };

  if (allCountries.length === 0) {
    return (
      <div>
        return<h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <Fragment>
        <h1>Create Activity</h1>
        <form onSubmit={handleSubmit}>
          {error && <Errores mensaje={mensaje} />}

          <label>
            Name
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Difficulty
            <input
              type="number"
              name="difficulty"
              value={input.difficulty}
              onChange={handleChange}
            />
          </label>
          <label>
            Duration in hours
            <input
              type="number"
              name="duration"
              value={input.duration}
              onChange={handleChange}
            />
          </label>
          <label>
            Season
            <select name="season" onChange={handleChange}>
              <option value=""> -- Select Season -- </option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
            </select>
          </label>

          <div>
            <label>
              Other Country
              <input
                type="text"
                name="countryName"
                value={input.countryName}
                onChange={handleChange}
              />
            </label>
            <button type="button" onClick={addCountry}>
              Add
            </button>
          </div>

          <input type="submit" value={"Create Activity"} />
          {/*Es necesario renderizar los paises que coincidan con el nombre de los paises del arreglo de input.allCountries  */}
        </form>

        <div className={s.home_cards}>
          {success && <h2>{mensaje}</h2>}
          {input.allCountries.length !== 0
            ? input.allCountries.map((country) => (
                <div key={country.id}>
                  <button value={country.id} onClick={handleDelete}>
                    X
                  </button>
                  <img src={country.flags} alt={country.name} />
                  <h3>{country.name}</h3>
                </div>
              ))
            : null}
        </div>
      </Fragment>
    );
  }
};

export default FormActivity;
