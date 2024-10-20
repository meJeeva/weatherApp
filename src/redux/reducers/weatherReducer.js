import { SET_CURRENT_WEATHER, SET_WEATHER_FORECAST, SET_WEATHER_HISTORY } from "../actions/weatherAction";

const initialState = {
  currentWeather: [],
  weatherHistory : [],
  weatherForecast : []
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload,
      };
    case SET_WEATHER_HISTORY:
      return {
        ...state,
        weatherHistory: action.payload,
      };
    case SET_WEATHER_FORECAST:
      return {
        ...state,
        weatherForecast: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
