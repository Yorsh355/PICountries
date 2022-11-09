import Card from "./Card";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../redux/action";
import s from "../styles/Home.module.css";

const Home = () => {
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);
  const dispatch = useDispatch();
  const changes = useSelector((state) => state.change);
  console.log(allActivities);

  useEffect(() => {
    dispatch(actions.getActivities());
  }, []);

  useEffect(() => {
    if (allCountries.length === 0) {
      dispatch(actions.getAllCountries());
      dispatch(actions.getActivities());
    }
  }, [changes]);
  console.log(allCountries);

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
