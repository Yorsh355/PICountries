import * as actions from "../redux/action";

const inicialState = {
  countries: [],
  activities: [],
  detail: {},
  change: false,
};

const allCountries = (state = inicialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case actions.GET_ACTIVITIES:
      const names = action.payload.map((ac) => ac.name);
      return {
        ...state,
        activities: names,
      };
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

      console.table(orderPop);
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
      const filterCont = state.countries.filter((co) =>
        co.continents.includes(action.payload)
      );
      //console.table(filterCont);
      return {
        ...state,
        countries: filterCont,
      };
    case actions.ADD_ACTIVITY:
      const filterAct = state.countries.filter(
        (co) => co.activities.length !== 0
      );
      const arrAct = filterAct.map((co) => co.activities.name);
      console.table(arrAct);
      return {
        ...state,
        activities: !state.activities.includes(action.payload)
          ? [...state.activities, action.payload]
          : [...state.activities],
      };
    case actions.FILTER_ACTYVITY:
      console.log(action.payload);
      let activ = state.countries.map((co) =>
        co.activities.filter((ac) => ac.name)
      ); /* .filter((co) =>
        co.activities.name.includes(action.payload)
      ); */
      console.log(activ);
      let act = activ.activities.filter((co) => co.name);
      console.log(act);
      return {
        ...state,
        countries: act,
      };
    case actions.UPDATE:
      return {
        ...state,
        change: !state.change,
      };
    default:
      return state;
  }
};

export default allCountries;
