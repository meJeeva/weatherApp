
const getWeatherLiveApi = async () => {
    try {
        const response = await fetch(`https://apps.org.in/weather/live/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const responseJson = await response.json();
        return responseJson;

    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

const getWeatherHistoryApi = async () => {
    const response = await fetch(`https://apps.org.in/weather/history/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    }).then(response => response.json())
        .then(responseJson => responseJson)
        .catch(error => console.log(error))
    return response;
}

const getWeatherForecastApi = async () => {
    const response = await fetch(`https://apps.org.in/weather/forecast/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    }).then(response => response.json())
        .then(responseJson => responseJson)
        .catch(error => console.log(error))
    return response;
}

const getCurrentWeatherApi = async filter => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=72557629928b48c0bc751230242010&q=${filter}&aqi=yes/`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.json())
    .then(responseJson => responseJson)
    .catch(error => console.log(error));
  return response;
};

const getAddressFromLatLongApi = async (latitude,longitude) => {
  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.json())
    .then(responseJson => responseJson)
    .catch(error => console.log(error));
  return response;
};

export {
  getWeatherLiveApi,
  getWeatherHistoryApi,
  getWeatherForecastApi,
  getCurrentWeatherApi,
  getAddressFromLatLongApi,
};