import { createStore, applyMiddleware, compose } from "redux";
import allCountries from "./reducer";
import thunk from "redux-thunk";

const compouseEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  allCountries,
  compouseEnhancers(applyMiddleware(thunk))
);

export default store;
