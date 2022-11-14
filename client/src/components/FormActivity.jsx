import { React, Fragment } from "react";
import { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/action";
import Errores from "./Errores";
import s from "../styles/Home.module.css";
import f from "../styles/Form.module.css";

const FormActivity = () => {
  const allCountries = useSelector((state) => state.countries);
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

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (allCountries.length === 0) {
      dispatch(actions.getAllCountries());
    }
  }, []);

  const addCountry = () => {
    let counName =
      input.countryName.charAt(0).toUpperCase() +
      input.countryName.slice(1).toLowerCase();
    if (!counName && count.length === 0) {
      setError(true);
      setMensaje(`Debe ingresar un pais!!!`);

      setTimeout(() => {
        setMensaje("");
        setError(false);
      }, 3000);
      return;
    }
    if (counName) {
      //busco el pais que digitan en el input, para validar si existe
      count = allCountries.filter((co) => co.name === counName);
      //si no existe envio un error
      if (count.length === 0) {
        setError(true);
        setMensaje(`${counName} no es un nombre de pais valido!!!`);
        input.countryName = "";

        setTimeout(() => {
          setMensaje("");
          setError(false);
        }, 3000);
        return;
      }
    }

    if (input.allCountries.find((co) => co.name === counName)) {
      setError(true);
      setMensaje(`${counName} ya se encuentra seleccionado!!!`);
      input.countryName = "";

      setTimeout(() => {
        setMensaje("");
        setError(false);
      }, 3000);
      return;
    }

    setInput({
      ...input,
      allCountries: [...input.allCountries, count[0]],
      countryName: "",
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    count = input.allCountries.filter((co) => co.id !== e.target.value);
    setInput({
      ...input,
      allCountries: count,
    });
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
      }, 3000);
    } else if (regedex.test(input.name)) {
      setError(true);
      setMensaje("El campo Name solo permite strings");

      setTimeout(() => {
        setMensaje("");
        setError(false);
      }, 3000);
    } else if (input.difficulty < 1 || input.difficulty > 5) {
      setError(true);
      setMensaje("El campo Difficulty solo permite valores entre 1 y 5");

      setTimeout(() => {
        setMensaje("");
        setError(false);
      }, 3000);
    } else if (input.allCountries.length === 0) {
      setError(true);
      setMensaje("No hay paises seleccionados");

      setTimeout(() => {
        setMensaje("");
        setError(false);
      }, 3000);
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
  };

  if (allCountries.length === 0) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <Fragment>
        <h1>Create Activity</h1>

        <div clasename={f.container}>
          <form className={f.form} onSubmit={handleSubmit}>
            <h2 className={f.h2}>Enter activity data</h2>
            {error && <Errores mensaje={mensaje} />}

            <label className={f.label}>
              Name
              <input
                className={f.input}
                type="text"
                placeholder="Name"
                name="name"
                value={input.name}
                onChange={handleChange}
              />
            </label>

            <label className={f.label}>
              Difficulty
              <input
                className={f.input}
                type="number"
                name="difficulty"
                value={input.difficulty}
                onChange={handleChange}
              />
            </label>

            <label className={f.label}>
              Duration in hours
              <input
                className={f.input}
                type="number"
                name="duration"
                min={1}
                max={72}
                value={input.duration}
                onChange={handleChange}
              />
            </label>

            <label className={f.label}>
              Season
              <select className={f.input} name="season" onChange={handleChange}>
                <option value=""> -- Select Season -- </option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
              </select>
            </label>

            <div>
              <label className={f.label}>
                Add Country
                <input
                  className={f.input}
                  type="text"
                  placeholder="Add Country"
                  name="countryName"
                  value={input.countryName}
                  onChange={handleChange}
                />
              </label>
              <button className={f.btn} type="button" onClick={addCountry}>
                Add
              </button>
            </div>

            <input className={f.btn} type="submit" value={"Create Activity"} />
          </form>

          <div className={f.divCards}>
            <h2>Agregar Paises</h2>
            <div className={f.cards}>
              {success && (
                <div className={s.success}>
                  <h2 className={s.mess}>{mensaje}</h2>
                </div>
              )}
              {input.allCountries.length !== 0
                ? input.allCountries.map((country) => (
                    <div className={f.card} key={country.id}>
                      <img
                        className={f.card_image}
                        src={country.flags}
                        alt={country.name}
                      />
                      <h3 className={f.h3}>{country.name}</h3>
                      <button
                        className={f.btne}
                        value={country.id}
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default FormActivity;
