import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import s from "../styles/OrderCountries.module.css";
import * as actions from "../redux/action";

const OrderCountries = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.orderAZCountries(input));
    dispatch(actions.ordenarPoblacion(input));
    dispatch(actions.update());
  };

  return (
    <div className={s.container}>
      <form>
        <button className={s.btn_order} type="submit" onClick={handleSubmit}>
          Order
        </button>
        <select className={s.order} name="filter" onChange={handleChange}>
          <option value=""> -- Select Order -- </option>
          <option value={"A-Z"}>A-Z</option>
          <option value={"Z-A"}>Z-A</option>
          <option value="Mayor Población">Mayor Población</option>
          <option value="Menor Población">Menor Población</option>
        </select>
      </form>
    </div>
  );
};

export default OrderCountries;
