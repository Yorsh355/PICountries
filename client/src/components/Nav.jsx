import React from "react";
import SearchBar from "./SearchBar";
import FilterCountries from "./FilterCountries";
import OrderCountries from "./OrderCountries";
import s from "../styles/Nav.module.css";
import logo from "../images/logoCountry.jpeg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllCountries } from "../redux/action";

const Nav = () => {
  const dispach = useDispatch();
  return (
    <div className={`${s.container} ${s.nav}`}>
      <Link to={"/home"}>
        <img
          className={s.img}
          src={logo}
          alt="logo"
          onClick={() => dispach(getAllCountries())}
        />
      </Link>
      <SearchBar />
      <OrderCountries />
      <FilterCountries />
      <div>
        <Link to={"/Activity"}>
          <button>Create Activity</button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
