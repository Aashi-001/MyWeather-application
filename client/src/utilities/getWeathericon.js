import thunderstorm from "../images/rain.png";
import sunny from "../images/sunny.png";
import partiallycloudy from "../images/partiallycloudy.png";
import cleannight from "../images/clearnight.png";
import rainy from "../images/rainy.png";
import haze from "../images/hazy.png";
import latehaze from "../images/hazynight.png";
import laterain from "../images/laterain.png";
import cloudynight from "../images/cloudynight.png";
import cloudyday from "../images/image.png";

// const isNightTime = (hours, sunrise, sunset) => {
//     console.log(hours);
//     if(hours === null || hours === undefined) return true;
//     return hours < sunrise || hours > sunset;
//   }

// export const getWeatherIcon = (id, isDaytime) => {
//     if (id >= 200 && id < 300) return thunderstorm;
//     if (id >= 300 && id < 600) return isDaytime ? rainy : laterain;
//     if (id >= 600 && id < 700) return thunderstorm;
//     if (id >= 700 && id < 800) return isDaytime ? haze : latehaze;
//     if (id === 800) return isDaytime ? sunny : cleannight;
//     if (id > 800) return isDaytime ? cloudyday : cloudynight;
//     return partiallycloudy;
//   };

export const getWeatherIcon = (id, hrs) => {
  if (id >= 200 && id < 300) {
    return thunderstorm;
  } else if (id >= 300 && id < 500 && hrs <= 19 && hrs >= 5) {
    return rainy;
  } else if (id >= 500 && id < 600 && hrs <= 19 && hrs >= 5) {
    return thunderstorm;
  } else if (id >= 600 && id < 700 && hrs <= 19 && hrs >= 5) {
    return thunderstorm;
  } else if (id >= 700 && id < 800 && hrs <= 19 && hrs >= 5) {
    return haze;
  } else if (id === 800 && hrs <= 19 && hrs >= 5) {
    return sunny;
  } else if (id === 800) {
    return cleannight;
  } else if (id > 800 && hrs <= 19 && hrs >= 5) {
    return cloudyday;
  } else if (id > 800) {
    return cloudynight;
  } else if (id >= 300 && id < 500) {
    return laterain;
  } else if (id >= 500 && id < 600) {
    return laterain;
  } else if (id >= 600 && id < 700) {
    return thunderstorm;
  } else if (id >= 700 && id < 800) {
    return latehaze;
  } else {
    return partiallycloudy;
  }
};
