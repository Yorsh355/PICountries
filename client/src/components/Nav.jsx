import React from "react";
import SearchBar from "./SearchBar";
import FilterCountries from "./FilterCountries";
import OrderCountries from "./OrderCountries";
import s from "../styles/Nav.module.css";
import logo from "../images/viaje-y-turismo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllCountries, reseatCountries } from "../redux/action";

const Nav = () => {
  const dispatch = useDispatch();

  const submit = () => {
    dispatch(reseatCountries());
    dispatch(getAllCountries());
  };
  return (
    <div className={`${s.container} ${s.nav}`}>
      <Link to={"/home"}>
        <img className={s.img} src={logo} alt="logo" onClick={submit} />
      </Link>
      <SearchBar />
      <OrderCountries />
      <div>
        <FilterCountries />
      </div>
      <Link to={"/Activity"}>
        <button className={s.btn}>Create Activity</button>
      </Link>
    </div>
  );
};

export default Nav;
