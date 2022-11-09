import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/action";
import { useParams } from "react-router-dom";

const DetailCard = () => {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.detail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(actions.cleanCountriesDetail());
    dispatch(actions.getCountriesDetail(id));
  }, []);
  return (
    <div>
      <h1>Detail</h1>
      {country.hasOwnProperty("flags") ? (
        <div key={country.id}>
          <img src={country.flags} alt={country.name} />
          <h3>{country.name}</h3>
          <p>{country.continents}</p>
          <p>{country.subregion}</p>
          <p>{country.capital}</p>
          <p>{country.area}</p>
          <p>{country.population}</p>
          <div className="detail_activity">
            <h2>Activitys</h2>
            {country.activities.length !== 0 ? (
              country.activities.map((act) => (
                <div key={act.id} className="detail_info">
                  <h3>{act.name}</h3>
                  <p>Difficulty: {act.difficulty}</p>
                  <p>Season: {act.season}</p>
                  <p>Duration: {act.duration} Hours</p>
                  <br />
                </div>
              ))
            ) : (
              <h1>Sin actividades disponibles!!!</h1>
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
