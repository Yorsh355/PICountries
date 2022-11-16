export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_COUNTRIES_DETAIL = "GET_COUNTRIES_DETAIL";
export const CLEAN_COUNTRIES_DETAIL = "CLEAN_COUNTRIES_DETAIL";
export const SEARSH_COUNTRY = "SEARSH_COUNTRY";
export const ORDERAZ_COUNTRIES = "ORDER_COUNTRIES";
export const ORDENAR_POBLACION = "ORDENAR_POBLACION";
export const FILTER_CONTINENT = "FILTER_CONTINENT";
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const FILTER_ACTIVITY = "FILTER_ACTIVITY";
export const UPDATE = "UPDATE";
export const RESEAT = "RESEAT";
export const FIRST_PAGE = "FIRST_PAGE";
export const RESEAT_COUNTRIES = "RESEAT_COUNTRIES";

export const getAllCountries = () => {
  return function (dispatch) {
    return fetch("http://localhost:3001/countries")
      .then((response) => response.json())
      .then((countries) =>
        dispatch({ type: GET_ALL_COUNTRIES, payload: countries })
      )
      .catch((err) => {
        console.error(err);
      });
  };
};

export const getCountriesDetail = (id) => {
  return function (dispatch) {
    return fetch(`http://localhost:3001/countries/${id}`)
      .then((response) => response.json())
      .then((country) =>
        dispatch({ type: GET_COUNTRIES_DETAIL, payload: country })
      )
      .catch((err) => {
        console.error(err);
      });
  };
};

export const cleanCountriesDetail = () => {
  return { type: CLEAN_COUNTRIES_DETAIL, payload: {} };
};

export const createActivity = (res) => {
  return function () {
    return fetch("http://localhost:3001/activity", {
      method: "POST",
      body: JSON.stringify(res),
      headers: { "Content-Type": "application/json" },
    }).catch((err) => {
      console.error({ err: err.message });
    });
  };
};

/* export const createActivity = async (res) => {
  await fetch("http://localhost:3001/activity", {
    method: "POST",
    body: JSON.stringify(res),
    headers: { "content-type": "application/json" },
  }).catch((err) => console.error({ err: err.message }));
};
 */
export const searchCountry = (name) => {
  return function (dispatch) {
    return fetch(`http://localhost:3001/countries?name=${name}`)
      .then((response) => response.json())
      .then((country) => {
        dispatch({ type: SEARSH_COUNTRY, payload: country });
      })
      .catch((err) => {
        console.error({ err: err.message });
      });
  };
};

export const orderAZCountries = (input) => {
  return { type: ORDERAZ_COUNTRIES, payload: input };
};

export const ordenarPoblacion = (input) => {
  return { type: ORDENAR_POBLACION, payload: input };
};

export const filterContinent = (input) => {
  return { type: FILTER_CONTINENT, payload: input };
};
export const AddActivity = () => {
  return function (dispatch) {
    return fetch("http://localhost:3001/activities")
      .then((response) => response.json())
      .then((activities) => {
        dispatch({ type: ADD_ACTIVITY, payload: activities });
      })
      .catch((err) => {
        console.error({ err: err.message });
      });
  };
};

export const filterActivity = (input) => {
  return { type: FILTER_ACTIVITY, payload: input };
};

export const update = (prop) => {
  return { type: UPDATE };
};

export const reseat = (prop) => {
  return { type: RESEAT, payload: prop };
};

export const firstPage = () => {
  return { type: FIRST_PAGE };
};

export const reseatCountries = () => {
  return { type: RESEAT_COUNTRIES };
};

export const deleteActivity = (id, act) => {
  console.log(id, act);
  return function () {
    return fetch(`http://localhost:3001/delete/${id}`, {
      method: "DELETE",
      body: JSON.stringify(act),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo eliminar");
        }
        console.log("Eliminando");
      })
      .catch((err) => {
        console.error({ err: err.message });
      });
  };
};

/* export const getActivities = () => {
  return function (dispatch) {
    return fetch("http://localhost:3001/activities")
      .then((response) => response.json())
      .then((activities) =>
        dispatch({ type: GET_ACTIVITIES, payload: activities })
      )
      .catch((err) => {
        console.error(err);
      });
  };
}; */
