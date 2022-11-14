//import FilterCountries from "../components/FilterCountries";
import * as actions from "../redux/action";

const inicialState = {
  countries: [],
  activities: [],
  countriesCopi: [],
  continents: [],
  detail: {},
  change: false,
  firstPage: false,
};

const allCountries = (state = inicialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countriesCopi: action.payload,
      };
    /* case actions.GET_ACTIVITIES:
      const names = action.payload.map((ac) => ac.name);
      return {
        ...state,
        activities: names,
      };
 */
    case actions.GET_COUNTRIES_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case actions.CLEAN_COUNTRIES_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case actions.SEARSH_COUNTRY:
      return {
        ...state,
        countries: action.payload,
      };
    case actions.ORDERAZ_COUNTRIES:
      if (action.payload !== "") {
        const order = state.countries.sort((a, b) => {
          if (a.name < b.name) {
            return -1; //a es menor que b
          } else if (a.name > b.name) {
            return 1; //a es mayor que b
          } else {
            return 0; //valores iguales
          }
        });
        //console.table(order);
        return {
          ...state,
          countries: action.payload === "A-Z" ? order : order.reverse(),
        };
      }
      return {
        ...state,
        countries: state.countries,
      };

    case actions.ORDENAR_POBLACION:
      const order = (objs, proiedades, modsOrder) => {
        return [...objs].sort((a, b) =>
          proiedades.reduce((acumulador, p, i) => {
            if (acumulador === 0) {
              let [m, n] =
                modsOrder && modsOrder[i] === "DESCENDENTE"
                  ? [b[p], a[p]]
                  : [b[p], a[p]];
              acumulador = m > n ? 1 : m < n ? -1 : 0;
            }
            return acumulador;
          }, 0)
        );
      };

      let orderPop = order(state.countries, ["population"], ["DESCENDENTE"]);
      orderPop = state.countries.sort((a, b) => b.population - a.population);

      return {
        ...state,
        countries:
          action.payload === "Mayor Población"
            ? orderPop
            : action.payload === "Menor Población"
            ? orderPop.reverse()
            : state.countries,
      };
    case actions.FILTER_CONTINENT:
      const filterCont = [...state.countriesCopi].filter((co) =>
        co.continents.includes(action.payload)
      );
      //console.table(filterCont);
      return {
        ...state,
        countries: filterCont,
        continents: filterCont,
      };
    case actions.ADD_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
      };

    case actions.FILTER_ACTIVITY:
      let act = [];
      let country =
        state.countries.length === 250 ? state.countries : state.continents;
      for (let i = 0; i < country.length; i++) {
        for (let j = 0; j < country[i].activities.length; j++) {
          if (country[i].activities[j].name === action.payload)
            act = [...act, country[i]];
        }
      }
      //console.table(act);
      return {
        ...state,
        countries:
          act.length !== 0 ? act : [{ message: "Actividad no disponible" }],
      };
    case actions.UPDATE:
      return {
        ...state,
        change: !state.change,
      };

    case actions.FIRST_PAGE:
      return {
        ...state,
        firstPage: !state.firstPage,
      };
    case actions.RESEAT_COUNTRIES:
      return {
        ...state,
        countries: [],
      };
    default:
      return state;
  }
};

export default allCountries;
