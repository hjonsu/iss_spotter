const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
} = require("./iss_promised");

const {
  printPassTimes
} = require('./index');

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(nextISSTimesForMyLocation)
  .then(body => printPassTimes(body))
  .catch((error) => {
    console.log("Doesn't work: ", error);
  });