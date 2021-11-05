const {
  reset
} = require('chalk');
const request = require('request');

const fetchMyIP = function (callback) {
  request('https://api.ipify.org?format=json', function (err, response, body) {

    if (err) {
      return callback(err, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const data = JSON.parse(body);
    if (data.length === 0) {
      return callback(null, 'Cannot find your IP address');
    }

    return callback(null, data.ip);

  });
};


const fetchCoordsByIP = function (callback) {
  request(`https://api.freegeoip.app/json/?apikey=77fcbe00-3dc5-11ec-940e-c9ad58b7debb`, function (err, response, body) {

    if (err) {
      callback(err, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for the ip: ${body}`), null);
      return;
    }

    const {
      longitude,
      latitude
    } = JSON.parse(body);

    callback(null, {
      longitude,
      latitude
    });
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, function (err, res, body) {
    if (err) {
      return callback(err, null);
    }
    if (res.statusCode !== 200) {
      return callback(Error(`Status Code ${res.statusCode} when fetching fly times.${body}`), null);
    }
    const {
      response
    } = JSON.parse(body);
    return callback(null, response);
  });
};



const nextISSTimesForMyLocation = function (callback) {
  fetchCoordsByIP((error, coords) => {
    if (error) {
      return callback(error, null);
    }
    fetchISSFlyOverTimes(coords, (error, nextPasses) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, nextPasses);
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};