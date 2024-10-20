export const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER';
export const SET_WEATHER_HISTORY = 'SET_WEATHER_HISTORY';
export const SET_WEATHER_FORECAST = 'SET_WEATHER_FORECAST';


export const setLiveWeather = (weatherData) => {
    return {
      type: SET_CURRENT_WEATHER,
      payload: weatherData,
    };
};

export const setWeatherHistory = weatherData => {
  return {
    type: SET_WEATHER_HISTORY,
    payload: weatherData,
  };
};


export const setWeatherForecast = weatherData => {
  return {
    type: SET_WEATHER_FORECAST,
    payload: weatherData,
  };
};

