import {Dimensions} from 'react-native';
import sunnyIcon from '../assets/sunnyIcon.png';
import partlyIcon from '../assets/partlyIcon.png';
import foggyIcon from '../assets/foggyIcon.png';
import rainyIcon from '../assets/rainyIcon.png';
import snowIcon from '../assets/snowIcon.png';

const Images = {};

const Colors = {
  white: '#ffffff',
  primary: '#1ab2ff',
  yellow: '#ffdb4d',
  black: '#000000',
  blue: '#001f4d',
  darkBlue: '#000a1a',
  skyBlue: '#66a1ff',
  grey: '#999999',
};

const DIM = {
  deviceWidth: Math.round(Dimensions.get('window').width),
  deviceHeight: Math.round(Dimensions.get('window').height),
};

const WeatherImg = item => {
  let image = '';
  if (item.temperature > 75) image = sunnyIcon;
  else if (item.temperature > 60 && item.temperature < 75) image = partlyIcon;
  else if (item.visibility < 5) image = foggyIcon;
  else if (item.humidity > 80) image = rainyIcon;
  else if (item.temperature < 4) image = snowIcon;
  else image = sunnyIcon;
  return image;
};

export {Images, Colors, DIM, WeatherImg};
