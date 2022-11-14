import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../redux/action";
import s from "../styles/Search.module.css";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.searchCountry(input));
    setInput("");
  };
  return (
    <div className={s.container_search}>
      <form onSubmit={handleSubmit}>
        <button className={s.btn} type="submit">
          Search
        </button>
        <input
          className={s.input}
          type="text"
          name="search"
          placeholder="Search"
          value={input}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
