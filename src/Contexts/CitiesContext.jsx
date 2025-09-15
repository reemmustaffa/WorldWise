import { createContext, useContext, useEffect, useReducer } from "react";

//CREATING CITIES CONTEXT

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reduce(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payLoad };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payLoad };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payLoad],
        currentCity: action.payLoad,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payLoad),
        currentCity: {},
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payLoad };
    default:
      throw new Error("Unknown action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reduce,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payLoad: data });
      } catch {
        dispatch({
          type: "rejected",
          payLoad: "There is a something went wrong with loading cities",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    //دا عشان لما اضغط علي نفس المدينه مره تانيه ميروحش يجبها من api تاني
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payLoad: data });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There is a something went wrong with loading city",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      //عشان يحدث الاستيت وتظهر النتيجه علي طول من غير ريلود
      dispatch({
        type: "city/created",
        payLoad: data,
      });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There is a something went wrong with creating cities",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "city/deleted",
        payLoad: id,
      });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There is a something went wrong with deleting city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside CitiesProvider ");
  return context;
}
export { CitiesProvider, useCities };
