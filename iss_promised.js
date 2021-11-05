const request = require('request-promise-native');

const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function (body) {
  return request('https://api.freegeoip.app/json/?apikey=77fcbe00-3dc5-11ec-940e-c9ad58b7debb');
};

const fetchISSFlyOverTimes = function (body) {
  const {
    longitude,
    latitude
  } = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function () {
  return fetchCoordsByIP()
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {
        response
      } = JSON.parse(data);
      return response;
    });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};