import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/action";
import { useParams } from "react-router-dom";
import s from "../styles/Detail.module.css";

const DetailCard = () => {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.detail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(actions.cleanCountriesDetail());
    dispatch(actions.getCountriesDetail(id));
  }, []);

  const deleteCard = (act) => {
    console.log(act);
    dispatch(actions.deleteActivity(id, act));
  };

  return (
    <div>
      <h1>Detail</h1>
      {country.hasOwnProperty("flags") ? (
        <div className={s.container} key={country.id}>
          <div className={s.detail}>
            <img src={country.flags} alt={country.name} />
            <h3 className={s.span}>{country.name}</h3>
            <p className={s.p}>
              <span className={s.span}>Continent:</span> {country.continents}
            </p>
            <p className={s.p}>
              <span className={s.span}>Id:</span> {country.id}
            </p>
            <p className={s.p}>
              <span className={s.span}>Subregion:</span> {country.subregion}
            </p>
            <p className={s.p}>
              <span className={s.span}>capital:</span> {country.capital}
            </p>
            <p className={s.p}>
              <span className={s.span}>Area:</span> {country.area} km2
            </p>
            <p className={s.p}>
              <span className={s.span}>Population:</span> {country.population}
            </p>
          </div>
          <div className={s.activity}>
            <h2 className={s.h2}>Activitys</h2>
            {country.activities.length !== 0 ? (
              country.activities.map((act) => (
                <div key={act.id} className={s.info}>
                  <div className={s.delete}>
                    <button onClick={() => deleteCard(act)} className={s.btn}>
                      X
                    </button>
                  </div>
                  <h3 className={s.h3}>{act.name}</h3>
                  <p className={s.pa}>
                    <span className={s.spana}>Difficulty: </span>
                    <span className={s.spana}>{act.difficulty}</span>
                  </p>
                  <p className={s.pa}>
                    <span className={s.spana}>Season: </span>
                    {act.season}
                  </p>
                  <p className={s.pa}>
                    <span className={s.spana}>Duration: </span>
                    {act.duration} Hours
                  </p>
                  <br />
                </div>
              ))
            ) : (
              <h1 className={s.h1}>Sin actividades disponibles!!!</h1>
            )}
          </div>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
};

export default DetailCard;
