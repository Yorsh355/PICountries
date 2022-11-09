import Card from "./Card";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../redux/action";
import s from "../styles/Home.module.css";

const Home = () => {
  const allCountries = useSelector((state) => state.countries);
  const reseat = useSelector((state) => state.reseat);
  const dispatch = useDispatch();
  const changes = useSelector((state) => state.change);

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
      {allCountries &&
        allCountries.map((country) => (
          <Card
            key={country.id}
            id={country.id}
            flags={country.flags}
            name={country.name}
            continents={country.continents}
          />
        ))}
    </div>
  );
};

export default Home;
